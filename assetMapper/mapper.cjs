const dataDirectory = __dirname + '/gameData/';
const logDirectory = __dirname + '/logs/';
const outputDirectory = __dirname + '/output/';
const loadOrder = ['RootObjects.xml', 'PhysicalPhenomena.xml', 'Items.xml', 'Creatures.xml', 'HiddenObjects.xml'];

const fs = require('fs');
const parser = require('./parser.cjs');

if (process.argv.length > 3) return;
let func = process.argv[2];

switch (func) {
    case 'test': test(); break;
    case 'colors':
    case 'color': writeColorMetadata(); break;
    case 'sugar': writeSugarMetadata(); break;
    case 'images':
    case 'image': writeColoredImages(); break;
    case 'previews':
    case 'preview': writeObjectPreviews(); break;
    case 'details':
    case 'detail': writeObjectDetails(); break;
}

function test() {
    let objects = readToObject(...loadOrder);
    fs.writeFileSync(`${outputDirectory}xmlObjectsItems.json`, JSON.stringify(objects, undefined, 4), { flag: 'w' });
}

function writeObjectPreviews() { }
function writeObjectDetails() { }

function writeColorMetadata() {
    let colorShaders = readToObject('Colors.xml');
    colorShaders = colorShaders['undefined'].other.reduce((newArray, data) => {
        if (data.tagName !== 'shader') return newArray;
        newArray.push({
            name: data.Name, algorithm: data.Type, colors: data.Colors
        });
        return newArray;
    }, [])
    fs.writeFileSync(`${outputDirectory}colorShaders.json`, JSON.stringify(colorShaders, undefined, 4), { flag: 'w' });
}

function writeSugarMetadata() {
    let allObjects = readToObject(...loadOrder);
    let mutations = readToObject('Mutations.xml', 'HiddenMutations.xml');
    let skills = readToObject('Skills.xml');
    let metadata = [];
    parser.addMutationSugar(mutations, metadata);
    parser.addSkillSugar(skills, metadata);
    parser.addStatSugar(metadata);
    parser.addCustomSugar(metadata);
    parser.addObjectSugar(allObjects, metadata);

    // Write metadata
    fs.writeFileSync(`${outputDirectory}sugarMetadata.json`, JSON.stringify(metadata, undefined, 4), { flag: 'w' });
    // Write log
    fs.writeFileSync(`${logDirectory}log.txt`, parser.getLog(), { flag: 'w' });
}

async function writeColoredImages() {

    let allObjects = readToObject(...loadOrder);
    let mutations = readToObject('Mutations.xml', 'HiddenMutations.xml');
    let skills = readToObject('Skills.xml');
    let abilities = readToObject('ActivatedAbilities.xml');
    let subtypes = readXMLFile('Subtypes.xml');
    await parser.processObjectImages(allObjects);
    await parser.processMutationImages(mutations);
    await parser.processSkillImages(skills);
    await parser.processAbilityImages(abilities);
    await parser.processSubtypeImages(subtypes);

    // Write log
    fs.writeFileSync(`${logDirectory}log.txt`, parser.getLog(), { flag: 'w' });
}

function readToObject(...fileNames) {
    let objectMap = {};

    for (let fileName of fileNames) {
        let objects = readXMLFile(fileName);
        for (let object of objects.children) {
            let endObj = parser.objectFromXMLObject(object);
            let name = endObj.Name ? endObj.Name : endObj.Command ? endObj.Command : endObj.ID;
            if (objectMap[name]) {
                let currObj = objectMap[name];
                for (let part of endObj.parts) currObj.parts.push(part);
                for (let tag of endObj.tags) currObj.tags.push(tag);
                for (let other of endObj.other) currObj.other.push(other);
            } else { objectMap[name] = endObj; }
        }
    }
    return objectMap;
}

function readXMLFile(fileName) {
    let fileText = fs.readFileSync(`${dataDirectory}${fileName}`, { encoding: 'utf-8' });
    return parser.parseXML(fileText);
}