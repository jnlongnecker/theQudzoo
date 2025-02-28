import { AttackEvent } from "./events.js";
import { BludgeonDaze } from "./weaponEffects.js";

class SkillManager {

    skills = {};

    addSkill(skillName) {
        switch (skillName) {
            case 'bludgeon':
                this.skills[skillName] = new Cudgel_Bludgeon();
                this.skills[skillName].onAttach();
                break;
            default:
                console.log(`Unknown skill: ${skillName}`);
        }
    }
}

class Part {
    onAttach() { console.error('On attach not overwritten'); }
}

class Cudgel_Bludgeon extends Part {

    onAttach() {
        AttackEvent.register((event) => this.handleAttackEvent(event));
    }

    handleAttackEvent(evt) {
        let attack = evt.attack;
        let weapon = attack.weapon;
        if (weapon.type !== 'cudgel') return;

        attack.effects.push(new BludgeonDaze());
    }
}

export { SkillManager };