import { capitalize } from 'c/utilities';

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

export { AttributeChangeAction, RandomizeAttributesAction, ResetAttributesAction, LevelUpAction };