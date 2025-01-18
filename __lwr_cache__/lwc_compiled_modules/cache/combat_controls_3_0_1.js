import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./controls.html";
class Controls extends LightningElement {
  constructor(...args) {
    super(...args);
    this.showEquipment = void 0;
    this.showSkills = void 0;
    this.showCombat = void 0;
    this.showAttributes = true;
    this.creature = void 0;
  }
  changeTab(event) {
    let target = event.target;
    for (let child of event.currentTarget.children) {
      child.classList.remove('selected');
    }
    target.classList.add('selected');
    this.showEquipment = target.innerHTML == 'Equipment';
    this.showSkills = target.innerHTML == 'Skills';
    this.showAttributes = target.innerHTML == 'Attributes';
    this.showCombat = target.innerHTML == 'Combat';
  }
  updateAttributes(event) {
    let attr = event.detail.attributes;
    let newCreature = JSON.parse(JSON.stringify(this.creature));
    newCreature.attributes.strength = attr.Strength;
    newCreature.attributes.agility = attr.Agility;
    newCreature.attributes.toughness = attr.Toughness;
    newCreature.attributes.intelligence = attr.Intelligence;
    newCreature.attributes.willpower = attr.Willpower;
    newCreature.attributes.ego = attr.Ego;
    this.creature = newCreature;
    this.dispatchEvent(new CustomEvent('charchange', {
      detail: this.creature
    }));
  }
}
_registerDecorators(Controls, {
  publicProps: {
    creature: {
      config: 0
    }
  },
  fields: ["showEquipment", "showSkills", "showCombat", "showAttributes"]
});
export default _registerComponent(Controls, {
  tmpl: _tmpl
});