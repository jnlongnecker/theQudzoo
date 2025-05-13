import { capitalize } from 'c/utilities';
import { Item } from "combat/calculator";

class AttributeChangeAction {

    attribute;
    cost;
    shift;
    leveledPoint;
    mode;
    reversible = true;
    undoOnLevelReset = false;
    id;

    constructor(attribute, cost, shift, leveledPoint, mode) {
        this.attribute = attribute;
        this.mode = mode;
        this.cost = mode === 'level' ? cost : 0;
        this.shift = shift;
        this.leveledPoint = leveledPoint;
        this.undoOnLevelReset = this.leveledPoint && this.mode !== 'free';
    }

    validateApply(character) {
        if (this.mode !== 'level') {
            if (character.stats.getRaw(this.attribute) + this.shift < 0)
                throw `Cannot reduce attribute below 0.`;
            return;
        }

        if (this.leveledPoint) {
            if (character.attributeExpenditure.leveledPointsUsed + this.cost > character.attributeExpenditure.leveledPoints)
                throw `Not enough points for this change.`;
            if (character.level <= 1)
                throw `Can't spend a leveled point at level 1.`;

        } else {
            if (character.attributeExpenditure.freePointsUsed + this.cost > character.attributeExpenditure.freePoints)
                throw `Not enough points for this change.`;
            if (character.stats.getRaw(this.attribute) >= 24 && this.cost > 0)
                throw `Attribute at max value for initial attribute expenditure.`;
            if (character.stats.getRaw(this.attribute) <= character.attributeExpenditure.minTotal && this.cost < 0)
                throw `Attribute at minimum value for initial attribute expenditure.`;
        }
    }

    apply(character) {
        this.validateApply(character);
        character.spendPoints(this.cost, this.attribute, this.shift);
    }

    validateReverse(character) {
        if (this.mode !== 'level') {
            if (character.stats.getRaw(this.attribute) - this.shift < 0)
                throw `Cannot reduce attribute below 0.`;
            return;
        }

        if (this.leveledPoint && character.level <= 1) {
            throw `Can't undo a leveled point at level 1.`;
        } else {
            if (character.attributeExpenditure.freePointsUsed - this.cost > character.attributeExpenditure.freePoints)
                throw `Not enough points for this change.`;
            if (character.stats.getRaw(this.attribute) >= 24 && this.cost < 0)
                throw `Attribute at max value for initial attribute expenditure.`;
            if (character.stats.getRaw(this.attribute) <= character.attributeExpenditure.minTotal && this.cost > 0)
                throw `Attribute at minimum value for initial attribute expenditure.`;
        }
    }

    reverse(character) {
        this.validateReverse(character);
        character.refundPoints(this.cost, this.attribute, this.shift);
    }

    print() {
        let plurality = Math.abs(this.cost) == 1 ? 'point' : 'points';
        if (this.shift >= 0) {
            return `+${this.shift} ${capitalize(this.attribute)} (${this.cost} ${plurality})`;
        }
        return `${this.shift} ${capitalize(this.attribute)} (${Math.abs(this.cost)} ${plurality} refunded)`;
    }
}

const numToAttribute = ['Strength', 'Agility', 'Toughness', 'Intelligence', 'Willpower', 'Ego'];
class RandomizeAttributesAction {

    reversible = false;

    validateApply(character) {
        if (character.level > 1)
            throw `Error: Cannot randomize past level 1.`
    }

    apply(character) {
        this.validateApply(character);
        character.stats.setAttribute('Strength', character.attributeExpenditure.minTotal);
        character.stats.setAttribute('Agility', character.attributeExpenditure.minTotal);
        character.stats.setAttribute('Toughness', character.attributeExpenditure.minTotal);
        character.stats.setAttribute('Intelligence', character.attributeExpenditure.minTotal);
        character.stats.setAttribute('Willpower', character.attributeExpenditure.minTotal);
        character.stats.setAttribute('Ego', character.attributeExpenditure.minTotal);

        character.attributeExpenditure.freePointsUsed = 0;
        while (character.attributeExpenditure.freePointsUsed < character.attributeExpenditure.freePoints) {
            let attributeSelection = Math.floor(Math.random() * 6);
            let attribute = numToAttribute[attributeSelection];
            let currValue = character.stats.getRaw(attribute)
            let cost = currValue >= 18 ? 2 : 1;

            if (currValue > 23) continue;
            if (character.attributeExpenditure.freePointsUsed + cost > character.attributeExpenditure.freePoints) continue;

            character.stats.setAttribute(attribute, currValue + 1);
            character.attributeExpenditure.freePointsUsed += cost;
        }
    }

    print() {
        return `Randomized starting attributes.`;
    }
}

class ResetAttributesAction {
    reversible = false;

    validateApply(character) {
        if (character.level > 1)
            throw `Error: Cannot reset past level 1.`
    }

    apply(character) {
        this.validateApply(character);
        character.stats.setAttribute('Strength', character.attributeExpenditure.minTotal);
        character.stats.setAttribute('Agility', character.attributeExpenditure.minTotal);
        character.stats.setAttribute('Toughness', character.attributeExpenditure.minTotal);
        character.stats.setAttribute('Intelligence', character.attributeExpenditure.minTotal);
        character.stats.setAttribute('Willpower', character.attributeExpenditure.minTotal);
        character.stats.setAttribute('Ego', character.attributeExpenditure.minTotal);

        character.attributeExpenditure.freePointsUsed = 0;
    }

    print() {
        return `Reset starting attributes.`;
    }
}

class LevelUpAction {
    reversible = true;
    undoOnLevelReset = true;

    apply(character) {
        character.levelUp();
    }

    reverse(character) {
        character.levelDown();
    }

    print() {
        return `Leveled Up!`;
    }
}

class EquipItemAction {
    reversible = false;
    undoOnLevelReset = false;

    item;
    limbNum;

    constructor(itemDetails, limbNum) {
        this.item = Item.fromObject(itemDetails);
        this.limbNum = limbNum;
    }

    apply(character) {
        let limbArray = character.anatomy.getLimbArray();
        if (limbArray.length <= this.limbNum) throw "Error: Creature doesn't have corresponding limb.";
        let limb = limbArray[this.limbNum];
        let result = limb.equip(this.item);
        if (!result) throw "Error: Failed to equip.";
    }

    print() {
        return `Equipped ${this.item.displayName}.`;
    }
}

class UnequipAction {
    reversible = false;
    undoOnLevelReset = false;

    item;

    constructor(item) {
        this.item = item;
    }

    apply(character) {
        character.anatomy.unequipAll(this.item, true);
    }

    print() {
        return `Unequipped ${this.item.displayName}.`
    }
}

class SetPrimaryAction {
    reversible = false;
    undoOnLevelReset = false;

    limbNum;

    constructor(limbNum) {
        this.limbNum = limbNum;
    }

    apply(character) {
        let limbArray = character.anatomy.getLimbArray();
        if (limbArray.length <= this.limbNum) throw "Error: Creature doesn't have corresponding limb.";
        character.anatomy.setPrimaryLimb(limbArray[this.limbNum]);
    }

    print() {
        return 'Updated primary limb.'
    }
}

class AddSkillAction {
    reversible = true;
    undoOnLevelReset = true;

    mode;
    skillDetails;

    constructor(mode, skillDetails) {
        this.mode = mode;
        this.skillDetails = skillDetails;
    }

    validateApply(character) {
        if (character.skills[this.skillDetails.name]) throw `Already have the ${this.skillDetails.displayName} skill.`;
        if (this.skillDetails.requires) {
            let prereqs = this.skillDetails.requires.split(',');
            for (let req of prereqs) {
                if (!character.skills.req) throw `Missing prerequisite skill ${req}.`;
            }
        }
        let attributeReqs = this.skillDetails.attribute.split('|');
        let valueReqs = this.skillDetails.minimum.split('|');
        let meetsAttrReqs = false;
        for (let i = 0; i < attributeReqs.length; i++) {
            let attr = attributeReqs[i].split(',');
            let values = valueReqs[i].split(',');
            let meetsAllReqs = true;
            for (let j = 0; j < attr.length; j++) {
                let att = attr[j];
                let val = Number.parseInt(values[j]);
                if (character.stats[att].value < val) meetsAllReqs = false;
            }
            meetsAttrReqs |= meetsAllReqs;
        }
        if (!meetsAttrReqs) throw `Attribute requisites are not met.`;

        if (this.mode !== 'level') return;
        let cost = Number.parseInt(this.skillDetails.cost);
        let avail = character.skillPoints - character.skillExpenditure.spent;
        if (cost > avail) throw `Not enough skill points, ${cost - avail} SP short.`;
    }

    apply(character) {
        this.validateApply(character);
        character.addSkill({ Name: this.skillDetails.name });
        if (this.mode === 'level') {
            character.skillExpenditure.spent += Number.parseInt(this.skillDetails.cost);
        }
    }

    reverse(character) {
        character.removeSkill({ Name: this.skillDetails.name });
        if (this.mode === 'level') {
            character.skillExpenditure.spent -= Number.parseInt(this.skillDetails.cost);
        }
    }

    print() {
        return `Added the ${this.skillDetails.displayName} skill.`;
    }
}

class SubtypeChangeAction {
    reversible = false;
    undoOnLevelReset = false;

    subtype;

    constructor(subtype) {
        this.subtype = subtype;
    }

    apply(character) {
        character.changeSubtype(this.subtype);
    }

    print() {
        return `Changed subtype to ${this.subtype.name}.`
    }
}

export { AttributeChangeAction, RandomizeAttributesAction, ResetAttributesAction, LevelUpAction, EquipItemAction, UnequipAction, SetPrimaryAction, AddSkillAction, SubtypeChangeAction };