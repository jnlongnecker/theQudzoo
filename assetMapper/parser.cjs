const colors = require('./colors.json');
const jimp = require('jimp');
const projDir = __dirname.substring(0, __dirname.lastIndexOf('\\'));

class Logger {
    lines = [];

    log(line) {
        this.lines.push(line);
    }

    toString() {
        return this.lines.join('\n');
    }
}

let logger = new Logger();

exports.getLog = function () {
    return logger.toString();
}

exports.parseXML = function (text) {
    let endOfMetadata = text.indexOf('?>') + 2;
    let firstTag = 'objects';
    let start = text.indexOf('objects>', endOfMetadata) + 7;
    let results = parseTag(text, start, firstTag);

    return results[0];
}

function parseTag(text, index, tagName) {
    let attributes = [];

    // Parse out attributes
    while (true) {
        // Trim out the noise, or break at the end
        let char = text[index];
        if (char === '>') break;
        if (char === '/') { index++; break; }
        if (!char.trim()) { index++; continue; }

        // Pull out the attribute data
        let attribute = [];
        let quoteCount = 0;
        while (quoteCount < 2) {
            if (text[index] === '"') quoteCount++;
            attribute.push(text[index++]);
        }
        let attString = attribute.join('');
        let parts = attString.split('=');
        attributes.push({ name: parts[0], value: stripQuotes(parts[1]) });
    }

    // Build out the tag object structure
    let tag = {
        name: tagName, children: [],
        attributes
    }

    // If this tag is self closing, we don't need to parse any children so just return it
    let selfClosing = text[index - 1] === '/';
    if (selfClosing) {
        return [tag, index + 1];
    }
    index++;

    // If not, we need to parse out the children
    while (true) {

        // Parse plain text
        let plainText = [];
        while (text[index] !== '<') plainText.push(text[index++]);
        let plainTextString = plainText.join('').trim();
        if (plainTextString.length > 0) { tag.children.push({ name: 'PlainText', value: plainTextString }); }
        index++;

        // If the tag is a comment, just skip past it
        if (text[index] === '!') {
            index = text.indexOf('-->', index) + 3;
            continue;
        }
        // If the tag is a closing tag, that means it's this tags closing tag
        if (text[index] === '/') {
            index = text.indexOf('>', index) + 1;
            return [tag, index];
        }

        // Otherwise, get the name and parse the child tag
        let childTagName = [];
        while (text[index].trim()) childTagName.push(text[index++]);
        let results = parseTag(text, index + 1, childTagName.join(''));
        tag.children.push(results[0]);
        index = results[1];
    }
}

function stripQuotes(text) {
    if (!text) return '';
    return text.substring(1, text.length - 1);
}

exports.objectFromXMLObject = function (xmlObject) {
    let parts = [];
    let tags = [];
    let other = [];

    // For each child, put it in its appropriate place
    for (let childTag of xmlObject.children) {
        let obj = toObject(childTag);
        if (childTag.name === 'part') parts.push(obj);
        else if (childTag.name === 'tag') tags.push(obj);
        else {
            obj.tagName = childTag.name;
            other.push(obj);
        }
    }
    return toObject(xmlObject, parts, tags, other);
}

function toObject(xmlTagObject, parts, tags, other) {
    let obj = { parts, tags, other };
    if (!xmlTagObject.attributes) {
        logger.log(`XML Object had no tags:`);
        logger.log(JSON.stringify(xmlTagObject));
        return obj;
    }
    for (let attribute of xmlTagObject.attributes) {
        obj[attribute.name] = attribute.value;
    }
    return obj;
}

exports.processList = async function (allObjects) {
    let ret = { hiddenItems: [], visibleItems: [], hiddenCreatures: [], visibleCreatures: [] };
    for (let key in allObjects) {
        let item = allObjects[key];
        inheritFromParent(item, allObjects);
        if (getTag(item, 'Item')) {
            if (getTag(item, 'BaseObject')) ret.hiddenItems.push(item);
            else {
                if (getPart(item, 'Render')) await linkAndGenerateImage(item);
                ret.visibleItems.push(item);
            }
        } else if (getPart(item, 'Brain')) {
            if (getTag(item, 'BaseObject')) ret.hiddenCreatures.push(item);
            else {
                if (getPart(item, 'Render')) await linkAndGenerateImage(item);
                ret.visibleCreatures.push(item);
            }
        }
    }
    return ret;
}

function inheritFromParent(item, allObjects) {
    if (item.clean) return;
    if (item.Inherits) {
        let parent = allObjects[item.Inherits];
        if (!parent) { logger.log(`Couldn't find parent: ${item.Inherits}`); return; }
        inheritFromParent(parent, allObjects);
        mergeParts(item.parts, parent.parts);
        mergeTags(item.tags, parent.tags);
        mergeParts(item.other, parent.other);
    }
    item.clean = true;
}

function getPart(obj, partName) {
    if (!obj.parts) return null;
    for (let part of obj.parts) {
        if (part.Name === partName) return part;
    }
    return null;
}

function getTag(obj, tagName) {
    if (!obj.tags) return null;
    for (let tag of obj.tags) {
        if (tag.Name === tagName) return tag;
    }
    return null;
}

function mergeParts(childParts, parentParts) {
    for (let part of parentParts) {
        let matchingPart = childParts.find(item => item.Name === part.Name);
        if (!matchingPart) {
            childParts.push(JSON.parse(JSON.stringify(part)));
            continue;
        }
        for (let key in part) {
            if (!matchingPart[key]) matchingPart[key] = part[key];
        }
    }
}

function mergeTags(childTags, parentTags) {
    for (let tag of parentTags) {
        if (tag.Value === '*noinherit') continue;
        if (childTags.find(item => item.Name === tag.Name)) continue;
        childTags.push(tag);
    }
}

let assetDir = projDir + '\\src\\assets\\Textures\\';
let correctedDir = projDir + '\\src\\assets\\corrected\\Textures\\';

async function linkAndGenerateImage(item) {
    let renderPart = getPart(item, 'Render');
    if (!renderPart.Tile) return;

    let foregroundString = renderPart.TileColor ? renderPart.TileColor :
        renderPart.ColorString ? renderPart.ColorString : '&amp;y';
    let backgroundString = renderPart.DetailColor ? renderPart.DetailColor : 'y';
    let qudDir = renderPart.Tile;
    let relativeDirectory = formatDirectory(qudDir);
    let correctDirectory = assetDir + relativeDirectory;

    relativeDirectory = relativeDirectory.substring(0, relativeDirectory.length - 4) + '.png';
    renderPart.correctedTile = relativeDirectory;
    let foregroundColor = jimp.cssColorToHex(`#${colors[foregroundString[5]]}`);
    let backgroundColor = jimp.cssColorToHex(`#${colors[backgroundString]}`);

    let jimpObj;
    try {
        jimpObj = await jimp.Jimp.read(correctDirectory);
    } catch (e) {
        logger.log(`Problem with rendering asset ${item.Name}, tried to load ${correctDirectory} from ${qudDir}`);
        logger.log(e);
        return;
    }

    jimpObj.scan((x, y, idx) => {
        let color = jimpObj.getPixelColor(x, y);
        if (color == 255) jimpObj.setPixelColor(foregroundColor, x, y);
        else if (color == 0xffffffff) jimpObj.setPixelColor(backgroundColor, x, y);
    });

    try {
        await jimpObj.write(correctedDir + relativeDirectory);
    } catch (e) {
        logger.log(`Problem creating asset for ${item.Name}, tried to write ${correctedDir + relativeDirectory}`);
        logger.log(e);
        return;
    }
}

const textureDirNames = ['abilities', 'creatures', 'items', 'liquids', 'mutations', 'text', 'water'];

function formatDirectory(qudDir) {
    let parts = qudDir.split('/');
    if (parts.length === 1) parts = qudDir.split('\\');
    if (parts.length > 2) {
        parts = parts.slice(-2);
    } else if (parts.length === 1) {
        parts = qudDir.split('_');
        let sliceAt = 0;
        for (let i = parts.length - 1; i >= 0; i--) {
            sliceAt--;
            let item = parts[i];
            if (textureDirNames.find(name => name === item.toLowerCase())) break;
        }
        parts = parts.slice(sliceAt);
        let afterDir = parts.slice(1);
        parts = [parts[0], afterDir.join('_')];
    }
    let dir = parts[0].toLowerCase().substring(1);
    dir = parts[0][0].toUpperCase() + dir;
    return `${dir}\\${parts[1]}`;
}