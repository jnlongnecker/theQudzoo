import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./attributeControls.html";
class AttributeControls extends LightningElement {
  constructor(...args) {
    super(...args);
    this.modifiers = void 0;
    this.points = 44;
    this.maxPoints = 44;
    this.min = 10;
    this.attributes = [{
      name: "Strength",
      class: "strength holder",
      classModifier: "total",
      abbreviation: "STR",
      total: 10,
      displayTotal: 10,
      modifier: -3,
      cost: 1
    }, {
      name: "Agility",
      class: "agility holder",
      classModifier: "total",
      abbreviation: "AGI",
      total: 10,
      displayTotal: 10,
      modifier: -3,
      cost: 1
    }, {
      name: "Toughness",
      class: "toughness holder",
      classModifier: "total",
      abbreviation: "TOU",
      total: 10,
      displayTotal: 10,
      modifier: -3,
      cost: 1
    }, {
      name: "Intelligence",
      class: "intelligence holder",
      classModifier: "total",
      abbreviation: "INT",
      total: 10,
      displayTotal: 10,
      modifier: -3,
      cost: 1
    }, {
      name: "Willpower",
      class: "willpower holder",
      classModifier: "total",
      abbreviation: "WIL",
      total: 10,
      displayTotal: 10,
      modifier: -3,
      cost: 1
    }, {
      name: "Ego",
      class: "ego holder",
      classModifier: "total",
      abbreviation: "EGO",
      total: 10,
      displayTotal: 10,
      modifier: -3,
      cost: 1
    }];
  }
  get creature() {}
  set creature(value) {
    if (value == undefined) return;
    this.attributes = this.attributes.map(item => {
      switch (item.name) {
        case 'Strength':
          item.total = value.attributes.strength;
          break;
        case 'Agility':
          item.total = value.attributes.agility;
          break;
        case 'Toughness':
          item.total = value.attributes.toughness;
          break;
        case 'Intelligence':
          item.total = value.attributes.intelligence;
          break;
        case 'Willpower':
          item.total = value.attributes.willpower;
          break;
        case 'Ego':
          item.total = value.attributes.ego;
          break;
      }
      ;
      return item;
    });
    this.calculatePoints(value.isKin);
    this.recalculateDisplayTotals();
  }
  calculatePoints(isKin) {
    if (isKin) {
      this.points = 38;
      this.maxPoints = 38;
      this.min = 12;
      for (let attr of this.attributes) {
        let add = attr.total > 10 ? attr.total - 10 : 0;
        attr.total = 12 + add;
      }
    } else {
      this.maxPoints = 44;
      this.min = 10;
    }
    let pointsSpent = 0;
    for (let attr of this.attributes) {
      for (let i = this.min; i < attr.total; i++) {
        pointsSpent += i >= 18 ? 2 : 1;
      }
    }
    this.points = this.maxPoints - pointsSpent;
  }
  handleClick(event) {
    let target = event.target;
    if (target.innerText !== "+" && target.innerText !== "-") return;
    let index = event.currentTarget.getAttribute("index");
    if (target.innerText === "+") {
      return this.incrementAttribute(index);
    }
    return this.decrementAttribute(index);
  }
  incrementAttribute(attrIndex) {
    let attribute = this.attributes[attrIndex];
    if (this.points < attribute.cost) return;
    if (attribute.total == 24) return;
    attribute.total = attribute.total + 1;
    this.points -= attribute.cost;
    this.recalculateDisplayTotals();
    this.fireChanges();
  }
  decrementAttribute(attrIndex) {
    let attribute = this.attributes[attrIndex];
    if (this.points == this.maxPoints) return;
    if (attribute.total == this.min) return;
    attribute.total = attribute.total - 1;
    this.recalculateDisplayTotals();
    this.points += attribute.cost;
    this.fireChanges();
  }
  recalculateDisplayTotals() {
    if (!this.modifiers) {
      this.modifiers = {
        Strength: 0,
        Agility: 0,
        Toughness: 0,
        Willpower: 0,
        Intelligence: 0,
        Ego: 0
      };
    }
    for (let attribute of this.attributes) {
      let modifier = this.modifiers[attribute.name];
      if (modifier > 0) {
        attribute.classModifier = "enhanced";
      } else if (modifier < 0) {
        attribute.classModifier = "reduced";
      } else {
        attribute.classModifier = "total";
      }
      attribute.displayTotal = attribute.total + modifier;
      attribute.cost = attribute.total >= 18 ? 2 : 1;
      attribute.modifier = Math.floor((attribute.displayTotal - 16) / 2);
    }
  }
  resetChanges(fireChanges) {
    for (let attribute of this.attributes) {
      attribute.total = this.min;
    }
    this.recalculateDisplayTotals();
    this.points = this.maxPoints;
    if (fireChanges) this.fireChanges();
  }
  randomizeChanges() {
    this.resetChanges(false);
    while (this.points > 0) {
      let attributeSelection = Math.floor(Math.random() * 6);
      let attribute = this.attributes[attributeSelection];
      if (attribute.total > 23) continue;
      if (this.points < attribute.cost) continue;
      attribute.total++;
      this.points -= attribute.cost;
      this.recalculateDisplayTotals();
    }
    this.fireChanges();
  }
  fireChanges() {
    let payload = {
      apSpent: this.maxPoints - this.points,
      attributes: {
        Agility: this.attributes[1].total,
        Ego: this.attributes[5].total,
        Intelligence: this.attributes[3].total,
        Strength: this.attributes[0].total,
        Toughness: this.attributes[2].total,
        Willpower: this.attributes[4].total
      }
    };
    let evt = new CustomEvent("attributeschosen", {
      detail: payload
    });
    this.dispatchEvent(evt);
  }
}
_registerDecorators(AttributeControls, {
  publicProps: {
    creature: {
      config: 3
    }
  },
  track: {
    modifiers: 1,
    attributes: 1
  },
  fields: ["points", "maxPoints", "min"]
});
export default _registerComponent(AttributeControls, {
  tmpl: _tmpl
});