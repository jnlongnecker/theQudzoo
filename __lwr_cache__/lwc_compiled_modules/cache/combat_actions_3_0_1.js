import { registerDecorators as _registerDecorators } from "lwc";
import { capitalize } from 'c/utilities';
class AttributeChangeAction {
  constructor(attribute, cost, shift, leveledPoint, mode) {
    this.attribute = void 0;
    this.cost = void 0;
    this.shift = void 0;
    this.leveledPoint = void 0;
    this.mode = void 0;
    this.reversible = true;
    this.attribute = attribute;
    this.cost = cost;
    this.shift = shift;
    this.leveledPoint = leveledPoint;
    this.mode = mode;
  }

  /* TODO - finish validation logic */
  /* TODO - Update attribute controls to pass in mode */
  validateApply(character) {
    if (this.leveledPoint) {
      if (character.attributeExpenditure.leveledPointsUsed + this.cost > character.attributeExpenditure.leveledPoints) return `Error: Not enough points for this change.`;
    } else {
      if (character.attributeExpenditure.freePointsUsed + this.cost > character.attributeExpenditure.freePoints) return `Error: Not enough points for this change.`;
      if (character.attributes[this.attribute] >= 24) return `Error: Attribute at max value for initial attribute expenditure.`;
    }
    if (this.points < cost) return;
    if (this.level == 1 && attribute.total == 24 && !this.isFreeMode) return;
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
    return true;
  }
  validateReverse(character) {
    return !(this.leveledPoint && character.level <= 1);
  }
  reverse(character) {
    this.validate(character);
    character.attributes[this.attribute] -= this.shift;
    if (this.leveledPoint) {
      character.attributeExpenditure.leveledPointsUsed -= this.cost;
    } else {
      character.attributeExpenditure.freePointsUsed -= this.cost;
    }
  }
  print() {
    let plurality = this.cost == 1 ? 'point' : 'points';
    return `${capitalize(this.attribute)} adjusted by ${this.shift}, using ${this.cost} ${plurality}.`;
  }
}
_registerDecorators(AttributeChangeAction, {
  fields: ["attribute", "cost", "shift", "leveledPoint", "mode", "reversible"]
});
export { AttributeChangeAction };