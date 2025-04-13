import { Anatomy } from "./anatomy";
import { SkillAddedEvent } from "./events";
import { random, Roll } from "./rolls";
import { Skills } from "./skillParts/module";
import { GameObject } from "./gameObject";

class Stat {
    _value;
    sValue;
    boost;
    name;
    shortName;

    get value() {
        if (this.boost > 0) {
            return this._value + Math.ceil(this._value * 0.25 * this.boost);
        } else if (this.boost < 0) {
            return this._value + Math.ceil(this._value * 0.2 * this.boost);
        }
        else return this._value;
    }

    set value(val) {
        this._value = val;
    }

    constructor({ Value, sValue, Boost, Name, ShortName } = {}) {
        this._value = Number.parseInt(Value);
        this.sValue = sValue;
        this.boost = Boost ? Number.parseInt(Boost) : 0;
        this.name = Name;
        this.shortName = ShortName;
    }

    levelTier(level) {
        return Math.floor(level / 5) + 1
    }

    rollSValue(level) {
        let sValue = this.sValue;
        if (!sValue) return;

        let levelTier = this.levelTier(level);
        let rolls = sValue.split(',');
        let rollString = '';
        for (let roll of rolls) {
            roll = roll.replace(/t/, levelTier);
            rollString += rollString.length ? `+${roll}` : roll;
        }
        let roll = new Roll(rollString);
        this._value = Math.floor(roll.getAverage());
    }
}

class Stats {
    stats = {}

    statShifters;

    get Strength() {
        let shift = this.getShift('Strength');
        let value = this.getRaw('Strength');
        return {
            value: value,
            total: value + shift,
            modifier: Math.floor((value + shift - 16) * 0.5),
            shift,
        };
    }

    get Agility() {
        let shift = this.getShift('Agility');
        let value = this.getRaw('Agility');
        return {
            value: value,
            total: value + shift,
            modifier: Math.floor((value + shift - 16) * 0.5),
            shift,
        };
    }

    get Toughness() {
        let shift = this.getShift('Toughness');
        let value = this.getRaw('Toughness');
        return {
            value: value,
            total: value + shift,
            modifier: Math.floor((value + shift - 16) * 0.5),
            shift,
        };
    }

    get Intelligence() {
        let shift = this.getShift('Intelligence');
        let value = this.getRaw('Intelligence');
        return {
            value: value,
            total: value + shift,
            modifier: Math.floor((value + shift - 16) * 0.5),
            shift,
        };
    }

    get Willpower() {
        let shift = this.getShift('Willpower');
        let value = this.getRaw('Willpower');
        return {
            value: value,
            total: value + shift,
            modifier: Math.floor((value + shift - 16) * 0.5),
            shift,
        };
    }

    get Ego() {
        let shift = this.getShift('Ego');
        let value = this.getRaw('Ego');
        return {
            value: value,
            total: value + shift,
            modifier: Math.floor((value + shift - 16) * 0.5),
            shift,
        };
    }

    get Quickness() {
        let shift = this.getShift('Speed');
        let value = this.getRaw('Speed');
        return { value: value + shift };
    }

    get AV() {
        let shift = this.getShift('AV');
        let value = this.getRaw('AV');
        return { value: value + shift };
    }

    get DV() {
        let shift = this.getShift('DV');
        let value = this.getRaw('DV');
        return { value: value + shift + this.Agility.modifier + 6 };
    }

    get HP() {
        let shift = this.getShift('Hitpoints');
        let value = this.getRaw('Hitpoints');
        return { value: value + shift };
    }

    get MA() {
        let shift = this.getShift('MA');
        let value = this.getRaw('MA');
        return { value: value + shift + this.Willpower.modifier + 4 };
    }

    get Resistances() {
        let heatShift = this.getShift('HeatResistance');
        let heatVal = this.getRaw('HeatResistance');
        let coldShift = this.getShift('ColdResistance');
        let coldVal = this.getRaw('ColdResistance');
        let acidShift = this.getShift('AcidResistance');
        let acidVal = this.getRaw('AcidResistance');
        let electricShift = this.getShift('ElectricResistance');
        let electricVal = this.getRaw('ElectricResistance');
        return {
            heat: heatShift + heatVal, cold: coldShift + coldVal,
            acid: acidShift + acidVal, electric: electricShift + electricVal
        };
    }

    constructor(stats) {
        this.statShifters = [];
        for (let stat of stats) {
            if (stat.name === 'Hitpoints') {
                this.addShifter('Hitpoints', stat.value);
                stat.value = 0;
            }
            this.stats[stat.name] = stat;
        }
    }

    static fromObject(obj) {
        let statArr = obj.stats;
        let statObjList = [];
        for (let tag of statArr) {
            let stat = new Stat(tag);
            statObjList.push(stat);
        }
        let stats = new Stats(statObjList);
        return stats;
    }

    rollStats(level) {
        for (let attribute in this.stats) {
            this.stats[attribute].rollSValue(level);
        }
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
        this.stats.Hitpoints.value += amount + this.Toughness.modifier;
    }

    attributeUp(attributeName, amount) {
        this.stats[attributeName].value += amount;
    }

    setAttribute(attributeName, value) {
        this.stats[attributeName].value = value;
    }

    attributeAllUp() {
        this.stats.Strength.value++;
        this.stats.Agility.value++;
        this.stats.Toughness.value++;
        this.stats.Intelligence.value++;
        this.stats.Willpower.value++;
        this.stats.Ego.value++;
    }

    attributeAllDown() {
        this.stats.Strength.value--;
        this.stats.Agility.value--;
        this.stats.Toughness.value--;
        this.stats.Intelligence.value--;
        this.stats.Willpower.value--;
        this.stats.Ego.value--;
    }

    recalculateHp(hpFromLevelUp, level) {
        let tou = this.Toughness;
        this.stats.Hitpoints.value = tou.total;
        for (let i = 2; i <= level; i++) {
            this.stats.Hitpoints.value += Math.max(hpFromLevelUp[i] + tou.modifier, 1);
        }
    }

    getRaw(attributeName) {
        return this.stats[attributeName].value;
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

        console.log(creature);
        return creature;
    }

    addSkill(skillObj) {
        this.skills[skillObj.Name] = true;
        this.fire(new SkillAddedEvent(skillObj.Name));
    }

    rollStats() {
        this.stats.rollStats(this.level);
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