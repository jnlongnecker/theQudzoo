import { AttackEvent } from "./events.js";
import { BludgeonDaze } from "./weaponEffects.js";

const classConstructors = {
    'Cudgel_Bludgeon': Cudgel_Bludgeon.new,
}

class SkillManager {

    skills = {};
    hostCreature;

    constructor(hostCreature) {
        this.hostCreature = hostCreature;
        for (let skill in hostCreature.skills) {
            if (hostCreature.skills[skill])
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
        this.skills[skillName].onAttach(this.hostCreature);
    }
}

class Part {
    host

    onAttach(host) {
        if (!host) console.error('No host supplied.');
        this.host = host;
    }
}

class Cudgel_Bludgeon extends Part {

    onAttach(host) {
        super(host);
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