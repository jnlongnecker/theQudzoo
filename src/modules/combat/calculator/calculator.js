import {
    DiceRoll, Roll,
    getModifier, chanceForOneSuccess, chanceForThreeSuccess, chanceToSucceed, expectedPenetrations, rollPenetrations, random
} from "./rolls.js";

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

    rounds = [];

    constructor(attacker, target) {
        this.attacker = attacker;
        this.defender = target;
    }

    bumpAttack() {
        let attackSets = [];
        attackSets.push(this.getAttacks(this.attacker, this.attacker.primary));
        for (let i = 0; i < this.attacker.limbs.length; i++) {
            let limb = this.attacker.limbs[i];
            if (this.attacker.swfOn && limb.multiweaponAffected) continue;
            if (limb.offhand == 0) continue;
            if (!limb.item.isWeapon && limb.slot == "floating") continue;

            attackSets.push(this.getAttacks(this.attacker, i));
        }

        let weapon = this.attacker.limbs[this.attacker.primary].item;
        let energyCost = weapon.type == 'shortBlade' && this.attacker.skills['Short Blade Expertise'] ? 750 : 1000;
        this.rounds.push(new Round(`Round ${this.rounds.length + 1}: Bump Attack`, attackSets, energyCost));
    }

    getAttacks(attacker, limb) {
        let weapon = attacker.limbs[limb].item;
        if (!weapon.isWeapon) weapon = defaultWeapon;

        // Determine how likely a second attack is
        let secondAttackChance = 0;
        if (limb == attacker.primary && attacker.swfOn) {
            if (attacker.skills['Weapon Master']) secondAttackChance = 1;
            if (attacker.skills['Weapon Expertise']) secondAttackChance = 0.5;
        } else if (limb != attacker.primary && weapon.type == 'shortBlade') {
            if (attacker.skills['Jab']) secondAttackChance = 1;
        }

        // Build attacks
        let attackTitle = limb == attacker.primary ? 'Primary ' : 'Offhand ';
        let attack1 = new Attack(attacker, limb, `Initial ${attackTitle} Attack (${limb.name}) - ${weapon.name}`);
        let attack2 = new Attack(attacker, limb, `Follow-Up ${attackTitle} Attack (${limb.name}) - ${weapon.name}`);
        attack2.activationChance = secondAttackChance;

        // Next actions depend on weapon type
        switch (weapon.type) {
            case "shortBlade":
            case "axe":
            case "longBlade":
                return [attack1, attack2];
            // Cudgels need backswing handled
            case "cudgel":
            default:
                if (limb != attacker.primary || !attacker.skills['Backswing']) return [attack1, attack2];

                let backswing1 = new Attack(attacker, limb, `Initial Backswing Attack (${limb.name}) - ${weapon.name}`);
                let backswing2 = new Attack(attacker, limb, `Follow-Up Backswing Attack (${limb.name}) - ${weapon.name}`);
                backswing1.activationChance = 0.25;
                backswing2.activationChance = secondAttackChance;

                return [attack1, [backswing1, backswing2], attack2];
        }
    }

    getTurnExpectedDamage(turn, defender) {
        let expectedDamage = 0;
        for (let attack of turn.attacks) {
            expectedDamage += attack.getExpectedDamage(defender);
        }
    }
}

class Round {
    attackSets = [];
    energyCost;
    name;

    constructor(name, attackSets, energyCost) {
        this.name = name;
        this.attackSets = attackSets;
        this.energyCost = energyCost;
    }

    expectedRoundDamage(defender) {
        let setResults = [];
        for (let attackSet of this.attackSets) {
            setResults.push(this.runAttackSet(attackSet, defender));
        }
        console.log(setResults);
    }

    runAttackSet(attackSet, defender, expected = false) {
        let attackData = [];
        for (let attack of attackSet) {
            if (Array.isArray(attack)) {
                attackData.concat(this.runAttackSet(attack, defender, expected));
                continue;
            }
            let result = expected ? getExpectedDamage(attack, defender) : rollAttack(attack, defender);
            attackData.push(result);
        }
        return attackData;
    }
}

class Attack {
    activationChance = 0;
    bonusPenetrations = 0;
    pvBonus = 0;
    pvMaxBonus = 0;
    hitBonus = 0;
    criticalChance = .05;
    cleaveChance = 0;
    bleedChance = 0;
    dazeChance = 0;
    dismemberChance = 0;
    elementalDamage = new ElementalDamage();

    isPrimary = false;
    limb;
    limbNum;
    weapon;
    attacker;
    name;

    constructor(attacker, limb, name) {
        this.name = name;
        this.attacker = attacker;
        this.isPrimary = this.attacker.primary == limb;
        this.limb = this.attacker.limbs[limb];
        this.limbNum = limb;

        let weapon = this.limb.item;
        if (!weapon.isWeapon)
            weapon = defaultWeapon;

        this.weapon = weapon;
        if (this.isPrimary)
            this.activationChance = 1;

        // Set up data based off of skills
        if (this.attacker.swfOn) {
            this.applySingleWeaponFightingSkills();
        } else if (this.limb.multiweaponAffected && !this.isPrimary) {
            this.applyMultiweaponFightingSkills();
        }
        switch (this.weapon.type) {
            case 'shortBlade':
                this.applyShortBladeSkills();
                break;
            case 'axe':
                this.applyAxeSkills();
                break;
            case 'longBlade':
                this.applyLongBladeSkills();
                break;
            case 'cudgel':
            default:
                this.applyCudgelSkills();
                break;
        }

        // Set up data based off of mods
        this.applyMods(this.weapon);

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
        let metrics = [];
        let weapon = this.weapon;

        if (this.offhandFactor > 0 && this.offhandModifier) {
        }

        for (let i = 0; i < this.hits; i++) {
            let data = {
                roll: 0, crit: false, hit: false, penetrations: 0, damage: 0
            };

            data.roll = random(1, 20);
            let minCrit = 21 - Math.floor(20 * this.criticalChance);
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
                data.damage += roller.roll();
            }
            metrics.push(data);
        }
        return metrics;
    }

    applySingleWeaponFightingSkills() {
        if (this.attacker.skills['Penetrating Strikes']) {
            this.bonusPenetrations = 1;
        }
    }

    applyMultiweaponFightingSkills() {
        if (this.attacker.skills['Multiweapon Master']) {
            this.activationChance = .50 + this.limb.offhand;
        } else if (this.attacker.skills['Multiweapon Expertise']) {
            this.activationChance = .35 + this.limb.offhand;
        } else if (this.attacker.skills['Multiweapon Proficiency']) {
            this.activationChance = .20 + this.limb.offhand;
        }
    }

    applyAxeSkills() {
        if (this.attacker.skills['Axe Proficiency']) {
            this.hitBonus += 2;
        }
        if (this.attacker.skills['Cleave']) {
            this.cleaveChance = .75;
        }
        if (this.attacker.skills['Dismember']) {
            this.dismemberChance = this.weapon.hands === 1 ? 0.03 : 0.06;
        }
    }

    applyCudgelSkills() {
        if (this.attacker.skills['Cudgel Proficiency']) {
            this.hitBonus += 2;
        }
        if (this.attacker.skills['Bludgeon']) {
            this.dazeChance = 0.5;
        }
    }

    applyShortBladeSkills() {
        if (this.attacker.skills['Short Blade Expertise']) {
            this.hitBonus += 1;
        }
        if (this.attacker.skills['Bloodletter']) {
            this.bleedChance = 0.75;
        }
    }

    applyLongBladeSkills() { }

    applyMods(weapon) {
        for (let mod of weapon.mods) {
            switch (mod) {
                case "Electrified":
                    this.elementalDamage.addElectric(weapon.tier);
                    break;
                case "Flaming":
                    this.elementalDamage.addHeat(weapon.tier);
                    break;
                case "Freezing":
                    this.elementalDamage.addCold(weapon.tier);
                    break;
                case "Sharp":
                    this.pvBonus += 1;
                    this.pvMaxBonus += 1;
                    break;
            }
        }
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
    Combat, Round,

    DiceRoll, Roll, getModifier, chanceForOneSuccess, chanceForThreeSuccess, chanceToSucceed, expectedPenetrations, rollPenetrations, random
};