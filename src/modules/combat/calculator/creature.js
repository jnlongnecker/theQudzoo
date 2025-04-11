import { Anatomy } from "./anatomy";
import { SkillAddedEvent } from "./events";
import { random, Roll } from "./rolls";
import { Skills } from "./skillParts/module";
import { GameObject } from "./gameObject";

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
    heatRes;
    coldRes;
    acidRes;
    elecRes;
    poisonRes;

    statShifters;
    sValues = {};

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
        strength = 16, agility = 16, toughness = 16, intelligence = 16, willpower = 16, ego = 16,
        heatRes = 0, coldRes = 0, acidRes = 0, elecRes = 0, poisonRes = 0) {

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
        this.heatRes = heatRes;
        this.coldRes = coldRes;
        this.acidRes = acidRes;
        this.elecRes = elecRes;
        this.poisonRes = poisonRes;
        this.statShifters = [];
        this.addShifter('hp', hp);
    }

    static fromObject(obj) {
        let sValues = {};
        let av, dv, hp, qn, ma, strength, agility, toughness, intelligence, willpower, ego, heatRes, coldRes, acidRes, elecRes;
        let statArr = obj.stats;
        for (let tag of statArr) {
            switch (tag.Name) {
                case 'Hitpoints':
                    hp = Number.parseInt(tag.Value);
                    sValues.hp = tag.sValue;
                    break;
                case 'Strength':
                    strength = Number.parseInt(tag.Value);
                    sValues.strength = tag.sValue;
                    break;
                case 'Agility':
                    agility = Number.parseInt(tag.Value);
                    sValues.agility = tag.sValue;
                    break;
                case 'Toughness':
                    toughness = Number.parseInt(tag.Value);
                    sValues.toughness = tag.sValue;
                    break;
                case 'Willpower':
                    willpower = Number.parseInt(tag.Value);
                    sValues.willpower = tag.sValue;
                    break;
                case 'Intelligence':
                    intelligence = Number.parseInt(tag.Value);
                    sValues.intelligence = tag.sValue;
                    break;
                case 'Ego':
                    ego = Number.parseInt(tag.Value);
                    sValues.ego = tag.sValue;
                    break;
                case 'Speed':
                    qn = Number.parseInt(tag.Value);
                    sValues.qn = tag.sValue;
                    break;
                case 'AV':
                    av = Number.parseInt(tag.Value);
                    sValues.av = tag.sValue;
                    break;
                case 'DV':
                    dv = Number.parseInt(tag.Value);
                    sValues.dv = tag.sValue;
                    break;
                case 'MA':
                    ma = Number.parseInt(tag.Value);
                    sValues.ma = tag.sValue;
                    break;
                case 'HeatResistance':
                    heatRes = Number.parseInt(tag.Value);
                    break;
                case 'ColdResistance':
                    coldRes = Number.parseInt(tag.Value);
                    break;
                case 'ElectricResistance':
                    elecRes = Number.parseInt(tag.Value);
                    break;
                case 'AcidResistance':
                    acidRes = Number.parseInt(tag.Value);
                    break;
            }
        }
        let stats = new Stats(av, dv, hp, qn, ma, strength, agility, toughness, intelligence, willpower, ego, heatRes, coldRes, acidRes, elecRes, 0);
        stats.sValues = sValues;
        return stats;
    }

    levelTier(level) {
        return Math.floor(level / 5) + 1
    }

    rollSValue(stat, level) {
        let levelTier = this.levelTier(level);
        let sValue = this.sValues[stat];
        if (!sValue) return;

        let rolls = sValue.split(',');
        let rollString = '';
        for (let roll of rolls) {
            roll = roll.replace(/t/, levelTier);
            rollString += rollString.length ? `+${roll}` : roll;
        }
        let roll = new Roll(rollString);
        this.setAttribute(stat, Math.floor(roll.getAverage()));
    }

    addShifter(stat, shift) {
        let shifter = new StatShifter(stat, shift);
        this.statShifters.push(shifter);
        return shifter;
    }

    removeShifter(shifter) {
        this.statShifters = this.statShifters.filter(item => item !== shifter);
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

    setAttribute(attributeName, value) {
        switch (attributeName) {
            case 'strength': this.strength = value; break;
            case 'agility': this.agility = value; break;
            case 'toughness': this.toughness = value; break;
            case 'intelligence': this.intelligence = value; break;
            case 'willpower': this.willpower = value; break;
            case 'ego': this.ego = value; break;
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
            return total + (shifter.stat === stat ? shifter.shift : 0);
        }, 0);
    }

}

class StatShifter {
    stat;
    shift;
    slot;

    constructor(stat, shift, slot = -1) {
        this.stat = stat;
        this.shift = shift;
        this.slot = slot;
    }
}

class Creature extends GameObject {

    name;
    token;
    level;
    stats;
    mutations;
    cybernetics;
    anatomy;
    effects;
    isKin;
    attributeExpenditure;
    parts = [];
    skills = {};
    actions = [];

    hpFromLevelUpRolls = [0, 0];
    minLevel;

    changes = 0;

    static fromObject(obj, isPlayer = false) {
        let creature = new Creature();
        creature.name = obj.cleanedName;
        creature.token = obj.src;
        creature.level = obj.stats.find(tag => tag.Name === 'Level')?.Value;
        creature.stats = Stats.fromObject(obj);
        if (isPlayer) creature.stats.recalculateHp(0, creature.level);
        else creature.rollStats();
        creature.isKin = undefined !== obj.stats.find(tag => tag.Name === 'Genotype' && tag.Value === 'True Kin');
        for (let tag of obj.tags) {
            creature.addTag(tag);
        }
        creature.anatomy = Anatomy.fromPart(obj.parts.find(part => part.Name === 'Body'));
        creature.anatomy.attach(creature);
        creature.anatomy.setDefaultPrimaryLimb();

        creature.setDefaultExpenditure();
        creature.minLevel = creature.level;
        for (let i = 1; i <= creature.level; i++) { creature.hpFromLevelUpRolls.push(0); }
        if (obj.skills) {
            creature.attachPart(new Skills());
            for (let skill in obj.skills) { creature.addSkill(skill); }
        }

        return creature;
    }

    addSkill(skillObj) {
        this.skills[skillObj.Name] = true;
        this.fire(new SkillAddedEvent(skillObj.Name));
    }

    rollStats() {
        for (let key in this.stats.sValues) {
            this.stats.rollSValue(key, this.level);
        }
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
        console.log('points spent');
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