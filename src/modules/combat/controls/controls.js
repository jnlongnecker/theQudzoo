import { api, LightningElement } from "lwc";
import { Combat } from "combat/calculator";

export default class Controls extends LightningElement {

    practicalCharacter;
    practicalEnemy;
    skillManager;

    @api get character() {
        return this.practicalCharacter;
    }
    set character(val) {
        if (!val) return;
        this.practicalCharacter = val;
    }

    @api get enemy() {
        return this.practicalEnemy;
    }
    set enemy(val) {
        if (!val) return;
        this.practicalEnemy = val;
    }

    runTest() {
        this.practicalCharacter.addSkill('Cudgel_Bludgeon');
        let combat = new Combat(this.practicalCharacter, this.practicalEnemy);
        combat.bumpAttack();
        console.log(combat);
    }
}