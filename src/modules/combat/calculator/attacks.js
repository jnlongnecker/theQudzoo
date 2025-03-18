import { ActivatedActionEvent, AttackCountEvent, AttackEvent } from "./events.js";
import { Part } from "./parts.js";

export class AttackerPart extends Part {

    onAttach(host) {
        super.onAttach(host);

        ActivatedActionEvent.register(this.host, (event) => this.handleActivatedAction(event));
    }

    handleActivatedAction(event) {
        if (event.actionId !== 'Bump_Attack') return;

        let attacks = this.host.fire(new AttackCountEvent()).attacks;
        for (let attack of attacks) {
            this.host.fire(new AttackEvent(attack));
        }
        event.details.attacks = attacks;
    }
}

export class Attack {
    activationChance = 0;
    bonusPenetrations = 0;
    pvBonus = 0;
    pvMaxBonus = 0;
    hitBonus = 0;
    attempts = 1;

    part;
    weapon;
    attacker;
    swfEnabled;
    name;

    effects = [];

    constructor(attacker, bodyPart, name) {
        this.name = name;
        this.attacker = attacker;
        this.part = bodyPart;

        let weapon = this.part.item;

        this.weapon = weapon;

        // Add weapon based hit bonus
        this.hitBonus += weapon.hitBonus;
    }

    getCritPvBonus() {
        let weapon = this.weapon;
        let bonus = 0;
        switch (weapon.type) {
            case 'longBlade':
                bonus += 2;
            case 'cudgel':
            case 'shortBlade':
            case 'axe':
                bonus += 1;
                break;
            default:
                return 1;
        }
        return bonus;
    }

    run(defender) {
        let weapon = this.weapon;
        let metrics = [];

        for (let i = 0; i < this.attempts; i++) {
            let data = {
                roll: 0, crit: false, hit: false, penetrations: 0, damage: {
                    physical: 0, heat: 0, cold: 0, electric: 0, acid: 0, umbral: 0, cosmic: 0, poison: 0
                }
            };
            let critChance = new SpecialEffectEvent();
            critChance.chance = .05;
            critChance.fire();

            data.roll = random(1, 20);
            let minCrit = 21 - Math.floor(20 * critChance.chance);
            data.crit = data.roll >= minCrit;
            data.hit = this.hitBonus + getModifier(this.attacker.attributes.agility);
            if (!data.hit && !data.crit) { metrics.push(data); continue; }

            let critPvBonus = data.crit ? this.getCritPvBonus() : 0;
            let pv = this.pvBonus + getModifier(this.attacker.attributes.strength) + weapon.pvBonus;
            let pvMax = this.pvMaxBonus + weapon.pvCap;
            data.penetrations = rollPenetrations(defender.av, pv + critPvBonus, pvMax + critPvBonus);
            if (data.crit) data.penetrations++;
            data.penetrations += this.bonusPenetrations;

            let roller = new Roll(weapon.damage);
            for (let p = 0; p < data.penetrations; p++) {
                data.damage.physical += roller.roll();
            }
            metrics.push(data);
        }

        return metrics
    }
}

class ProjectedAttackMetrics {

    activationChance = 0;
    hitChance = 0;
    penetrations = 0;
    damage = {
        physical: 0, heat: 0, cold: 0, electric: 0, acid: 0, umbral: 0, cosmic: 0, poison: 0
    };
    effects = [];
}