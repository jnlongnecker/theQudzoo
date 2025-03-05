import { AttackEvent } from "./events.js";
import { BludgeonDaze } from "./weaponEffects.js";

const classConstructors = {
    'Cudgel_Bludgeon': Cudgel_Bludgeon.new,
}

class SkillManager {

    skills = {};

    constructor(skillList) {
        for (let skill in skillList) {
            if (skillList[skill])
                this.addSkill(skill);
        }
    }

    addSkill(skillName) {
        let skillConstructor = classConstructors[skillName];
        if (!skillConstructor) {
            console.error(`Unknown skill: ${skillName}`);
            return;
        }

        this.skills[skillName] = new skillConstructor();
        this.skills[skillName].onAttach();
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