const lwr = require("lwr");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const api = require("./api.cjs");
const dbs = require("./dbs.cjs");

const lwrServer = lwr.createServer();
const longCache = 60 * 60;
const shortCache = 60 * 5;

const app = lwrServer.getInternalServer("express");
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://admin:${process.env.PW}${process.env.INSTANCE}`
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dbs.dbConnect();

app.get("/api/:info", (req, res) => {
    res.set("Cache-control", `public, max-age=${longCache}`);
    api.processRequest(res, req).then(result => res.json(result));
});
app.get("/api/codes/serialize/:info", (req, res) => {
    res.set("Cache-control", `public, max-age=${longCache}`);
    api.processBuildRequest(res, req, 'serialize').then(result => res.json(result));
});
app.get("/api/codes/parse/:info", (req, res) => {
    res.set("Cache-control", `public, max-age=${longCache}`);
    api.processBuildRequest(res, req, 'parse').then(result => res.json(result));
});
app.post("/db/login", (req, res) => {
    return dbs.validateLogin(req, res).then(result => {
        if (!result.success) { res.json(result); return; }

        req.session.user = result.user;

        res.json({ success: true });
    });
});
app.post("/db/users", (req, res) => {
    return dbs.updateUser(req, res).then(result => res.json(result)).catch(err => res.json(err));
});
app.post("/db/register", (req, res) => {
    return dbs.registerUser(req, res).then(result => {
        if (!result.success) { res.json(result); return; }

        req.session.user = result.user;

        res.json(result);
    })
});
app.get("/db/authenticated", (req, res) => {
    return dbs.getAuthenticatedUser(req, res).then(result => {
        res.json(result);
    })
});
app.get("/db/login", (req, res) => {
    res.json({ user: req.session.user });
});
app.get("/db/builds/:info", (req, res) => {
    return dbs.getBuilds(req, res).then(result => res.json(result));
});
app.delete("/db/builds", (req, res) => {
    return dbs.deleteBuilds(req, res).then(result => res.json(result));
})
app.post("/db/logout", async (req, res) => {
    if (req.session)
        await req.session.destroy();
    let response = {
        error: false,
        message: "Successfully logged out"
    }

    res.json(response);
});
app.post("/db/savebuild", async (req, res) => {
    if (!req.session) {
        res.status(400);
        const response = {
            error: true,
            message: "Build save failed: Invalid session"
        }
        res.json(response);
        return;
    }

    let response = await dbs.saveBuild(req, res);
    res.json(response);
})
let mode = "dev";

if (process.argv.length >= 3) {
    mode = process.argv[2];
}

lwrServer.config.serverMode = mode;

lwrServer.listen(({ port, serverMode }) => {
    console.log(`App listening on port ${port} in ${serverMode} mode\n`);
    api.setApp(lwrServer);
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

