import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./combatControls.html";
import { test, Combat, SkillManager } from "combat/calculator";
class CombatControls extends LightningElement {
  constructor(...args) {
    super(...args);
    this.practicalCharacter = void 0;
    this.practicalEnemy = void 0;
    this.skillManager = void 0;
  }
  get character() {
    return this.practicalCharacter;
  }
  set character(val) {
    if (!val) return;
    this.practicalCharacter = JSON.parse(JSON.stringify(val));
  }
  get enemy() {
    return this.practicalEnemy;
  }
  set enemy(val) {
    if (!val) return;
    this.practicalEnemy = JSON.parse(JSON.stringify(val));
  }
  runTest() {
    this.skillManager = new SkillManager();
    this.skillManager.addSkill('bludgeon');
    let combat = new Combat(this.practicalCharacter, this.practicalEnemy);
    combat.bumpAttack();
    console.log(combat);
  }
}
_registerDecorators(CombatControls, {
  publicProps: {
    character: {
      config: 3
    },
    enemy: {
      config: 3
    }
  },
  fields: ["practicalCharacter", "practicalEnemy", "skillManager"]
});
export default _registerComponent(CombatControls, {
  tmpl: _tmpl
});