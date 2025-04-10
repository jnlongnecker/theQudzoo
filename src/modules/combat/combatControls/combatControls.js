import { api, LightningElement } from "lwc";
import { Combat } from "combat/calculator";

export default class CombatControls extends LightningElement {

    practicalCharacter;
    practicalEnemy;
    skillManager;

    @api get character() {
        return this.practicalCharacter;
    }
    set character(val) {
        if (!val) return;
        this.practicalCharacter = val.creature;
    }

    @api get enemy() {
        return this.practicalEnemy;
    }
    set enemy(val) {
        if (!val) return;
        this.practicalEnemy = val.creature;
    }

    runTest() {
        this.practicalCharacter.addSkill('Cudgel_Bludgeon');
        let combat = new Combat(this.practicalCharacter, this.practicalEnemy);
        combat.bumpAttack();
        console.log(combat);
    }
}