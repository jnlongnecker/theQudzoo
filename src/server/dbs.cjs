const mongoose = require("mongoose");
const dbUrl = `mongodb+srv://admin:${process.env.PW}${process.env.INSTANCE}${process.env.DB}`;

let User;
let Build;

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
        likes: Number
    });

    User = mongoose.model("User", userSchema);
    Build = mongoose.model("Build", buildSchema);
}

function disconnect() {
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

    let filters = buildFiltersFromQuery(req.params.info);

    try {
        allBuilds = await Build.find(filters,
            "name code owner.username owner.displayName public likes");
    }
    catch (e) {
        res.status(400);
        console.log(e.message);
        return {
            error: true,
            message: e.message
        }
    }

    let contextUser = req.session.user;

    // Strip owner and id from builds not owned by the requesting user
    for (let build of allBuilds) {
        if (!build.owner || build.owner.username != contextUser) {
            build._id = "";
            build.owner = null;
        }
    }

    res.status(200);
    return {
        error: false,
        builds: allBuilds
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
        likes: build.likes,
        public: build.public,
        owner: owner
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
        if (!rawBuild[key]) continue;

        updatedBuild[key] = rawBuild[key];
    }

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

async function buildExists(build) {
    if (!build._id) return false;

    let foundBuild = await Build.findOne({ _id: build._id });
    return foundBuild != null;
}

function buildFiltersFromQuery(query) {
    let headers = JSON.parse(decodeURIComponent(query));

    if (!headers) return {};

    let filters = {};

    for (let key in headers) {
        if (!headers[key]) continue;
        if (key == "username") {
            filters["owner.username"] = headers[key];
        }
        else {
            filters[key] = headers[key];
        }
    }

    return filters;
}

function getId(string) {
    console.log(typeof string);
    console.log(string);
    let endIndex = string.lastIndexOf(`"`);
    let startIndex = string.indexOf(`"`);

    return string(startIndex + 1, endIndex);
}