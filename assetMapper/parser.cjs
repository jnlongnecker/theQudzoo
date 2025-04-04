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
    let index = endOfMetadata > 1 ? endOfMetadata : 0;
    while (true) {
        while (text[index++] !== '<');
        if (text[index + 1] !== '!') break;
    }
    let firstTag = [];
    while (text[index].trim() && text[index] !== '>') firstTag.push(text[index++]);
    let tagName = firstTag.join('');
    let results = parseTag(text, index, tagName);

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
        while (text[index].trim() && text[index] !== '>') childTagName.push(text[index++]);
        let results = parseTag(text, index, childTagName.join(''));
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

    // It's odd for an XML tag to have no attributes in the files
    // This typically only happens to plain text, but log it just in case
    // of a parsing error
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


/* 

    ============================== IMAGE PROCESSING =============================

*/

exports.processObjectImages = async function (allObjects) {
    for (let key in allObjects) {
        let item = allObjects[key];

        // We need the full part/tag list from the parent hierarchy, so pull that now
        inheritFromParent(item, allObjects);
        if (!getTag(item, 'BaseObject') && getPart(item, 'Render')) {
            if (!getTag(item, 'Item') && !getPart(item, 'Brain')) continue; // Skip if not a creature or item
            let renderPart = getPart(item, 'Render');
            if (!renderPart.Tile) continue; // Skip if this object has no tile

            // The main color is either pulled from the TileColor if defined or ColorString otherwise
            // The default is '&amp;y', so fallback to that if neither are defined
            let mainString = renderPart.TileColor ? renderPart.TileColor :
                renderPart.ColorString ? renderPart.ColorString : '&amp;y';

            // Technically, there is no default for the detail color, but I'm setting it to grey
            let detailString = renderPart.DetailColor ? renderPart.DetailColor : 'y';

            // The directory listed in the game files is weird, so format it properly
            let qudDir = renderPart.Tile;
            let builder = item.other.find(node => node.Name === 'RandomTile');
            if (builder) {
                qudDir = builder.Tiles.split(',')[0];
            }

            await linkAndGenerateImage(qudDir, mainString[5], detailString, item);
        }
    }
}

exports.processMutationImages = async function (allMutations) {
    for (let key in allMutations) {
        let category = allMutations[key];
        for (let mutation of category.other) {
            await linkAndGenerateImage(mutation.Tile, 'w', 'W', mutation);
        }
    }
}

exports.processSkillImages = async function (allSkills) {
    for (let key in allSkills) {
        let category = allSkills[key];
        await linkAndGenerateImage(category.Tile, category.Foreground, category.Detail, category);
        for (let skill of category.other) {
            await linkAndGenerateImage(skill.Tile, skill.Foreground, skill.Detail, skill);
        }
    }
}

exports.processAbilityImages = async function (allAbilities) {
    for (let key in allAbilities) {
        let ability = allAbilities[key];
        ability.other.forEach(async item => {
            if (item.tagName !== 'UITile') return;
            await linkAndGenerateImage(item.Tile, item.Foreground, item.Detail, ability);
        });
    }
}

exports.processSubtypeImages = async function (allSubtypes) {
    for (let casteCategory of allSubtypes.children[0].children) {
        for (let subtype of casteCategory.children) {
            let tile = subtype.attributes.find(att => att.name === 'Tile').value;
            let detail = subtype.attributes.find(att => att.name === 'DetailColor').value;
            let name = subtype.attributes.find(att => att.name === 'Name').value;
            await linkAndGenerateImage(tile, 'y', detail, { Name: name });
        }
    }
    for (let subtype of allSubtypes.children[1].children) {
        let tile = subtype.attributes.find(att => att.name === 'Tile').value;
        let detail = subtype.attributes.find(att => att.name === 'DetailColor').value;
        let name = subtype.attributes.find(att => att.name === 'Name').value;
        await linkAndGenerateImage(tile, 'y', detail, { Name: name });
    }
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
let correctedDir = projDir + '\\src\\assets\\images\\Textures\\';

/**
 * Links the new image link to the renderer part and generates the colored image
 * @param {Object} item Constructed XML object with all parts merged from parents.
 */
async function linkAndGenerateImage(qudDir, mainString, detailString, item) {
    // Format the Qud directory and point it to the right place in the project
    let relativeDirectory = formatDirectory(qudDir);
    let correctDirectory = assetDir + relativeDirectory;
    let qudzooDir = correctedDir + qudDirToQudzooDir(qudDir, item);

    // Pull the number representation of the hex code of each color
    let mainColor = jimp.cssColorToHex(`#${colors[mainString]}`);
    let detailColor = jimp.cssColorToHex(`#${colors[detailString]}`);

    // Rewrite the pixels using Jimp
    let jimpObj;
    try {
        jimpObj = await jimp.Jimp.read(correctDirectory);
    } catch (e) {
        logger.log(`Problem with rendering asset ${item.Name}, tried to load ${correctDirectory} from ${qudDir}`);
        logger.log(e);
        return;
    }

    // There are 3 colors: transparency (0), black (255) and white (0xffffffff)
    // Black = main color, White = detail color
    jimpObj.scan((x, y, idx) => {
        let color = jimpObj.getPixelColor(x, y);
        if (color == 255) jimpObj.setPixelColor(mainColor, x, y);
        else if (color == 0xffffffff) jimpObj.setPixelColor(detailColor, x, y);
    });

    try {
        await jimpObj.write(qudzooDir);
    } catch (e) {
        logger.log(`Problem creating asset for ${item.Name}, tried to write ${correctedDir + relativeDirectory}`);
        logger.log(e);
        return;
    }
}

const textureDirNames = [
    'abilities', 'creatures', 'items',
    'liquids', 'mutations', 'text', 'water',
    'tiles', 'tiles2', 'terrain', 'vehicles'
];

/**
 * Formats a Qud directory string to something actually useful
 * @param {string} qudDir The directory Qud uses. 
 * Can be in the form directory/filename.extension or in the form long_path_to_directory_filename.extension
 * @returns string
 */
function formatDirectory(qudDir) {
    let parts = qudDir.split('/');
    if (parts.length === 1) parts = qudDir.split('\\'); // Sometimes, Qud uses '\' instead of '/'

    // If there are more than 2 parts, it's in the format long/path/to/directory/filename.extension
    if (parts.length > 2) {
        parts = parts.slice(-2);

        // If there is one part, it's in the format long_path_to_directory_filename.extension
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
    // By now, parts is in the format [directoryName, fileName]
    let dir = parts[0].toLowerCase().substring(1);
    dir = parts[0][0].toUpperCase() + dir;
    return `${dir}\\${parts[1]}`;
}

function qudDirToQudzooDir(qudDir, item) {
    let name = item.Name ? item.Name : item.Command;
    name = name.replaceAll('/', '');
    name = name.replaceAll("'", '&#x27;');
    name = name.replaceAll(':', '');
    let formattedDir = formatDirectory(qudDir);
    return formattedDir.substring(0, formattedDir.indexOf('\\') + 1) + `${name}.png`;
}

/* 

    ============================== END IMAGE PROCESSING =============================


    ============================== SUGAR METADATA PROCESSING =============================
    
*/

exports.addObjectSugar = function (allObjects, metadataArray) {
    for (let key in allObjects) {
        let item = allObjects[key];

        // We need the full part/tag list from the parent hierarchy, so pull that now
        inheritFromParent(item, allObjects);
        if (getTag(item, 'BaseObject')) continue; // Skip if a base object
        if (getTag(item, 'Projectile')) continue; // Skip if a projectile
        if (!getTag(item, 'Item') && !getPart(item, 'Brain')) continue; // Skip if not a creature or item
        if (item.Name.includes('Chiliad')) continue // Skip if a chiliad (endgame) thing
        let renderPart = getPart(item, 'Render');
        if (!renderPart?.Tile) continue; // Skip if an untiled item
        if (renderPart.DisplayName === 'waterskin' && item.Name !== 'Waterskin') continue; // Skip waterskin duplicates
        let adjectivePart = getPart(item, 'DisplayNameFactionAdjective');
        let adjective = adjectivePart ? adjectivePart.FactionAdjective + ' ' : '';

        let src = renderPart.Tile;
        let builder = item.other.find(node => node.Name === 'RandomTile');
        if (builder) {
            src = builder.Tiles.split(',')[0];
        }
        let isCybernetic = item.other.find(item => item.tagName === 'stag' && item.Name === 'Cybernetics');
        let innerSpanClass = isCybernetic ? 'cybernetic' : 'object';
        let sugarObj = buildSugarObject(item, adjective + renderPart.DisplayName, innerSpanClass, src);

        // Custom exception for _, the name overlaps with markdown syntax (annoyingly)
        if (sugarObj.displayName === '_') {
            sugarObj.name = 'dreamer';
        }
        metadataArray.push(sugarObj);
    }
}

exports.addMutationSugar = function (mutations, metadataArray) {
    for (let key in mutations) {
        let category = mutations[key];
        for (let mutation of category.other) {
            let src = mutation.Tile;
            let spanClass = 'mutation';
            let modifier = mutation.Cost < 0 ? '{{Y|({{r|D}})}}' : ''
            let displayName = mutation.Name;
            let sugarObj = buildSugarObject(mutation, displayName, spanClass, src);
            sugarObj.displayName += modifier;
            metadataArray.push(sugarObj);
        }
    }
}

exports.addSkillSugar = function (skills, metadataArray) {
    for (let key in skills) {
        let category = skills[key];
        let categorySrc = category.Tile;
        let spanClass = 'skill';
        let categoryName = category.Name;
        metadataArray.push(buildSugarObject(category, categoryName, spanClass, categorySrc));
        for (let skill of category.other) {
            let skillSrc = skill.Tile;
            let spanClass = 'skill';
            let skillName = skill.Name;
            metadataArray.push(buildSugarObject(skill, skillName, spanClass, skillSrc));
        }
    }
}

exports.addStatSugar = function (metadataArray) {
    metadataArray.push(buildCustomSugarObject('Strength', 'attribute strength'));
    metadataArray.push(buildCustomSugarObject('Agility', 'attribute agility'));
    metadataArray.push(buildCustomSugarObject('Toughness', 'attribute toughness'));
    metadataArray.push(buildCustomSugarObject('Intelligence', 'attribute intelligence'));
    metadataArray.push(buildCustomSugarObject('Willpower', 'attribute willpower'));
    metadataArray.push(buildCustomSugarObject('Ego', 'attribute ego'));
    metadataArray.push(buildCustomSugarObject('HP', 'stat', 'Text/hitpoints.png'));
    metadataArray.push(buildCustomSugarObject('AV', 'stat', 'Text/armorValue.png'));
    metadataArray.push(buildCustomSugarObject('DV', 'stat', 'Text/dodgeValue.png'));
    metadataArray.push(buildCustomSugarObject('PV', 'stat pv'));
    metadataArray.push(buildCustomSugarObject('MA', 'stat'));
}

exports.addCustomSugar = function (metadataArray) {
    metadataArray.push(buildCustomSugarObject('Harvest', 'skill', 'Abilities/CommandHarvestToggle.png'));
    metadataArray.push(buildCustomSugarObject('Butcher', 'skill', 'Abilities/CommandButcherToggle.png'));
    metadataArray.push(buildCustomSugarObject('Sprint', 'skill', 'Abilities/CommandToggleRunning.png'));
    metadataArray.push(buildCustomSugarObject('Flight', 'skill', 'Abilities/CommandFlyToggle.png'));
    metadataArray.push(buildCustomSugarObject('Stinger', 'mutation', 'Mutations/CommandSting.png'));
    metadataArray.push(buildCustomSugarObject('Sting', 'skill', 'Mutations/CommandSting.png'));
    metadataArray.push(buildCustomSugarObject('Beguile', 'skill', 'Mutations/CommandBeguileCreature.png'));
    metadataArray.push(buildCustomSugarObject('Prowl', 'skill', 'Items/CommandToggleNocturnalApex.png'));
    metadataArray.push(buildCustomSugarObject('Aggressive Stance', 'skill', 'Abilities/CommandAggressiveStance.png'));
    metadataArray.push(buildCustomSugarObject('Defensive Stance', 'skill', 'Abilities/CommandDefensiveStance.png'));
    metadataArray.push(buildCustomSugarObject('Dueling Stance', 'skill', 'Abilities/CommandDuelingStance.png'));
}

function buildCustomSugarObject(displayName, innerClass, src = undefined, objectName = undefined) {
    objectName = objectName ? objectName : displayName;
    let imageMarkup = '';
    if (src !== undefined) {
        let containerClass = innerClass === 'stat' ? 'stat-container' : 'icon-container';
        imageMarkup = `<span class="${containerClass}"><img class="inline-icon" src="!!!!" /></span>`;
    }
    let prefix = `<span class="injected">${imageMarkup}<span class="${innerClass}">`;
    let suffix = `</span></span>`;
    return {
        name: objectName,
        displayName: displayName,
        prefix, suffix, src
    }
}

function buildSugarObject(item, displayName, innerClass, src = undefined) {
    let objectName = unformatDisplayName(displayName);
    if (src !== undefined) {
        // The directory listed in the game files is weird, so format it properly
        if (src !== '') {
            src = qudDirToQudzooDir(src, item);
            src = src.replaceAll('\\', '/'); // LWC file system expects '/' and node wants '\' my life sucks
        }
    } else {
        logger.log(`No tile for ${item ? item.Name : displayName}`);
    }
    return buildCustomSugarObject(displayName, innerClass, src, objectName);
}

/**
 * Translates a potentially formatted string to an unformatted string.
 * @example "{{R|mumble mouth}}"  => "mumble mouth"
 * @param {string} displayName The Qud formatted display string
 * @returns string
 */
function unformatDisplayName(displayName) {
    let nameParts = [];
    let index = 0;
    while (index < displayName.length) {
        let char = displayName[index];
        switch (char) {
            case '{':
                while (displayName[index] !== '|') index++;
                index++;
                break;
            case '}':
                while (displayName[index] === '}') index++;
                break;
            default:
                nameParts.push(char);
                index++;
                break;
        }
    }
    return nameParts.join('');
}