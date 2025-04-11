/*
    Author: Jared Longnecker
    Description: This module is used to handle HTTP
    requests to the static server side API
*/

const fs = require("fs");
const qudData = require("./qudData.cjs");
const startsDetails = require("../api/data/details/startsDetails.json");
const codeManager = require("./buildCodes.cjs");
const rootDir = __dirname.substring(0, __dirname.indexOf("src") - 1);
const subsets = ["quests", "novice"];
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

exports.processPreviewRequest = async (res, req) => {
    try {
        let response;
        let val = req.params.info;
        switch (val) {
            case 'creatures':
                response = qudData.getCreaturePreviews(req, res);
                break;
            case 'melee':
                response = qudData.getMeleePreviews(req, res);
                break;
            case 'armor':
                response = qudData.getArmorPreviews(req, res);
                break;
            default:
                res.status(400);
                return { error: "Invalid parameters supplied." };
        }
        return response;
    }
    catch (e) {
        res.status(500);
        console.log(e);
        return { error: e };
    }
}

exports.processDetailsRequest = async (res, req) => {
    try {
        let response;
        let val = req.params.info;
        switch (val) {
            case 'creatures':
                response = qudData.getCreatureDetails(req, res);
                break;
            case 'melee':
                response = qudData.getMeleeDetails(req, res);
                break;
            case 'armor':
                response = qudData.getArmorDetails(req, res);
                break;
            case 'starts':
                response = startsDetails;
                break;
            default:
                res.status(400);
                return { error: "Invalid parameters supplied." };
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
                response = await getSubsetPayload("quests");
                res.status(200);
                return response;
            case "novice":
                response = await getSubsetPayload("novice");
                res.status(200);
                return response;
            case "mutations":
            case "skills":
            case "creatures":
            case "items":
            case "attributes":
            case "stats":
            case "callings":
            case "castes":
            case "cybernetics":
                response = await getData(path);
                res.status(200);
                return response;
            case "previews":
                response = qudData.getCreaturePreviews
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
    Retrieves all subset article names from the routes stored
    in the LWC App object
*/
async function getSubsetPayload(subsetName) {
    let payload = {
        articles: [],
    };

    let config = app.config;
    for (let route of config.routes) {
        if (route.path.indexOf(`${subsetName}/`) == -1) continue;

        let article = {
            label: replaceAll(route.id, "-", " "),
            link: route.path,
            class: "indented",
            preview: route.properties?.preview
        }

        payload.articles.push(article);
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
        if (route.path.indexOf("novice/") != -1) continue;

        let article = {
            label: replaceAll(route.id, "-", " "),
            link: route.path,
            class: "normal",
            preview: route.properties?.preview
        }

        for (let name of subsets) {
            if (route.path.indexOf(name) != -1) {
                article.articles = (await getSubsetPayload(name)).articles;
            }
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