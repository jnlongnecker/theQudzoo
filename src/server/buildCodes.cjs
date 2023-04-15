/*
    Author: Jared Longnecker
    Description: This module is used to handle the encoding
    and decoding of Qud build codes
*/

const { gzipSync, unzipSync } = require("zlib");

/*
    Converts a build code to a JS object
*/
exports.codeToJSON = function (buildCode) {
    if (!buildCode) throw "Error: Invalid input.";

    const buffer = Buffer.from(buildCode, "base64");
    let unzippedBuffer = unzipSync(buffer);

    return JSON.parse(unzippedBuffer.toString());
}

/*
    Converts a JS object to a build code
*/
exports.jsonToCode = function (obj) {
    if (!obj) throw "Error: Invalid input.";

    const objType = typeof obj;
    if (objType !== "string" && objType !== "object") {
        throw "Error: Can only build a code from a JSON string or object.";
    }

    let objString = obj;
    if (objType == "object") {
        objString = JSON.stringify(obj);
    }

    const buffer = Buffer.from(objString);
    const rezippedBuffer = gzipSync(buffer);

    return rezippedBuffer.toString("base64");
}