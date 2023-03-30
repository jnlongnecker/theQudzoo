const mongoose = require("mongoose");
const dbUrl = `mongodb+srv://admin:${process.env.PW}${process.env.INSTANCE}${process.env.DB}`;

let User;
let Build;

const pageSize = 20;

exports.dbConnect = function connect() {
    mongoose.set("strictQuery", false);
    mongoose.connect(dbUrl, { useNewUrlParser: true });

    if (User && Build) { return; }
    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        displayName: String
    });
    const buildSchema = new mongoose.Schema({
        code: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        public: {
            type: Boolean,
            required: true
        },
        owner: {
            type: userSchema,
            required: true
        },
        likes: Array,
        tags: Array,
        genotype: String,
        created: Date,
        updated: Date,
    });

    User = mongoose.model("User", userSchema);
    Build = mongoose.model("Build", buildSchema);
}

exports.disconnect = function () {
    mongoose.connection.close();
}

exports.validateLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let user = await User.findOne({ username: username, password: password });

    if (!user) {
        return {
            success: false,
            user: null,
            message: "Incorrect username and/or password."
        }
    }

    return {
        success: true,
        user: user.username
    }
}

exports.registerUser = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let existingUser = await User.exists({ username: username });
    if (existingUser) {
        return {
            success: false,
            message: "Username in use",
            user: null
        }
    }

    let newUser = new User({
        username: username,
        password: password,
        displayName: username
    });

    newUser = await newUser.save();

    return {
        success: true,
        user: newUser.username
    }
}

exports.getAuthenticatedUser = async (req, res) => {
    if (!req.session) {
        return {
            error: false,
            username: null,
            name: null,
            message: "User is not authenticated"
        }
    }
    let userCookie = req.session.user;
    if (!userCookie) {
        return {
            error: false,
            username: null,
            name: null,
            message: "User is not authenticated"
        }
    }

    let user = await User.findOne({ username: userCookie });

    if (!user) {
        res.status(400);
        return {
            error: true,
            message: "User does not exist"
        }
    }

    return {
        error: false,
        id: user._id,
        username: user.username,
        name: user.displayName
    }
}

exports.updateUser = async function (req, res) {
    let user = req.body;
    let updateObj = {};
    if (user.name) {
        updateObj['displayName'] = user.name;
    }
    if (user.password) {
        updateObj['password'] = user.password;
    }

    let updatedUser = await User.updateOne({ username: user.username }, updateObj);
    if (user.name) {
        await Build.updateMany({ 'owner.username': user.username }, { 'owner.displayName': user.name });
    }

    res.status(200);

    return {
        error: false,
        username: user.username,
        name: user.name,
    }
}

exports.getBuilds = async function (req, res) {
    let allBuilds;

    let results = buildFiltersFromQuery(req.params.info);
    let filters = results.filters;
    let sort = results.sort;
    let page = results.page;

    try {
        allBuilds = await Build.find(filters,
            "name code owner.displayName public likes tags genotype created updated");
    }
    catch (e) {
        res.status(400);
        console.log(e.message);
        return {
            error: true,
            message: e.message
        }
    }
    let maxBuilds = allBuilds.length;

    allBuilds = allBuilds.sort((a, b) => {
        let valA;
        let valB;
        switch (sort.sortBy) {
            case 'Likes':
                return sort.ascending ? a.likes.length - b.likes.length : b.likes.length - a.likes.length;
            case 'Created Date':
                valA = new Date(a.created).valueOf();
                valB = new Date(b.created).valueOf();
                return sort.ascending ? valA - valB : valB - valA
            case 'Last Updated':
                valA = new Date(a.updated).valueOf();
                valB = new Date(b.updated).valueOf();
                return sort.ascending ? valA - valB : valB - valA
        }
    });

    allBuilds = allBuilds.slice(page * pageSize, (page + 1) * pageSize);

    res.status(200);
    return {
        error: false,
        builds: allBuilds,
        maxBuilds: maxBuilds,
    }
}

exports.deleteBuilds = async function (req, res) {
    let ids = req.body.ids;

    await Build.deleteMany({ _id: { $in: ids } });

    res.status(200);
    return {
        error: false,
        message: "Deleted builds."
    }
}

exports.saveBuild = async function (req, res) {
    let build = req.body;
    let session = req.session;

    if (await buildExists(build)) {
        return await exports.updateBuild(req, res);
    }

    let owner = await User.findOne({ username: session.user });

    let newBuild = new Build({
        code: build.code,
        name: build.name,
        likes: [owner._id],
        public: build.public,
        owner: owner,
        genotype: build.genotype,
        created: Date.now(),
        updated: Date.now(),
    });

    await newBuild.save();

    res.status(200);
    return {
        error: false,
        build: JSON.stringify(newBuild)
    }

}

exports.updateBuild = async function (req, res) {
    let rawBuild = req.body;
    let updatedBuild = {};

    for (let key in rawBuild) {
        if (rawBuild[key] === undefined || rawBuild[key] === null) continue;
        if (key == 'owner') continue;
        if (key == 'created' || key == 'likes') continue;

        updatedBuild[key] = rawBuild[key];
    }
    updatedBuild['updated'] = Date.now();

    let result = await Build.updateOne({ _id: updatedBuild._id }, updatedBuild);

    if (!result.acknowledged) {
        res.status(400);
        console.log("update failed");
        return {
            error: true,
            message: "Build updated failed: ID did not match."
        }
    }

    res.status(200);
    return {
        error: false,
        build: JSON.stringify(updatedBuild)
    }
}

exports.toggleLike = async function (req, res) {
    let build = req.body;
    let user = req.session.user;

    let buildToLike = await Build.findOne({ _id: build._id });
    let loggedUser = await User.findOne({ username: user });

    if (!buildToLike.likes.find(item => item.toString() === loggedUser._id.toString())) {
        buildToLike.likes.push(loggedUser._id);
    }
    else {
        buildToLike.likes = buildToLike.likes.filter(item => item.toString() !== loggedUser._id.toString());
    }

    let result = await Build.updateOne({ _id: buildToLike._id }, buildToLike);

    res.status(200);
    return {
        error: false,
        build: JSON.stringify(buildToLike),
    }
}

async function buildExists(build) {
    if (!build._id) return false;

    let foundBuild = await Build.findOne({ _id: build._id });
    return foundBuild != null;
}

function buildFiltersFromQuery(query) {
    let headers;
    if (typeof query === 'object') {
        headers = query;
    }
    else {
        headers = JSON.parse(decodeURIComponent(query));
    }

    if (!headers) {
        return {
            filters: {},
            sort: {
                ascending: false,
                sortBy: 'likes',
            },
            page: 0,
        };
    }

    let filters = {};
    let sort = {};
    let page = 0;

    for (let key in headers) {
        if (!headers[key]) continue;
        if (key == "owner.displayName" || key == "name") {
            headers[key] = new RegExp(headers[key], "i");
        }

        if (key == "sort") {
            sort = headers[key];
            continue;
        }

        if (key == "page") {
            page = headers[key];
            continue;
        }



        if (key == "username") {
            filters["owner.username"] = headers[key];
        }
        else if (key == 'tags') {
            filters['tags'] = { '$in': headers[key] };
        }
        else {
            filters[key] = headers[key];
        }
    }

    if (sort == {}) {
        sort = {
            ascending: false,
            sortBy: 'likes',
        }
    }

    return { filters, sort, page };
}