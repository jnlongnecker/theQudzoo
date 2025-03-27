const dataDirectory = __dirname + '/gameData/';
const logDirectory = __dirname + '/logs/';
const outputDirectory = __dirname + '/output/';
const testOrder = ['RootObjects.xml', 'PhysicalPhenomena.xml', 'Items.xml'];
const loadOrder = ['RootObjects.xml', 'PhysicalPhenomena.xml', 'Items.xml', 'Creatures.xml', 'HiddenObjects.xml'];

const fs = require('fs');
const parser = require('./parser.cjs');

run();

function test() {
    let fileText = fs.readFileSync(`${dataDirectory}Items.xml`, { encoding: 'utf-8' });
    let objects = parser.parseXML(fileText);
    fs.writeFileSync(`${outputDirectory}xmlObjectsItems.json`, JSON.stringify(objects, undefined, 4), { flag: 'w' });
}

function run() {
    let allObjects = {};

    for (let fileName of testOrder) {
        let fileText = fs.readFileSync(`${dataDirectory}${fileName}`, { encoding: 'utf-8' });
        let objects = parser.parseXML(fileText);
        for (let object of objects.children) {
            let endObj = parser.objectFromXMLObject(object);
            allObjects[endObj.Name] = endObj;
        }
    }

    parser.processList(allObjects).then(results => {

        fs.writeFileSync(`${logDirectory}log.txt`, parser.getLog(), { flag: 'w' });
        fs.writeFileSync(`${outputDirectory}creatures.json`, JSON.stringify(results.visibleCreatures, undefined, 4), { flag: 'w' });
        fs.writeFileSync(`${outputDirectory}hiddenCreatures.json`, JSON.stringify(results.hiddenCreatures, undefined, 4), { flag: 'w' });

        fs.writeFileSync(`${outputDirectory}items.json`, JSON.stringify(results.visibleItems, undefined, 4), { flag: 'w' });
        fs.writeFileSync(`${outputDirectory}hiddenItems.json`, JSON.stringify(results.hiddenItems, undefined, 4), { flag: 'w' });

        fs.writeFileSync(`${outputDirectory}objects.json`, JSON.stringify(allObjects, undefined, 4), { flag: 'w' });
    });
}