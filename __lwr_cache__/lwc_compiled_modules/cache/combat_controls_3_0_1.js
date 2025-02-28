import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./controls.html";
class Controls extends LightningElement {
  constructor(...args) {
    super(...args);
    this.showEquipment = void 0;
    this.showSkills = void 0;
    this.showCombat = void 0;
    this.showAttributes = true;
    this.mode = void 0;
    this.creature = void 0;
    this.enemy = void 0;
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
}
_registerDecorators(Controls, {
  publicProps: {
    mode: {
      config: 0
    },
    creature: {
      config: 0
    },
    enemy: {
      config: 0
    }
  },
  fields: ["showEquipment", "showSkills", "showCombat", "showAttributes"]
});
export default _registerComponent(Controls, {
  tmpl: _tmpl
});