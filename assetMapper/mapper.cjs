const dataDirectory = __dirname + '/gameData/';
const logDirectory = __dirname + '/logs/';
const outputDirectory = __dirname + '/output/';
const loadOrder = ['Items.xml', 'Creatures.xml', 'PhysicalPhenomena.xml', 'HiddenObjects.xml'];

const fs = require('fs');
const parser = require('./parser.cjs');



let text = fs.readFileSync(`${dataDirectory}TutorialStaging.xml`, { encoding: 'utf-8' });
let xmlObject = parser.parseXML(text);
fs.writeFileSync(`${logDirectory}log.txt`, parser.getLog(), { flag: 'w' });