import { BludgeonDaze } from "../weaponEffects";
import { AttackEvent } from "../events";
import { SkillPart } from "./base";

export class Cudgel_Bludgeon extends SkillPart {

    onAttach(host) {
        super.onAttach(host);
        AttackEvent.register(host, (event) => this.handleAttackEvent(event), this.id);
    }

    handleAttackEvent(evt) {
        let attack = evt.attack;
        let weapon = attack.weapon;
        if (weapon.type !== 'cudgel') return;

        attack.effects.push(new BludgeonDaze());
    }
}