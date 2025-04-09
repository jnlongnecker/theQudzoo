const meleePreviews = require('../api/data/previews/meleePreviews.json');
const armorPreviews = require('../api/data/previews/armorPreviews.json');
const creaturePreviews = require('../api/data/previews/creaturePreviews.json');

exports.getMeleePreviews = function (req, res) {
    let params = req.query;
    let neededSlot = params.slot;
    let neededTerm = params.term;
    let termParts = neededTerm.split(' ');

    let filteredMelee = meleePreviews.filter(item => {
        let slot = item.weaponPart.Slot ? item.weaponPart.Slot : 'Hand';
        return slot === neededSlot;
    });
    let result = searchAndSort(filteredMelee, termParts, searchResultMelee);

    res.status(200);
    return { result };
}

exports.getCreaturePreviews = function (req, res) {
    let params = req.query;
    let neededTerm = params.term;
    let termParts = neededTerm.split(' ');
    let result = searchAndSort(creaturePreviews, termParts, searchResultCreature);

    res.status(200);
    return { result };
}

exports.getArmorPreviews = function (req, res) {
    let params = req.query;
    let neededSlot = params.slot;
    let neededTerm = params.term;
    let termParts = neededTerm.split(' ');
    let filteredArmor = armorPreviews.filter(item => item.armorPart.Slot === neededSlot);
    let result = searchAndSort(filteredArmor, termParts, searchResultArmor);

    res.status(200);
    return { result };
}

function searchAndSort(array, terms, searchFunction) {
    let finalArr = [];
    for (let item of array) {
        let result = searchFunction(item, terms);
        if (result.quality > 0) finalArr.push({ item, quality: result.quality });
    }
    finalArr.sort((a, b) => a.quality - b.quality);
    return finalArr;
}

function searchResultMelee(meleeItem, terms) {
    let quality = 0;
    for (let term of terms) {
        let displayHit = meleeItem.cleanedName.indexOf(term);
        let nameHit = meleeItem.name.indexOf(term);
        let skillHit = meleeItem.weaponPart.Skill.indexOf(term);
        if (displayHit >= 0)
            quality += meleeItem.cleanedName.length - displayHit - (meleeItem.cleanedName.length - term.length);
        if (nameHit >= 0)
            quality += meleeItem.name.length - nameHit - (meleeItem.name.length - term.length);
        if (skillHit >= 0)
            quality += meleeItem.weaponPart.Skill.length - skillHit - (meleeItem.weaponPart.Skill.length - term.length);
    }
    return { quality };
}

function searchResultCreature(creature, terms) {
    let quality = 0;
    for (let term of terms) {
        let displayHit = creature.cleanedName.indexOf(term);
        let nameHit = creature.name.indexOf(term);
        let factionHit = creature.factions.indexOf(term);
        if (displayHit >= 0)
            quality += creature.cleanedName.length - displayHit - (creature.cleanedName.length - term.length);
        if (nameHit >= 0)
            quality += creature.name.length - nameHit - (creature.name.length - term.length);
        if (factionHit >= 0)
            quality += creature.factions.length - factionHit - (creature.factions.length - term.length);
    }
    return { quality };
}

function searchResultArmor(item, terms) {
    let quality = 0;
    for (let term of terms) {
        let displayHit = item.cleanedName.indexOf(term);
        let nameHit = item.name.indexOf(term);
        if (displayHit >= 0)
            quality += item.cleanedName.length - displayHit - (item.cleanedName.length - term.length);
        if (nameHit >= 0)
            quality += item.name.length - nameHit - (item.name.length - term.length);
    }
    return { quality };
}