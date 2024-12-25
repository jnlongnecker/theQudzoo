let creatures = require("../../../api/data/creatures.json");

/* ========================== Testing Data ============================ */

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

function random(min, max) {
    let range = max - min;
    return min + Math.round(Math.random() * range);
}

function expectedPenetrations(av, bonus, maxBonus) {
    let chanceFor = [1];
    let currChanceFor = 1;
    let chanceToContinue = 1;
    while (currChanceFor > .00001) {
        let effectiveBonus = Math.min(bonus, maxBonus);
        let neededRoll = av + 1 - effectiveBonus;
        currChanceFor = chanceForOneSuccess(neededRoll) * chanceToContinue;
        chanceToContinue *= chanceForThreeSuccess(neededRoll);
        chanceFor.push(currChanceFor);
        bonus -= 2;
    }
    let expectedPenetrations = 0;
    for (let i = 1; i < chanceFor.length; i++) {
        expectedPenetrations += chanceFor[i];
    }
    return expectedPenetrations.toPrecision(4);
}

function chanceToSucceed(neededRoll) {
    let startingNumber = -1;
    let interval = 8;

    if (neededRoll < startingNumber) return 1;

    let adjustedRoll = neededRoll - startingNumber;
    let numIntervals = Math.floor(adjustedRoll / interval);
    let withinInterval = adjustedRoll % interval;

    let intervalChance = 0;
    if (numIntervals > 0) {
        let strChance = '0.';
        for (let i = 0; i < numIntervals; i++) {
            strChance += '9';
        }
        strChance += '1';
        intervalChance = Number(strChance);
    }
    let withinChance = withinInterval / Math.pow(10, numIntervals + 1);

    return 1 - (intervalChance + withinChance);
}

function chanceForOneSuccess(neededRoll) {
    let failChance = 1 - chanceToSucceed(neededRoll);
    return 1 - failChance * failChance * failChance;
}

function chanceForThreeSuccess(neededRoll) {
    let passChance = chanceToSucceed(neededRoll);
    return passChance * passChance * passChance;
}

function getModifier(attribute) {
    return Math.floor((attribute - 16) / 2);
}

class Combat {

    attacker;
    defender;

    constructor(attacker, target) {
        this.attacker = attacker;
        this.defender = target;
    }

    bumpAttack() {
        let expectedDamage = this.getExpectedDamageFrom(this.attacker, this.defender, this.attacker.primary);
        for (let i = 0; i < this.attacker.limbs.length; i++) {
            let limb = this.attacker.limbs[i];
            if (this.attacker.swfOn && limb.multiweaponAffected) continue;
            if (limb.offhand == 0) continue;
            if (!limb.item.isWeapon && limb.slot == "floating") continue;
            console.log(`Offhand number ${i} rolling`)
            expectedDamage += this.getExpectedDamageFrom(this.attacker, this.defender, i);
        }

        return expectedDamage;
    }

    getExpectedDamageFrom(attacker, defender, limb) {
        let weapon = attacker.limbs[limb].item;
        if (!weapon.isWeapon) weapon = defaultWeapon;
        switch (weapon.type) {
            case "cudgel":
                let attack = new CudgelAttack(attacker, limb);
                return attack.getExpectedDamage(defender);
            case "longBlade":
                break;
            case "shortBlade":
                break;
            case "axe":
                break;
            default:
        }
    }
}

class CudgelAttack {
    baseAttack;

    dazeChance = 0;
    backswingChance = 0;
    limbNum;

    constructor(attacker, limb, bonusPV = 0, bonusMaxPV = 0) {
        this.limbNum = limb;
        this.baseAttack = new Attack(attacker, limb);
        this.dazeChance = this.baseAttack.criticalChance;
        for (let skill of attacker.skills) {
            switch(skill) {
                case 'Cudgel Proficiency':
                    this.baseAttack.hitBonus += 2;
                    break;
                case 'Bludgeon':
                    this.dazeChance += .5;
                    break;
                case 'Backswing':
                    this.backswingChance = .25;
                    break;
            }
        }
        
        this.baseAttack.pvBonus += bonusPV;
        this.baseAttack.pvMaxBonus += bonusMaxPV;
    }

    getExpectedDamage(defender) {
        let critAttack = new CudgelAttack(this.baseAttack.attacker, this.limbNum, 1, 1);
        let critDamage = critAttack.baseAttack.getExpectedDamage(defender);
        let normalDamage = this.baseAttack.getExpectedDamage(defender);
        let hitChance = this.baseAttack.getHitChance(defender);
        // Critical hits always hit, so do not modify by hit chance
        critDamage = critDamage * this.baseAttack.criticalChance;
        // If the attack is not a critical hit, it can miss so modify by hit chance
        normalDamage = (1 - this.baseAttack.criticalChance) * normalDamage * hitChance;

        // Handle backswing
        let backswingDamage = 0;
        if (this.backswingChance > 0) {
            let backswingAttack = new CudgelAttack(this.baseAttack.attacker, this.limbNum);
            backswingAttack.backswingChance = 0;
            // Calling this method factors in critical hits and misses already
            backswingDamage = backswingAttack.getExpectedDamage(defender);
            backswingDamage = backswingDamage * this.backswingChance;
        }
        return normalDamage + critDamage + backswingDamage;
    }
}

class Attack {
    offhandModifier = 0;
    offhandFactor = 1;
    hits = 1;
    bonusPenetrations = 0;
    pvBonus = 0;
    pvMaxBonus = 0;
    hitBonus = 0;
    criticalChance = .05;
    electric = 0;
    heat = 0;
    cold = 0;
    limb;
    isPrimary = false;
    weapon;
    attacker;

    constructor(attacker, limb) {
        this.attacker = attacker;
        this.isPrimary = this.attacker.primary == limb;
        this.limb = this.attacker.limbs[limb];
        let weapon = this.limb.item;
        if (!weapon.isWeapon)
            weapon = defaultWeapon;

        this.weapon = weapon;
        for (let skill of attacker.skills) {
            if (this.attacker.swfOn) {
                this.offhandFactor = 0;
                switch (skill) {
                    case 'Weapon Mastery':
                        this.hits = 2;
                        break;
                    case 'Weapon Expertise':
                        this.hits = Math.max(this.hits, 1.5);
                        break;
                    case 'Penetrating Strikes':
                        this.bonusPenetrations = 1;
                        break;
                    default:
                        break;
                }
            } else if (this.limb.multiweaponAffected) {
                switch (skill) {
                    case 'Multiweapon Mastery':
                        this.offhandModifier = .50;
                        break;
                    case 'Multiweapon Expertise':
                        this.offhandModifier = Math.max(this.offhandModifier, .35);
                        break;
                    case 'Multiweapon Proficiency':
                        this.offhandModifier = Math.max(this.offhandModifier, .2);
                        break;
                    default:
                        break;
                }
            }
        }
        for (let mod of weapon.mods) {
            switch (mod) {
                case "Electrified":
                    this.electric += electrifiedTierDamage[weapon.tier];
                    break;
                case "Flaming":
                    this.heat += heatAndColdTierDamage[weapon.tier];
                    break;
                case "Freezing":
                    this.cold += heatAndColdTierDamage[weapon.tier];
                    break;
                case "Sharp":
                    this.pvBonus += 1;
                    this.pvMaxBonus += 1;
                    break;
            }
        }
    }

    getHitChance(defender) {
        let totalHitBonus = this.hitBonus + getModifier(this.attacker.attributes.agility);
        let dv = defender.dv;
        let rollNecessary = dv - totalHitBonus - 1;
        return 1 - Math.max(rollNecessary * 0.5, 0);
    }

    getExpectedDamage(defender) {
        let weapon = this.weapon;
        let pv = this.pvBonus + getModifier(this.attacker.attributes.strength) + weapon.pvBonus;
        let pvMax = this.pvMaxBonus + weapon.pvCap;
        let av = defender.av;
        let damageRoll = new Roll(weapon.damage).getAverage();
        let pens = expectedPenetrations(av, pv, pvMax) + this.bonusPenetrations;

        if (this.isPrimary) {
            return this.hits * (pens * damageRoll + this.getElementalDamage(defender));
        }
        let limbData = this.limb;
        let offhandScalar = (this.offhandModifier + limbData.offhand) * this.offhandFactor;
        return this.hits * (pens * damageRoll + this.getElementalDamage(defender)) * offhandScalar;
    }

    getElementalDamage(defender) {
        let dmg = 0;
        dmg += (this.electric - this.electric * defender.resistances.electric);
        dmg += (this.heat - this.heat * defender.resistances.heat);
        return dmg + (this.cold - this.cold * defender.resistances.cold);
    }
}

class DiceRoll {
    averageRoll = 0;

    diceNum;
    diceCount;
    constructor(diceString) {
        let parts = diceString.split('d');
        this.diceNum = Number(parts[1]);
        this.diceCount = Math.max(1, Number(parts[0]));
        this.averageRoll = ((this.diceNum / 2) + 0.5) * this.diceCount;
    }

    roll() {
        let result = 0;
        for (let i = 0; i < this.diceCount; i++) {
            result += random(1, this.diceNum);
        }
        return result;
    }
}

class Roll {
    tokens = [];

    averageRoll;
    constructor(string) {
        this.tokenize(string);
    }

    roll() {
        let storedOperation = '+';
        let total = 0;
        for (let token of this.tokens) {
            switch (typeof token) {
                case "string":
                    storedOperation = token;
                    break;
                case "number":
                    total = storedOperation == '+' ? total + token : total - token;
                    break;
                case "object":
                    let roll = token.roll();
                    total = storedOperation == '+' ? total + roll : total - roll;
                    break;
            }
        }
        return total;
    }

    getAverage() {
        if (this.averageRoll != undefined) return this.averageRoll;
        let storedOperation = '+';
        let total = 0;
        for (let token of this.tokens) {
            switch (typeof token) {
                case "string":
                    storedOperation = token;
                    break;
                case "number":
                    total = storedOperation == '+' ? total + token : total - token;
                    break;
                case "object":
                    let avg = token.averageRoll;
                    total = storedOperation == '+' ? total + avg : total - avg;
                    break;
            }
        }
        this.averageRoll = total;
        return total;
    }

    tokenize(rollString) {
        this.tokens = [];
        let currToken = '';
        for (let char of rollString) {
            switch (char) {
                case ' ':
                    if (currToken != '') this.addToken(currToken);
                    currToken = '';
                    break;
                case '+':
                case '-':
                    if (currToken != '') {
                        this.addToken(currToken);
                        currToken = '';
                    }
                    this.addToken(char);
                    break;
                default:
                    currToken += char;
            }
        }
        if (currToken != '') this.addToken(currToken);
    }

    addToken(token) {
        let isDice = token.includes('d');
        let isModifier = !isNaN(token);
        if (isDice) {
            let roll = new DiceRoll(token);
            this.tokens.push(roll);
        } else if (isModifier) {
            this.tokens.push(Number(token));
        } else {
            this.tokens.push(token);
        }
    }
}

const electrifiedTierDamage = [1, 1, 2.5, 3.5, 5, 6, 7.5, 8.5, 10];
const heatAndColdTierDamage = [1, 1, 2, 3, 4, 5, 6, 7, 8];

let testCombat = new Combat(creatures[1], creatures[0]);
console.log(testCombat.bumpAttack());