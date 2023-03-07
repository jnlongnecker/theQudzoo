const fs = require("fs");
const codeManager = require("./buildCodes.cjs");
const rootDir = __dirname.substring(0, __dirname.indexOf("src") - 1);
let app;


exports.setApp = (lwrApp) => {
    app = lwrApp;
}

exports.processRequest = async (res, req) => {
    try {
        let response;
        let path = req.params.info;
        let query = req.query;
        switch (path) {
            case "articles":
                response = await getArticlesPayload();
                res.status(200);
                return response;
            case "quests":
                response = await getQuestsPayload();
                res.status(200);
                return response;
            case "mutations":
            case "skills":
            case "attributes":
            case "stats":
            case "callings":
            case "castes":
            case "cybernetics":
                response = await getData(path);
                res.status(200);
                return response;
            case "codes":
                if (!query) {
                    res.status(400);
                    throw "Error: No query supplied";
                }
                if (query.method == "parse") {
                    response = codeManager.codeToJSON(decodeURIComponent(query.value));
                }
                else if (query.method == "build") {
                    response = codeManager.jsonToCode(decodeURIComponent(query.value));
                }
                else {
                    res.status(400);
                    throw "Error: Invalid method supplied.";
                }
                return response;
            default:
                res.status(400);
                return { error: "Invalid parameters supplied." };
        }
    }
    catch (exception) {
        res.status(500);
        console.log(exception);
        return { error: exception };
    }
}

function buildQueryObject(rawQuery) {
    let params = rawQuery.split("&");
    let queryObj = {};
    for (let parameter of params) {
        let keyValue = parameter.split("=");
        let key = keyValue[0];
        let value = keyValue[1];
        queryObj[key] = value;
    }

    return queryObj;
}

async function getQuestsPayload() {
    let payload = {
        quests: []
    };

    let config = app.config;

    for (let route of config.routes) {
        if (route.path.indexOf("quests/") == -1) continue;

        let quest = {
            label: replaceAll(route.id, "-", " "),
            link: route.path,
            class: "normal",
            preview: route.properties?.preview
        }

        payload.quests.push(quest);
    }

    return payload;
}

async function getArticlesPayload() {
    let payload = {
        articles: []
    };

    let config = app.config;

    for (let route of config.routes) {
        if (route.path.indexOf("advice/") == -1) continue;
        if (route.path.indexOf("quests/") != -1) continue;

        let article = {
            label: replaceAll(route.id, "-", " "),
            link: route.path,
            class: "normal",
            preview: route.properties?.preview
        }

        payload.articles.push(article);
    }

    return payload;
}

async function getData(dataString) {
    let path;
    let json;
    try {
        path = `${rootDir}/src/api/data/${dataString}.json`;
        json = JSON.parse(fs.readFileSync(path));
    }
    catch (exception) {
        throw new Error("No data found for " + dataString);
    }

    return json;
}

function replaceAll(str, character, replacement) {
    let newString = "";
    for (let char of str) {
        if (char === character) {
            newString += replacement;
            continue;
        }
        newString += char;
    }

    return newString;
}