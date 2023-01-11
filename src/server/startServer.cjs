const lwr = require("lwr");
const api = require("./api.cjs");

const lwrServer = lwr.createServer();

const app = lwrServer.getInternalServer("express");

app.get("/api/:info", (req, res) => {
    api.processRequest(res, req.params.info).then(result => res.json(result));
});
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

