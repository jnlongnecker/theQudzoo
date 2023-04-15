/*
    Author: Jared Longnecker
    Description: This module is used to handle HTTP
    requests to the static server side API
*/

const fs = require("fs");
const codeManager = require("./buildCodes.cjs");
const rootDir = __dirname.substring(0, __dirname.indexOf("src") - 1);
let app;

/*
    Allows us to cache a reference to the LWC App in this file
*/
exports.setApp = (lwrApp) => {
    app = lwrApp;
}

/*
    Handles a request for a Qud build code; either decoding a code or 
    encoding a build as a code
*/
exports.processBuildRequest = async (res, req, method) => {
    try {
        let response;
        let val = req.params.info;
        if (method == "parse") {
            response = codeManager.codeToJSON(decodeURIComponent(val));
        }
        else if (method == "serialize") {
            response = codeManager.jsonToCode(decodeURIComponent(val));
        }
        return response;
    }
    catch (e) {
        res.status(500);
        console.log(e);
        return { error: e };
    }
}

/*
    Handles a basic request to retrieve static data on the server
*/
exports.processRequest = async (res, req) => {
    try {
        let response;
        let path = req.params.info;
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

/*
    Retrieves all quest names from the routes stored
    in the LWC App object
*/
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

/*
    Retrieves all article names from the routes stored
    in the LWC App object
*/
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

/*
    Retrieves a JSON of static server-side data
    based on the input dataString
*/
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

/*
    Replaces all instances of the input character with the replacement
    in the input string
*/
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