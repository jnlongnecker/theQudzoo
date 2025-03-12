import { ANATOMIES } from "./anatomy.js";
import { random } from "./rolls.js";

class Stats {
    av;
    dv;
    hp;
    qn;
    ma;
    strength;
    agility;
    toughness;
    intelligence;
    willpower;
    ego;
    statShifters;

    get Strength() {
        let shift = this.getShift('strength');
        return {
            value: this.strength,
            total: this.strength + shift,
            modifier: Math.floor((this.strength + shift - 16) * 0.5),
            shift,
        };
    }

    get Agility() {
        let shift = this.getShift('agility');
        return {
            value: this.agility,
            total: this.agility + shift,
            modifier: Math.floor((this.agility + shift - 16) * 0.5),
            shift,
        };
    }

    get Toughness() {
        let shift = this.getShift('toughness');
        return {
            value: this.toughness,
            total: this.toughness + shift,
            modifier: Math.floor((this.toughness + shift - 16) * 0.5),
            shift,
        };
    }

    get Intelligence() {
        let shift = this.getShift('intelligence');
        return {
            value: this.intelligence,
            total: this.intelligence + shift,
            modifier: Math.floor((this.intelligence + shift - 16) * 0.5),
            shift,
        };
    }

    get Willpower() {
        let shift = this.getShift('willpower');
        return {
            value: this.willpower,
            total: this.willpower + shift,
            modifier: Math.floor((this.willpower + shift - 16) * 0.5),
            shift,
        };
    }

    get Ego() {
        let shift = this.getShift('ego');
        return {
            value: this.ego,
            total: this.ego + shift,
            modifier: Math.floor((this.ego + shift - 16) * 0.5),
            shift,
        };
    }

    get Quickness() {
        let shift = this.getShift('qn');
        return { value: this.qn + shift };
    }

    get AV() {
        let shift = this.getShift('av');
        return { value: this.av + shift };
    }

    get DV() {
        let shift = this.getShift('dv');
        return { value: this.dv + shift + this.Agility.modifier + 6 };
    }

    get HP() {
        let shift = this.getShift('hp');
        return { value: this.hp + shift };
    }

    get MA() {
        let shift = this.getShift('ma');
        return { value: this.ma + shift + this.Willpower.modifier + 4 };
    }

    constructor(
        av = 0, dv = 0, hp = 0, qn = 100, ma = 0,
        strength = 16, agility = 16, toughness = 16, intelligence = 16, willpower = 16, ego = 16) {

        this.hp = 0;
        this.ma = ma;
        this.av = av;
        this.dv = dv;
        this.qn = qn;
        this.strength = strength;
        this.agility = agility;
        this.toughness = toughness;
        this.intelligence = intelligence;
        this.willpower = willpower;
        this.ego = ego;
        this.statShifters = [];
        this.addShifter('hp', hp, false);
    }

    addShifter(stat, shift, temporary) {
        let shifter = new StatShifter(stat, shift, temporary);
        this.statShifters.push(shifter);
        return shifter;
    }

    addHp(amount) {
        this.hp += amount + this.Toughness.modifier;
    }

    attributeUp(attributeName, amount) {
        switch (attributeName) {
            case 'strength': this.strength += amount; break;
            case 'agility': this.agility += amount; break;
            case 'toughness': this.toughness += amount; break;
            case 'intelligence': this.intelligence += amount; break;
            case 'willpower': this.willpower += amount; break;
            case 'ego': this.ego += amount; break;
        }
    }

    attributeAllUp() {
        this.strength++;
        this.agility++;
        this.toughness++;
        this.intelligence++;
        this.willpower++;
        this.ego++;
    }

    attributeAllDown() {
        this.strength--;
        this.agility--;
        this.toughness--;
        this.intelligence--;
        this.willpower--;
        this.ego--;
    }

    recalculateHp(hpFromLevelUp, level) {
        let tou = this.Toughness;
        this.hp = tou.total;
        for (let i = 2; i <= level; i++) {
            this.hp += Math.max(hpFromLevelUp[i] + tou.modifier, 1);
        }
    }

    getRaw(attributeName) {
        switch (attributeName) {
            case 'strength': return this.strength;
            case 'agility': return this.agility;
            case 'toughness': return this.toughness;
            case 'intelligence': return this.intelligence;
            case 'willpower': return this.willpower;
            case 'ego': return this.ego;
        }
    }

    getShift(stat) {
        return this.statShifters.reduce((total, shifter) => {
            return total + shifter.stat === stat ? shifter.shift : 0;
        }, 0);
    }

}

class StatShifter {
    stat;
    shift;
    temporary;

    constructor(stat, shift, temporary = false) {
        this.stat = stat;
        this.shift = shift;
        this.temporary = temporary;
    }
}

class Creature {

    name;
    token;
    faction;
    level;
    resistances;
    stats;
    mutations;
    cybernetics;
    anatomy;
    limbs;
    effects;
    primary;
    isKin;
    partManager;
    skillManager;
    attributeExpenditure;

    hpFromLevelUpRolls = [0, 0];
    minLevel;

    changes = 0;

    static fromObject(obj) {
        let creature = new Creature();
        creature.name = obj.name;
        creature.token = obj.token;
        creature.faction = obj.faction;
        creature.level = obj.level;
        creature.stats = new Stats(obj.av, obj.dv, obj.hp, obj.qn, obj.ma,
            obj.attributes.strength, obj.attributes.agility, obj.attributes.toughness,
            obj.attributes.intelligence, obj.attributes.willpower, obj.attributes.ego,
        );
        creature.stats.recalculateHp(0, obj.level);
        creature.anatomy = obj.anatomy;
        creature.isKin = obj.isKin;
        creature.limbs = ANATOMIES[creature.anatomy.toUpperCase()];
        creature.resistances = obj.resistances

        creature.setDefaultExpenditure();
        creature.minLevel = obj.level;
        for (let i = 1; i <= obj.level; i++) { creature.hpFromLevelUpRolls.push(0); }

        return creature;
    }

    levelUp() {
        this.level++;
        this.level < this.hpFromLevelUpRolls.length ? undefined : this.rollLevelUpHp();
        let allUp = this.level % 6 == 0;
        let point = (this.level + 3) % 6 == 0;

        if (allUp) this.stats.attributeAllUp();
        if (point) this.attributeExpenditure.leveledPoints++;

        this.stats.recalculateHp(this.hpFromLevelUpRolls, this.level);
    }

    levelDown() {
        if (this.level <= this.minLevel) return false;
        let allDown = this.level % 6 == 0;
        let pointDown = (this.level + 3) % 6 == 0;
        this.level--;

        if (allDown) this.stats.attributeAllDown();
        if (pointDown) this.attributeExpenditure.leveledPoints--;

        this.stats.recalculateHp(this.hpFromLevelUpRolls, this.level);
        return true;
    }

    spendPoints(points, attribute, shift) {
        if (this.level > 1) {
            this.attributeExpenditure.leveledPointsUsed += points;
        } else {
            this.attributeExpenditure.freePointsUsed += points;
        }
        this.stats.attributeUp(attribute, shift);
        this.stats.recalculateHp(this.hpFromLevelUpRolls, this.level);
    }

    refundPoints(points, attribute, shift) {
        if (this.level > 1) {
            this.attributeExpenditure.leveledPointsUsed -= points;
        } else {
            this.attributeExpenditure.freePointsUsed -= points;
        }
        this.stats.attributeUp(attribute, -shift);
        this.stats.recalculateHp(this.hpFromLevelUpRolls, this.level);
    }

    rollLevelUpHp() {
        let roll = random(1, 4);
        this.hpFromLevelUpRolls.push(roll);
        return roll;
    }

    setDefaultExpenditure() {
        let leveledPoints = 0;
        let freePoints = this.isKin ? 38 : 44;
        let minTotal = this.isKin ? 12 : 10;
        this.attributeExpenditure = {
            leveledPoints, freePoints, minTotal,
            freePointsUsed: 0,
            leveledPointsUsed: 0,
        };
    }
}

export { Creature };