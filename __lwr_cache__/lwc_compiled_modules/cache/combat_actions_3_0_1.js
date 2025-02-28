import { registerDecorators as _registerDecorators4, registerDecorators as _registerDecorators3, registerDecorators as _registerDecorators2, registerDecorators as _registerDecorators } from "lwc";
import { capitalize } from 'c/utilities';
class AttributeChangeAction {
  constructor(attribute, cost, shift, leveledPoint, mode) {
    this.attribute = void 0;
    this.cost = void 0;
    this.shift = void 0;
    this.leveledPoint = void 0;
    this.mode = void 0;
    this.reversible = true;
    this.undoOnLevelReset = false;
    this.id = void 0;
    this.attribute = attribute;
    this.mode = mode;
    this.cost = mode === 'level' ? cost : 0;
    this.shift = shift;
    this.leveledPoint = leveledPoint;
    this.undoOnLevelReset = this.leveledPoint && this.mode !== 'free';
  }
  validateApply(character) {
    if (this.mode !== 'level') {
      if (character.attributes[this.attribute] + this.shift < 0) throw `Cannot reduce attribute below 0.`;
      return;
    }
    if (this.leveledPoint) {
      if (character.attributeExpenditure.leveledPointsUsed + this.cost > character.attributeExpenditure.leveledPoints) throw `Not enough points for this change.`;
      if (character.level <= 1) throw `Can't spend a leveled point at level 1.`;
    } else {
      if (character.attributeExpenditure.freePointsUsed + this.cost > character.attributeExpenditure.freePoints) throw `Not enough points for this change.`;
      if (character.attributes[this.attribute] >= 24 && this.cost > 0) throw `Attribute at max value for initial attribute expenditure.`;
      if (character.attributes[this.attribute] <= character.attributeExpenditure.minTotal && this.cost < 0) throw `Attribute at minimum value for initial attribute expenditure.`;
    }
  }
  apply(character) {
    this.validateApply(character);
    character.attributes[this.attribute] += this.shift;
    if (!character.attributeExpenditure) {
      character.attributeExpenditure = {};
    }
    if (this.leveledPoint) {
      character.attributeExpenditure.leveledPointsUsed += this.cost;
    } else {
      character.attributeExpenditure.freePointsUsed += this.cost;
    }
  }
  validateReverse(character) {
    if (this.mode !== 'level') {
      if (character.attributes[this.attribute] - this.shift < 0) throw `Cannot reduce attribute below 0.`;
      return;
    }
    if (this.leveledPoint && character.level <= 1) {
      throw `Can't undo a leveled point at level 1.`;
    } else {
      if (character.attributeExpenditure.freePointsUsed - this.cost > character.attributeExpenditure.freePoints) throw `Not enough points for this change.`;
      if (character.attributes[this.attribute] >= 24 && this.cost < 0) throw `Attribute at max value for initial attribute expenditure.`;
      if (character.attributes[this.attribute] <= character.attributeExpenditure.minTotal && this.cost > 0) throw `Attribute at minimum value for initial attribute expenditure.`;
    }
  }
  reverse(character) {
    this.validateReverse(character);
    character.attributes[this.attribute] -= this.shift;
    if (this.leveledPoint) {
      character.attributeExpenditure.leveledPointsUsed -= this.cost;
    } else {
      character.attributeExpenditure.freePointsUsed -= this.cost;
    }
  }
  print() {
    let plurality = Math.abs(this.cost) == 1 ? 'point' : 'points';
    if (this.shift >= 0) {
      return `+${this.shift} ${capitalize(this.attribute)} (${this.cost} ${plurality})`;
    }
    return `${this.shift} ${capitalize(this.attribute)} (${Math.abs(this.cost)} ${plurality} refunded)`;
  }
}
_registerDecorators(AttributeChangeAction, {
  fields: ["attribute", "cost", "shift", "leveledPoint", "mode", "reversible", "undoOnLevelReset", "id"]
});
const numToAttribute = ['strength', 'dexterity', 'toughness', 'intelligence', 'willpower', 'ego'];
class RandomizeAttributesAction {
  constructor() {
    this.reversible = false;
  }
  validateApply(character) {
    if (character.level > 1) throw `Error: Cannot randomize past level 1.`;
  }
  apply(character) {
    this.validateApply(character);
    for (let attribute in character.attributes) {
      character.attributes[attribute] = character.attributeExpenditure.minTotal;
    }
    character.attributeExpenditure.freePointsUsed = 0;
    while (character.attributeExpenditure.freePointsUsed < character.attributeExpenditure.freePoints) {
      let attributeSelection = Math.floor(Math.random() * 6);
      let attribute = numToAttribute[attributeSelection];
      let cost = character.attributes[attribute] >= 18 ? 2 : 1;
      if (character.attributes[attribute] > 23) continue;
      if (character.attributeExpenditure.freePointsUsed + cost > character.attributeExpenditure.freePoints) continue;
      character.attributes[attribute]++;
      character.attributeExpenditure.freePointsUsed += cost;
    }
  }
  print() {
    return `Randomized starting attributes.`;
  }
}
_registerDecorators2(RandomizeAttributesAction, {
  fields: ["reversible"]
});
class ResetAttributesAction {
  constructor() {
    this.reversible = false;
  }
  validateApply(character) {
    if (character.level > 1) throw `Error: Cannot reset past level 1.`;
  }
  apply(character) {
    this.validateApply(character);
    for (let attribute in character.attributes) {
      character.attributes[attribute] = character.attributeExpenditure.minTotal;
    }
    character.attributeExpenditure.freePointsUsed = 0;
  }
  print() {
    return `Reset starting attributes.`;
  }
}
_registerDecorators3(ResetAttributesAction, {
  fields: ["reversible"]
});
class LevelUpAction {
  constructor() {
    this.reversible = true;
    this.undoOnLevelReset = true;
  }
  apply(character) {
    character.level += 1;
    let allUp = character.level % 6 == 0;
    let point = (character.level + 3) % 6 == 0;
    if (allUp) {
      for (let attribute in character.attributes) {
        character.attributes[attribute] += 1;
      }
    }
    if (point) {
      character.attributeExpenditure.leveledPoints += 1;
    }
  }
  reverse(character) {
    character.level -= 1;
    let allDown = character.level & 6 == 0;
    let pointDown = (character.level + 3) % 6 == 0;
    if (allDown) {
      for (let attribute in character.attributes) {
        character.attribute[attribute] -= 1;
      }
    }
    if (pointDown) {
      character.attributeExpenditure.leveledPoints -= 1;
    }
  }
  print() {
    return `Leveled Up!`;
  }
}
_registerDecorators4(LevelUpAction, {
  fields: ["reversible", "undoOnLevelReset"]
});
export { AttributeChangeAction, RandomizeAttributesAction, ResetAttributesAction, LevelUpAction };