import { Part } from "../parts";
import { BludgeonDaze } from "../weaponEffects";
import { AttackEvent } from "../events";

export class Cudgel_Bludgeon extends Part {

    onAttach(host) {
        super.onAttach(host);
        AttackEvent.register(host, (event) => this.handleAttackEvent(event));
    }

    handleAttackEvent(evt) {
        let attack = evt.attack;
        let weapon = attack.weapon;
        if (weapon.type !== 'cudgel') return;

        attack.effects.push(new BludgeonDaze());
    }
}