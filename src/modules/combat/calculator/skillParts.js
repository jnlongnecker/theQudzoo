import { AttackEvent, SkillAddedEvent } from "./events.js";
import { BludgeonDaze } from "./weaponEffects.js";
import { Part } from "./parts.js";

class Cudgel_Bludgeon extends Part {

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

const skillPartConstructors = {
    'Cudgel_Bludgeon': Cudgel_Bludgeon.new,
}

class SkillerPart {

    onAttach(host) {
        super.onAttach(host);
        SkillAddedEvent.register(host, this.handleSkillAdd);
    }

    handleSkillAdd(skillEvent) {
        let skillConstructor = skillPartConstructors[skillEvent.skillName];
        if (!skillConstructor) return;

        this.host.attachPart(new skillConstructor());
    }
}

export { SkillerPart };