import { api, LightningElement } from "lwc";
import { test, Combat, SkillManager } from "combat/calculator";

export default class CombatControls extends LightningElement {

    practicalCharacter;
    practicalEnemy;
    skillManager;

    @api get character() {
        return this.practicalCharacter;
    }
    set character(val) {
        if (!val) return;
        this.practicalCharacter = JSON.parse(JSON.stringify(val));
    }

    @api get enemy() {
        return this.practicalEnemy;
    }
    set enemy(val) {
        if (!val) return;
        this.practicalEnemy = JSON.parse(JSON.stringify(val));
    }

    runTest() {
        this.practicalCharacter.skills['Bludgeon'] = true;
        let combat = new Combat(this.practicalCharacter, this.practicalEnemy);
        combat.bumpAttack();
        console.log(combat);
    }
}