import { ANATOMIES } from "./anatomy.js";
import { random } from "./rolls.js";

class Creature {

    name;
    token;
    faction;
    level;
    resistances;
    stats;
    statShifters;
    mutations;
    cybernetics;
    anatomy;
    limbs;
    effects;
    primary;
    isKin;
    partManager;
    skillManager;

    #hpFromLevelUpRolls = [0, 0];
    #minLevel;

    constructor(name, token, faction, hp, av, dv, ma, qn, level, anatomy, isKin) {
        this.name = name;
        this.token = token;
        this.faction = faction;
        this.level = level;
        this.stats = new Stats(qn = qn, hp = hp);
        this.anatomy = anatomy;
        this.isKin = isKin;
        this.limbs = ANATOMIES[this.anatomy.toUpperCase()];

        this.#minLevel = level;
        for (let i = 1; i <= level; i++) { this.#hpFromLevelUpRolls.push(0); }
    }

    levelUp() {
        this.level++;
        this.level < this.#hpFromLevelUpRolls.length ? undefined : this.#rollLevelUpHp();
        this.stats.attributeAllUp();
        this.stats.recalculateHp(this.#hpFromLevelUpRolls, this.level);
    }

    levelDown() {
        this.level--;
        this.stats.recalculateHp(this.#hpFromLevelUpRolls, this.level);
    }

    #rollLevelUpHp() {
        let roll = random(1, 4);
        this.#hpFromLevelUpRolls.push(roll);
        return roll;
    }
}

class Stats {
    #av;
    #dv;
    #hp;
    #qn;
    #ma;
    #strength;
    #agility;
    #toughness;
    #intelligence;
    #willpower;
    #ego;
    #statShifters;

    get Strength() {
        let shift = this.#getShift('strength');
        return {
            value: this.#strength,
            total: this.#strength + shift,
            modifier: Math.floor((this.#strength + shift - 16) * 0.5),
            shift,
        };
    }

    get Agility() {
        let shift = this.#getShift('agility');
        return {
            value: this.#agility,
            total: this.#agility + shift,
            modifier: Math.floor((this.#agility + shift - 16) * 0.5),
            shift,
        };
    }

    get Toughness() {
        let shift = this.#getShift('toughness');
        return {
            value: this.#toughness,
            total: this.#toughness + shift,
            modifier: Math.floor((this.#toughness + shift - 16) * 0.5),
            shift,
        };
    }

    get Intelligence() {
        let shift = this.#getShift('intelligence');
        return {
            value: this.#intelligence,
            total: this.#intelligence + shift,
            modifier: Math.floor((this.#intelligence + shift - 16) * 0.5),
            shift,
        };
    }

    get Willpower() {
        let shift = this.#getShift('willpower');
        return {
            value: this.#willpower,
            total: this.#willpower + shift,
            modifier: Math.floor((this.#willpower + shift - 16) * 0.5),
            shift,
        };
    }

    get Ego() {
        let shift = this.#getShift('ego');
        return {
            value: this.#ego,
            total: this.#ego + shift,
            modifier: Math.floor((this.#ego + shift - 16) * 0.5),
            shift,
        };
    }

    get Quickness() {
        let shift = this.#getShift('qn');
        return { value: this.#qn + shift };
    }

    get AV() {
        let shift = this.#getShift('av');
        return { value: this.#av + shift };
    }

    get DV() {
        let shift = this.#getShift('dv');
        return { value: this.#dv + shift + this.Agility.modifier + 6 };
    }

    get HP() {
        let shift = this.#getShift('hp');
        return { value: this.#hp + shift };
    }

    get MA() {
        let shift = this.#getShift('ma');
        return { value: this.#ma + shift + this.Willpower.modifier + 4 };
    }

    constructor(
        av = 0, dv = 0, hp = 0, qn = 100, ma = 0,
        strength = 16, agility = 16, toughness = 16, intelligence = 16, willpower = 16, ego = 16) {

        this.#hp = 0;
        this.#ma = ma;
        this.#av = av;
        this.#dv = dv;
        this.#qn = qn;
        this.#strength = strength;
        this.#agility = agility;
        this.#toughness = toughness;
        this.#intelligence = intelligence;
        this.#willpower = willpower;
        this.#ego = ego;
        this.#statShifters = [];
        this.addShifter('hp', hp, false);
    }

    addShifter(stat, shift, temporary) {
        let shifter = new StatShifter(stat, shift, temporary);
        this.#statShifters.push(shifter);
        return shifter;
    }

    addHp(amount) {
        this.#hp += amount + this.Toughness.modifier;
    }

    attributeAllUp() {
        this.#strength++;
        this.#agility++;
        this.#toughness++;
        this.#intelligence++;
        this.#willpower++;
        this.#ego++;
    }

    recalculateHp(hpFromLevelUp, level) {
        let tou = this.Toughness;
        this.#hp = tou.total;
        for (let i = 2; i <= level; i++) {
            this.#hp += hpFromLevelUp[i] + tou.modifier;
        }
    }

    #getShift(stat) {
        return this.#statShifters.reduce((total, shifter) => {
            return total + shifter.stat === stat ? shifter.shift : 0;
        }, 0);
    }

}

class StatShifter {
    #stat;
    #shift;
    #temporary;

    get stat() { return this.#stat; }
    get shift() { return this.#shift; }
    get temporary() { return this.#temporary; }

    constructor(stat, shift, temporary = false) {
        this.stat = stat;
        this.shift = shift;
        this.temporary = temporary;
    }
}