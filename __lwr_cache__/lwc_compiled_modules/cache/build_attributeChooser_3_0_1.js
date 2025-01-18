import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./attributeChooser.html";
class AttributeChooser extends LightningElement {
  constructor(...args) {
    super(...args);
    this.modifiers = void 0;
    this.points = 44;
    this.maxPoints = 44;
    this.min = 10;
    this.blurb = void 0;
    this.attributes = [{
      name: "Strength",
      class: "strength holder",
      classModifier: "total",
      abbreviation: "STR",
      total: 10,
      displayTotal: 10,
      modifier: -3,
      cost: 1,
      blurb: `Your <span class="strength">Strength</span> score determines how effectively you penetrate your opponents' armor with melee attacks, how much daamage your melee attacks do, your ability to resist forced movement, and your carry capacity.`
    }, {
      name: "Agility",
      class: "agility holder",
      classModifier: "total",
      abbreviation: "AGI",
      total: 10,
      displayTotal: 10,
      modifier: -3,
      cost: 1,
      blurb: 'Your <span class="agility">Agility</span> score determines your accuracy with both melee and ranged weapons and your ability to dodge attacks.'
    }, {
      name: "Toughness",
      class: "toughness holder",
      classModifier: "total",
      abbreviation: "TOU",
      total: 10,
      displayTotal: 10,
      modifier: -3,
      cost: 1,
      blurb: 'Your <span class="toughness">Toughness</span> score determines your number of hit points, your natural healing rate, and your ability to resist poison and disease.'
    }, {
      name: "Intelligence",
      class: "intelligence holder",
      classModifier: "total",
      abbreviation: "INT",
      total: 10,
      displayTotal: 10,
      modifier: -3,
      cost: 1,
      blurb: 'Your <span class="intelligence">Intelligence</span> score determines your number of skill points and your ability to examine artifacts.'
    }, {
      name: "Willpower",
      class: "willpower holder",
      classModifier: "total",
      abbreviation: "WIL",
      total: 10,
      displayTotal: 10,
      modifier: -3,
      cost: 1,
      blurb: 'Your <span class="willpower">Willpower</span> score modifies the cooldowns of your activated abilities, determines your ability to resist mental attacks, and modifies your natural healing rate.'
    }, {
      name: "Ego",
      class: "ego holder",
      classModifier: "total",
      abbreviation: "EGO",
      total: 10,
      displayTotal: 10,
      modifier: -3,
      cost: 1,
      blurb: 'Your <span class="ego">Ego</span> score determines the potency of your mental mutations, your ability to haggle with merchants, and your ability to dominate the wills of other living creatures.'
    }];
  }
  get truekin() {
    return false;
  }
  set truekin(val) {
    this.points = 38;
    this.maxPoints = 38;
    this.min = 12;
    for (let attr of this.attributes) {
      let add = attr.total > 10 ? attr.total - 10 : 0;
      attr.total = 12 + add;
    }
    this.recalculateDisplayTotals();
    this.fireChanges();
  }
  get attr() {
    return [];
  }
  set attr(attr) {
    if (!attr) return;
    for (let attribute of this.attributes) {
      let key = attribute.name;
      attribute.total += attr[key];
    }
    this.recalculateDisplayTotals();
    this.fireChanges();
  }
  get pts() {
    return 0;
  }
  set pts(p) {
    if (!p) return;
    this.points = this.maxPoints - p;
    this.recalculateDisplayTotals();
    this.fireChanges();
  }
  get modifier() {
    return this.modifiers;
  }
  set modifier(newModifier) {
    this.modifiers = newModifier;
    this.recalculateDisplayTotals();
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
  changeBlurb(event) {
    if (!this.blurb) {
      this.blurb = this.template.querySelector(".blurb-injection");
    }
    let attrIndex = event.currentTarget.getAttribute("index");
    let attribute = this.attributes[attrIndex];
    this.blurb.innerHTML = attribute.blurb;
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
        Agility: this.attributes[1].total - this.min,
        Ego: this.attributes[5].total - this.min,
        Intelligence: this.attributes[3].total - this.min,
        Strength: this.attributes[0].total - this.min,
        Toughness: this.attributes[2].total - this.min,
        Willpower: this.attributes[4].total - this.min
      }
    };
    let evt = new CustomEvent("attributeschosen", {
      detail: payload
    });
    this.dispatchEvent(evt);
  }
}
_registerDecorators(AttributeChooser, {
  publicProps: {
    truekin: {
      config: 3
    },
    attr: {
      config: 3
    },
    pts: {
      config: 3
    },
    modifier: {
      config: 3
    }
  },
  track: {
    modifiers: 1,
    attributes: 1
  },
  fields: ["points", "maxPoints", "min", "blurb"]
});
export default _registerComponent(AttributeChooser, {
  tmpl: _tmpl
});