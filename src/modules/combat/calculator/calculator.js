import {
    DiceRoll, Roll,
    getModifier, chanceForOneSuccess, chanceForThreeSuccess, chanceToSucceed, expectedPenetrations, rollPenetrations, random
} from "./rolls.js";
import {
    AttackEvent, AttackCountEvent, SpecialEffectEvent
} from "./events.js";
import { SkillManager } from "./skillParts.js";

const defaultWeapon = {
    "name": "base",
    "pvBonus": 0,
    "pvCap": 0,
    "damage": "1d2",
    "type": "cudgel",
    "mods": [0, 0, 0],
    "tier": 1,
    "isWeapon": true
};

class Combat {

    attacker;
    defender;

    skillManager;
    rounds = [];

    constructor(attacker, target) {
        this.attacker = attacker;
        this.defender = target;
        this.skillManager = new SkillManager(attacker.skills);
    }

    bumpAttack() {
        let weapon = this.attacker.limbs[this.attacker.primary].item;
        let attacks = new AttackBuilder(this.attacker).buildAttackAction();

        let energyCost = weapon.type == 'shortBlade' && this.attacker.skills['Short Blade Expertise'] ? 750 : 1000;
        this.rounds.push(new Round(`Round ${this.rounds.length + 1}: Bump Attack`, attacks, energyCost));
    }

    /* WIP */
    getTurnExpectedDamage(turn, defender) {
        let expectedDamage = 0;
        for (let attack of turn.attacks) {
            expectedDamage += attack.getExpectedDamage(defender);
        }
    }
}

class AttackBuilder {

    attacker;
    limb;

    constructor(attacker) {
        this.attacker = attacker;
        this.limb = attacker.limbs[attacker.primary];
    }

    buildAttackAction(pvBonus = 0, applyToAll = false) {
        let attacks = [];

        let weapon = this.limb.item;
        let primary = new Attack(this.attacker, this.attacker.primary, `Primary Hand Attack (${this.limb.name}) - ${weapon.name}`);
        primary.pvBonus += pvBonus;
        primary.pvMaxBonus += pvBonus;
        let attackCountEvent = new AttackCountEvent();
        attackCountEvent.attacks.push(primary);
        attackCountEvent.isPrimary = true;
        attackCountEvent.fire();

        for (let attack of attackCountEvent.attacks) {
            if (attack.activationChance > 0) attacks.push(attack);
        }

        for (let i = 0; i < this.attacker.limbs.length; i++) {
            if (i == this.attacker.primary) continue;

            let limb = this.attacker.limbs[i];
            let weapon = limb.item;
            if (!weapon.isWeapon && limb.slot == "floating") continue;

            let offhand = new Attack(this.attacker, i, `Offhand Attack (${limb.name}) - ${weapon.name}`);
            offhand.pvBonus += applyToAll ? pvBonus : 0;
            offhand.pvMaxBonus += applyToAll ? pvBonus : 0;
            let offhandEvent = new AttackCountEvent();
            offhandEvent.attacks.push(offhand);
            offhandEvent.fire();

            for (let attack of offhandEvent.attacks) {
                if (attack.activationChance > 0) attacks.push(attack);
            }
        }

        for (let attack of attacks) {
            let attackEvent = new AttackEvent();
            attackEvent.attack = attack;
            attackEvent.fire();
            console.log(attackEvent.attack);
        }

        return attacks;
    }
}

class Round {
    attacks = [];
    energyCost;
    name;

    constructor(name, attacks, energyCost) {
        this.name = name;
        this.attacks = attacks;
        this.energyCost = energyCost;
    }

    expectedRoundDamage(defender) {
        let setResults = [];
        for (let attack of this.attacks) {
            setResults.push(getExpectedDamage(attack, defender));
        }
        console.log(setResults);
    }

}

class Attack {
    activationChance = 0;
    bonusPenetrations = 0;
    pvBonus = 0;
    pvMaxBonus = 0;
    hitBonus = 0;
    attempts = 1;

    limb;
    limbNum;
    weapon;
    attacker;
    name;

    effects = [];

    constructor(attacker, limb, name) {
        this.name = name;
        this.attacker = attacker;
        this.limb = this.attacker.limbs[limb];
        this.limbNum = limb;

        let weapon = this.limb.item;
        if (!weapon.isWeapon)
            weapon = defaultWeapon;

        this.weapon = weapon;

        // Add weapon based hit bonus
        this.hitBonus += weapon.hitBonus;

        this.activationChance = limb == attacker.primary ? 1 : this.limb.offhand;
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

function mergeDamage(base, toAdd) {
    for (let damageType in toAdd) {
        if (!base[damageType]) base[damageType] = 0;
        base[damageType] += toAdd[damageType];
    }
}

const electrifiedTierDamage = ['1', '1', '1 + 1d2', '2 + 1d2', '3 + 1d3', '4 + 1d3', '5 + 1d4', '6 + 1d4', '7 + 1d5'];
const heatAndColdTierDamage = ['1', '1', '2', '1 + 1d3', '2 + 1d3', '3 + 1d3', '4 + 1d3', '5 + 1d3', '5 + 1d5'];

class ElementalDamage {

    electric = new Roll('0');
    heat = new Roll('0');
    cold = new Roll('0');

    addElectric(tier) {
        this.electric = new Roll(electrifiedTierDamage[tier]);
    }

    addHeat(tier) {
        this.heat = new Roll(heatAndColdTierDamage[tier]);
    }

    addCold(tier) {
        this.cold = new Roll(heatAndColdTierDamage[tier]);
    }

    getAverage(defender) {
        let coldRes = defender.resistances.cold;
        let heatRes = defender.resistances.heat;
        let elecRes = defender.resistances.electric;

        let heatDamage = Math.floor(this.heat.getAverage() / (100 - heatRes));
        let coldDamage = Math.floor(this.cold.getAverage() / (100 - coldRes));
        let electricDamage = Math.floor(this.electric.getAverage() / (100 - elecRes));

        return { heatDamage, coldDamage, electricDamage };
    }

    getDamage(defender) {
        let coldRes = defender.resistances.cold;
        let heatRes = defender.resistances.heat;
        let elecRes = defender.resistances.electric;

        let heatDamage = Math.floor(this.heat.roll() / (100 - heatRes));
        let coldDamage = Math.floor(this.cold.roll() / (100 - coldRes));
        let electricDamage = Math.floor(this.electric.roll() / (100 - elecRes));

        return { heatDamage, coldDamage, electricDamage };
    }

}

function getHitChance(attack, defender) {
    let totalHitBonus = attack.hitBonus + getModifier(attack.attacker.attributes.agility);
    let dv = defender.dv;
    let rollNecessary = dv - totalHitBonus - 1;
    return 1 - Math.max(rollNecessary * 0.05, 0);
}

function getExpectedNonCritDamage(attack, defender) {
    let weapon = attack.weapon;
    let pv = attack.pvBonus + getModifier(attack.attacker.attributes.strength) + weapon.pvBonus;
    let pvMax = attack.pvMaxBonus + weapon.pvCap;
    let av = defender.av;

    // Gather necessary data points
    let damageRoll = new Roll(weapon.damage).getAverage();
    let pens = expectedPenetrations(av, pv, pvMax) + attack.bonusPenetrations;
    let elementalDamage = attack.elementalDamage;
    let hitChance = getHitChance(attack, defender);

    // Weight damage by activation and hit chance
    return {
        penetrations: pens * attack.activationChance * hitChance,
        damage: damageRoll * pens * attack.activationChance * hitChance,
        elementalDamage: elementalDamage.getAverage(defender) * attack.activationChance * hitChance
    }
}

function getExpectedCritDamage(attack, defender) {
    let weapon = attack.weapon;
    let pv = attack.pvBonus + getModifier(attack.attacker.attributes.strength) + weapon.pvBonus;
    let pvMax = attack.pvMaxBonus + weapon.pvCap;
    let av = defender.av;
    let pvBonus = attack.getCritPvBonus();

    // Gather up necessary data points
    let damageRoll = new Roll(weapon.damage).getAverage();
    let elementalDamage = attack.elementalDamage;
    let hitChance = getHitChance(attack, defender);
    let pens = expectedPenetrations(av, pv + pvBonus, pvMax + pvBonus) + attack.bonusPenetrations + 1;

    // Weight damage by activation and hit chance
    return {
        penetrations: pens * attack.activationChance * hitChance,
        damage: damageRoll * pens * attack.activationChance * hitChance,
        elementalDamage: elementalDamage.getAverage(defender) * attack.activationChance * hitChance
    }
}

function getExpectedDamage(attack, defender) {
    let critChance = attack.critChance;
    let normalChance = 1 - critChance;
    let normalDamage = getExpectedNonCritDamage(attack, defender);
    let critDamage = getExpectedCritDamage(attack, defender);
    let hitChance = getHitChance(attack, defender);

    // Expected damage is the sum of the weighted crit damage and weighted normal damage
    return {
        penetrations: (normalDamage.penetrations * normalChance) + (critDamage.penetrations * critChance),
        damage: (normalDamage.damage * normalChance) + (critDamage.damage * critChance),
        elementalDamage: (normalDamage.elementalDamage * normalDamage) + (critDamage.elementalDamage * critChance),
        activationChance: hitChance * attack.activationChance
    }
}

function rollAttack(attack, defender) {
    let rollData = {
        crit: false, hit: false, hitTotal: 0, penetrations: 0, damage: 0, elementalDamage: {}
    };

    // If attack did not activate, there should be no data returned
    if (attack.activationChance < Math.random()) return undefined;

    // Roll hit to see if it connects or crits
    let weapon = attack.weapon;
    let hitRoll = random(1, 20);
    let critThreshold = 21 - Math.floor(20 * attack.critChance);
    rollData.hitTotal = hitRoll + getModifier(attack.attacker.attributes.agility) + attack.hitBonus
    rollData.crit = hitRoll >= critThreshold;
    rollData.hit = rollData.hitTotal >= defender.dv;

    // If it did not hit and did not crit, return the partial roll data
    if (!(rollData.hit || rollData.crit)) return rollData;

    // Calculate penetrations
    let critPvBonus = rollData.crit ? attack.getCritPvBonus() : 0;
    let pv = attack.pvBonus + getModifier(attack.attacker.attributes.strength) + weapon.pvBonus + critPvBonus;
    let pvMax = attack.pvMaxBonus + weapon.pvCap + critPvBonus;
    let av = defender.av;
    let pens = rollPenetrations(av, pv, pvMax) + attack.bonusPenetrations;
    if (rollData.crit) pens++;

    // Calculate damage
    let elementalDamage = attack.elementalDamage;
    let damageRoll = new Roll(weapon.damage);
    for (let i = 0; i < pens; i++) {
        rollData.damage += damageRoll.roll();
    }
    rollData.elementalDamage = elementalDamage.getDamage(defender);

    // Return roll data
    return rollData;
}

function test() {
    let part = {
        callback: function (evt) {
            console.log('Hello world');
            console.log(evt);
        }
    };
    AttackEvent.register(part.callback);
    new AttackEvent().fire();
}

export {
    Combat, Round,

    DiceRoll, Roll, getModifier, chanceForOneSuccess, chanceForThreeSuccess, chanceToSucceed, expectedPenetrations, rollPenetrations, random,

    test, SkillManager
};