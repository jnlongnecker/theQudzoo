const { gzipSync, unzipSync } = require("zlib");

let testCode = "H4sIAAAAAAAACs1W32vbMBB+L/R/EGaPdkhLNkohD57bbd3SkNUhHYw+yPZhi8mS0I+OLOR/n2Snie1sSztIcUywdd/dp893p8Or0xOEvByX8AhSEc68S+SdD4aD8+Fo8PbC8ys8MYRmDYcz6zDcYCXPDAVlzd/dGqFVfdtC86UAF/TtbjKICixxqkG+d4xq8NVk7v8RGNfW7bYK8FGoFJQJXQZRbAOEjxb13uOdMh9FhmojYczAaImpj2YmoST9Ass5/wFszAyltcZKTIY1tjK26qzpjX6ptCtLsidvt4nlfPJ3tLdGYw0Z+mRKzFpee7l8wtb1w9r/71zGJulpKlvKDmdy4+5Ip7zE2WslsKqa5VY9TGFH2+EklsIyDpsWBRTSimN3ZOvfqrlAm/bdJDmycgROoUleOUXcMG09zrrAAkuCK2jYhR5raGqnjuP2mvDaf66kK24zDEFpVEoh65GwW9sKRFBAE8hVj3RNSV5otCDVwemPrHvCepWmOWckRSGlIPPl8XXtFg+vNOBCrSVJjIY+TriuuMMjbsYJ02pmZFpgZQfBZbu6XqwlsFwXFrhoVcYLc0KJXu4Dc27ygoFyI/JdG7phGiglObAU9gPvCaWC/wS5D13n3LHtbM2O9LCIBVTdE4xGbeAOSkyYPSTdSZ7Y1w3dfG9HHLFzIqM0L8kv2OI97KC/iTzcSWxzQMPgg71ugmlw3cIFuAI5lU2rbYWsKngXEJIzOy3iP0Yds0oF5wpijaW2XTPhaTXa+lipfwh9xvdhJ85t9pkLgV/2oehuD6cn69+8rF/JCg0AAA==";

exports.codeToJSON = function (buildCode) {
    if (!buildCode) throw "Error: Invalid input.";

    const buffer = Buffer.from(buildCode, "base64");
    let unzippedBuffer = unzipSync(buffer);

    return JSON.parse(unzippedBuffer.toString());
}

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