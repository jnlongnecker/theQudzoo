import {
    DiceRoll, Roll,
    getModifier, chanceForOneSuccess, chanceForThreeSuccess, chanceToSucceed, expectedPenetrations, rollPenetrations, random
} from "./rolls.js";
import { ActivatedActionEvent } from "./events.js";
import { Creature } from "./creature.js";


class Combat {

    attacker;
    defender;

    actions = [];

    constructor(attacker, target) {
        this.attacker = attacker;
        this.defender = target;
    }

    bumpAttack() {
        let action = this.attacker.fire(new ActivatedActionEvent('Bump_Attack', { cost: 1000 })).details;
        console.log(action);
        for (let attack of action.attacks) {
            console.log(attack);
        }

        this.actions.push(action);
    }

    /* WIP */
    getTurnExpectedDamage(turn, defender) {
        let expectedDamage = 0;
        for (let attack of turn.attacks) {
            expectedDamage += attack.getExpectedDamage(defender);
        }
    }
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

export {
    Combat,

    DiceRoll, Roll, getModifier, chanceForOneSuccess, chanceForThreeSuccess, chanceToSucceed, expectedPenetrations, rollPenetrations, random,

    Creature
};