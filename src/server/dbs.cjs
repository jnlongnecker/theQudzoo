/*
    Author: Jared Longnecker
    Description: This module is used to handle the HTTP
    requests requiring database interaction
*/

const mongoose = require("mongoose");
const dbUrl = `${process.env.HOST}${process.env.PW}${process.env.INSTANCE}${process.env.DB}`;

let User;
let Build;

const PAGE_SIZE = 20;

/*
    Establishes a connection to the MongoDB database
*/
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
        description: {
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

/*
    Closes the connection to the MongoDB database
*/
exports.disconnect = function () {
    mongoose.connection.close();
}

/*
    Ensures that the login is request is for a valid user
*/
exports.validateLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let user;
    try {
        user = await exports.getLoggedInUser(username, password);
    }
    catch (e) {
        res.status(400);
        return {
            success: false,
            user: null,
            message: e,
        }
    }

    return {
        success: true,
        user: user.username
    }
}

/*
    Retrieves a user given a username and password. If one does not match,
    throws an error
*/
exports.getLoggedInUser = async (username, password) => {
    let user = await User.findOne({ username: username, password: password });
    if (!user) {
        throw 'Incorrect username and/or password.';
    }

    return user;
}

/*
    Attempts to register the new user
*/
exports.registerUser = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let existingUser = await User.exists({ username: username });
    if (existingUser) {
        res.status(400);
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

/*
    Retrieves the authenticated user in this session
*/
exports.getAuthenticatedUser = async (req, res) => {
    if (!req.session) {
        res.status(400);
        return {
            error: true,
            username: null,
            name: null,
            message: "No session available"
        }
    }
    let userCookie = req.session.user;
    if (!userCookie) {
        res.status(400);
        return {
            error: true,
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

/*
    Updates information about a user
*/
exports.updateUser = async function (req, res) {
    let user = req.body;
    let updateObj = {};
    if (user.name) {
        updateObj['displayName'] = user.name;
    }
    if (user.password) {
        updateObj['password'] = user.password;
    }

    await User.updateOne({ username: user.username }, updateObj);
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

/*
    Retrieves all builds matching filters from a request
*/
exports.getBuilds = async function (req, res) {
    let allBuilds;

    let results = buildFiltersFromQuery(req.params.info);
    let filters = results.filters;
    let sort = results.sort;
    let page = results.page;

    try {
        allBuilds = await Build.find(filters,
            "name code owner.displayName public likes tags genotype created updated description");
    }
    catch (e) {
        res.status(400);
        return {
            error: true,
            message: e.message
        }
    }
    let maxBuilds = allBuilds.length;

    allBuilds = sortBuilds(allBuilds, sort.sortBy, sort.ascending);

    allBuilds = allBuilds.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    res.status(200);
    return {
        error: false,
        builds: allBuilds,
        maxBuilds: maxBuilds,
    }
}

/*
    Sorts a list of builds by a field and in an order
*/
function sortBuilds(buildList, sortingField, ascending) {
    buildList = buildList.sort((a, b) => {
        let valA;
        let valB;
        switch (sortingField) {
            case 'Likes':
                return ascending ? a.likes.length - b.likes.length : b.likes.length - a.likes.length;
            case 'Created Date':
                valA = new Date(a.created).valueOf();
                valB = new Date(b.created).valueOf();
                return ascending ? valA - valB : valB - valA
            case 'Last Updated':
                valA = new Date(a.updated).valueOf();
                valB = new Date(b.updated).valueOf();
                return ascending ? valA - valB : valB - valA
        }
    });
    return buildList;
}

/*
    Deletes builds with Ids matching the supplied ids in the request
*/
exports.deleteBuilds = async function (req, res) {
    let ids = req.body.ids;

    await Build.deleteMany({ _id: { $in: ids } });

    res.status(200);
    return {
        error: false,
        message: "Deleted builds."
    }
}

/*
    Upserts a build supplied in the request
*/
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
        description: build.description,
        owner: owner,
        genotype: build.genotype,
        created: Date.now(),
        updated: Date.now(),
        tags: build.tags,
    });

    await newBuild.save();

    res.status(200);
    return {
        error: false,
        build: JSON.stringify(newBuild)
    }

}

/*
    Updates a build supplied in the request
*/
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

/*
    If the user has already liked the build, removes that like.
    Otherwise, it adds the like
*/
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

/*
    Returns true if the build exists in the database
*/
async function buildExists(build) {
    if (!build._id) return false;

    let foundBuild = await Build.findOne({ _id: build._id });
    return foundBuild != null;
}

/*
    Builds an object for filtering builds in the database
    from a requests' parameters
*/
function buildFiltersFromQuery(query) {
    let parameters;
    if (typeof query === 'object') {
        parameters = query;
    }
    else {
        parameters = JSON.parse(decodeURIComponent(query));
    }

    // If no parameters are supplied, return the default
    if (!parameters) {
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

    // Transform parameter keys into filter keys
    for (let key in parameters) {
        if (!parameters[key]) continue;
        if (key == "owner.displayName" || key == "name") {
            parameters[key] = new RegExp(parameters[key], "i");
        }

        if (key == "sort") {
            sort = parameters[key];
            continue;
        }

        if (key == "page") {
            page = parameters[key];
            continue;
        }

        if (key == "username") {
            filters["owner.username"] = parameters[key];
        }
        else if (key == 'tags') {
            filters['tags'] = { '$in': parameters[key] };
        }
        else {
            filters[key] = parameters[key];
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