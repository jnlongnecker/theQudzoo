const itemPreviews = require('../api/data/previews/itemPreviews.json');
const creaturePreviews = require('../api/data/previews/creaturePreviews.json');
const itemDetails = require('../api/data/details/itemDetails.json');
const creatureDetails = require('../api/data/details/creatureDetails.json');

exports.getItemPreviews = function (req, res) {
    let params = req.query;
    let neededSlot = params.slot;
    let neededTerm = params.term.toLowerCase();
    let termParts = neededTerm.split(';');

    let filteredItems = itemPreviews.filter(item => {
        let slots = item.slots.split(',');
        for (let slot of slots) {
            if (slot === neededSlot) return true;
        }
        return false;
    });
    let result = searchAndSort(filteredItems, termParts, searchResultItem);

    res.status(200);
    return { result };
}

exports.getCreaturePreviews = function (req, res) {
    let params = req.query;
    let neededTerm = params.term.toLowerCase();
    let termParts = neededTerm.split(';');
    let result = searchAndSort(creaturePreviews, termParts, searchResultCreature);

    res.status(200);
    return { result };
}

function searchAndSort(array, terms, searchFunction) {
    let finalArr = [];
    for (let item of array) {
        let result = searchFunction(item, terms);
        if (result.quality > 0) finalArr.push({ item, quality: result.quality });
    }
    finalArr.sort((a, b) => b.quality - a.quality);
    return finalArr;
}

function searchResultCreature(creature, terms) {
    let quality = 0;
    for (let term of terms) {
        let displayHit = creature.cleanedName.toLowerCase().indexOf(term);
        let nameHit = creature.name.toLowerCase().indexOf(term);
        let factionHit = creature.factions.toLowerCase().indexOf(term);
        if (displayHit >= 0)
            quality += creature.cleanedName.length - displayHit;// - (creature.cleanedName.length - term.length);
        if (nameHit >= 0)
            quality += creature.name.length - nameHit;// - (creature.name.length - term.length);
        if (factionHit >= 0)
            quality += creature.factions.length - factionHit;// - (creature.factions.length - term.length);
    }
    return { quality };
}

function searchResultItem(item, terms) {
    let quality = 0;
    for (let term of terms) {
        let displayHit = item.cleanedName.toLowerCase().indexOf(term);
        let nameHit = item.name.toLowerCase().indexOf(term);
        if (displayHit >= 0)
            quality += item.cleanedName.length - displayHit;// - (item.cleanedName.length - term.length);
        if (nameHit >= 0)
            quality += item.name.length - nameHit;// - (item.name.length - term.length);
    }
    return { quality };
}

exports.getCreatureDetails = function (req, res) {
    let params = req.query;
    let creatureName = params.name;

    let result = creatureDetails[creatureName];
    if (!result) {
        res.status(404);
        return { error: `Could not find creature: ${creatureName}` };
    }

    res.status(200);
    return { result };
}

exports.getItemDetails = function (req, res) {
    let params = req.query;
    let itemName = params.name;

    let result = itemDetails[itemName];
    if (!result) {
        res.status(404);
        return { error: `Could not find item: ${itemName}` };
    }

    res.status(200);
    return { result };
}