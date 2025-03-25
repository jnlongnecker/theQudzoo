import { Part } from "./parts";
import { SLOTS } from "./anatomy";
import { GameObject } from "./gameObject";
import { part } from "./metadata";

class Item extends GameObject {
    name;
    token;

    constructor(name, token) {
        super();
        this.name = name;
        this.token = token;
    }

    static fist() {
        let item = new Item('Fist', '');
        item.attachPart(new MeleeWeapon({ pvCap: 1000, damage: '1d2-1' }));
        return item;
    }
}

export class MeleeWeapon extends Part {
    slot;
    pvBonus;
    pvCap;
    damage;
    stat;
    type;
    hitBonus;

    get name() {
        if (this.host) return this.host.name;
        return 'Default Melee Weapon';
    }

    static default() {
        let defaultMelee = new MeleeWeapon();
        return defaultMelee;
    }

    constructor({
        pvBonus = 0, pvCap = 0, damage = '1d2', hitBonus = 0,
        slot = SLOTS.HAND,
        stat = 'Strength', type = 'cudgel'
    } = {}) {
        super();
        this.pvBonus = pvBonus; this.pvCap = pvCap;
        this.damage = damage; this.hitBonus = hitBonus;
        this.slot = slot; this.stat = stat; this.type = type;
    }
}

class Armor extends Part {
    slot;
    av;
    dv;
    ma;
    heatRes;
    coldRes;
    acidRes;
    elecRes;
    poisRes;
    strength;
    agility;
    toughness;
    intelligence;
    willpower;
    ego;
    hitBonus;
    quicknessMod;

    constructor({
        slot = SLOTS.BODY, av = 0, dv = 0,
        heatRes = 0, coldRes = 0, acidRes = 0, elecRes = 0, poisRes = 0,
        strength = 0, agility = 0, toughness = 0, intelligence = 0, willpower = 0, ego = 0,
        hitBonus = 0, quicknessMod = 0
    } = {}) {
        super();
        this.slot = slot; this.av = av; this.dv = 0;
        this.heatRes = heatRes; this.coldRes = coldRes; this.acidRes = acidRes;
        this.elecRes = elecRes; this.poisRes = poisRes;
        this.strength = strength; this.agility = agility; this.toughness = toughness;
        this.intelligence = intelligence; this.willpower = willpower; this.ego = ego;
        this.hitBonus = hitBonus; this.quicknessMod = quicknessMod;
    }
}
part(MeleeWeapon, Armor);

export { Item };