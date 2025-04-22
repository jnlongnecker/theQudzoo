import { Part } from "./parts";
import { SLOTS } from "./anatomy";
import { GameObject } from "./gameObject";
import { part } from "./metadata";
import { GetItemShortDescriptionEvent, GetItemStatDescriptionEvent } from "./events";

const hpIcon = '<span class="stat-container"><img class="inline-icon" src="/assets/images/Textures/Text/hitpoints.png" /></span>';
const dvIcon = '<span class="stat-container"><img class="inline-icon" src="/assets/images/Textures/Text/dodgeValue.png" /></span>';
const avIcon = '<span class="stat-container"><img class="inline-icon" src="/assets/images/Textures/Text/armorValue.png" /></span>';

class Item extends GameObject {
    name;
    token;
    displayName;
    handler = null;

    static fromObject(itemObj) {
        let item = new Item(itemObj.Name, itemObj.src, itemObj.displayName);
        for (let tagObj of itemObj.tags) {
            item.addTag(tagObj);
        }
        for (let partObj of itemObj.parts) {
            item.attachPartFromObj(partObj);
        }
        return item;
    }

    constructor(name, token, displayName) {
        super();
        this.name = name;
        this.token = token;
        this.displayName = displayName;
    }

    onEquip(handler) {
        this.handler = handler;
        for (let part of this.parts) {
            part.onEquip(handler);
        }
    }

    onUnequip() {
        this.handler = null;
        for (let part of this.parts) {
            part.onUnequip();
        }
        this.destroy();
    }

    static fist() {
        let item = new Item('Fist', '/assets/images/Textures/Creatures/Cragmensch Fist.png', '{{y|fist}}');
        item.attachPart(new MeleeWeapon({ pvCap: 1000, damage: '1d2-1' }));
        item.addTag({ Name: 'NaturalGear', Value: '' });
        item.addTag({ Name: 'MeleeWeapon', Value: '1' });
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
        PenBonus = 0, MaxStrengthBonus = 0, BaseDamage = '1d2', HitBonus = 0,
        Slot = 'Hand',
        Stat = 'Strength', Skill = 'cudgel'
    } = {}) {
        super();
        this.pvBonus = Number.parseInt(PenBonus); this.pvCap = Number.parseInt(MaxStrengthBonus);
        this.damage = BaseDamage; this.hitBonus = Number.parseInt(HitBonus);
        this.slot = Slot; this.stat = Stat; this.type = Skill;
    }

    onAttach(host) {
        super.onAttach(host);

        GetItemShortDescriptionEvent.register(host, (event) => this.handleShortDescriptionEvent(event), this.id);
        GetItemStatDescriptionEvent.register(host, (event) => this.handleStatDescriptionEvent(event), this.id);
    }

    handleShortDescriptionEvent(event) {
        if (!this.host.hasTag('MeleeWeapon')) return;

        event.description += ` ${this.statsString()}`;
    }

    handleStatDescriptionEvent(event) {
        if (!this.host.hasTag('MeleeWeapon')) return;

        event.description += this.statsString();
    }

    statsString() {
        let handler = this.host.handler.host;
        let strBonus = handler ? handler.stats.Strength.modifier : 0;
        let pv = Math.min(4 + strBonus + this.pvBonus, this.pvCap + 4 + this.pvBonus);
        let pvCap = this.pvCap + 4 + this.pvBonus < 999 ? this.pvCap + 4 + this.pvBonus : '∞';
        return `{{c|→}}{{y|${pv}}}{{K|/${pvCap}}} ${hpIcon}{{y|${this.damage}}}`;
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

    handler;
    shifters = [];

    constructor({
        WornOn = 'Body', AV = 0, DV = 0, MA = 0,
        Heat = 0, Cold = 0, Acid = 0, Elec = 0,
        Strength = 0, Agility = 0, Toughness = 0, Intelligence = 0, Willpower = 0, Ego = 0,
        ToHit = 0, SpeedBonus = 0
    } = {}) {
        super();
        this.slot = WornOn; this.av = Number.parseInt(AV); this.dv = Number.parseInt(DV); this.ma = Number.parseInt(MA);
        this.heatRes = Number.parseInt(Heat); this.coldRes = Number.parseInt(Cold); this.acidRes = Number.parseInt(Acid);
        this.elecRes = Number.parseInt(Elec);
        this.strength = Number.parseInt(Strength); this.agility = Number.parseInt(Agility); this.toughness = Number.parseInt(Toughness);
        this.intelligence = Number.parseInt(Intelligence); this.willpower = Number.parseInt(Willpower); this.ego = Number.parseInt(Ego);
        this.hitBonus = Number.parseInt(ToHit); this.quicknessMod = Number.parseInt(SpeedBonus);
    }

    get isSpread() {
        if (!this.handler) return false;
        return this.handler.host.anatomy.getLimbsWithSlot(this.handler.slot).length > 1;
    }

    get AV() {
        if (!this.handler) return this.av;
        if (this.slot === 'Floating Nearby') return this.av;
        let spread = this.handler.host.anatomy.getLimbsWithSlot(this.handler.slot).length;
        return this.av / spread;
    }

    get DV() {
        if (!this.handler) return this.dv;
        if (this.slot === 'Floating Nearby') return this.dv;
        let spread = this.handler.host.anatomy.getLimbsWithSlot(this.handler.slot).length;
        return this.dv / spread;
    }

    onAttach(host) {
        super.onAttach(host);

        GetItemShortDescriptionEvent.register(host, (event) => this.handleShortDescriptionEvent(event), this.id);
        GetItemStatDescriptionEvent.register(host, (event) => this.handleStatDescriptionEvent(event), this.id);
    }

    onEquip(handler) {
        this.handler = handler;

        this.addContribution()
    }

    onUnequip() {
        for (let shifter of this.shifters) {
            this.handler.host.stats.removeShifter(shifter);
        }
        this.handler = null;
    }

    addContribution() {
        this.shifters.push(this.handler.host.stats.addShifter('AV', this.AV));
        this.shifters.push(this.handler.host.stats.addShifter('DV', this.DV));
        this.shifters.push(this.handler.host.stats.addShifter('MA', this.ma));
        this.shifters.push(this.handler.host.stats.addShifter('HeatResistance', this.heatRes));
        this.shifters.push(this.handler.host.stats.addShifter('ColdResistance', this.coldRes));
        this.shifters.push(this.handler.host.stats.addShifter('AcidResistance', this.acidRes));
        this.shifters.push(this.handler.host.stats.addShifter('Agility', this.agility));
        this.shifters.push(this.handler.host.stats.addShifter('Strength', this.strength));
        this.shifters.push(this.handler.host.stats.addShifter('Toughness', this.toughness));
        this.shifters.push(this.handler.host.stats.addShifter('Intelligence', this.intelligence));
        this.shifters.push(this.handler.host.stats.addShifter('Willpower', this.willpower));
        this.shifters.push(this.handler.host.stats.addShifter('Ego', this.ego));
        this.shifters.push(this.handler.host.stats.addShifter('Speed', this.quicknessMod));
    }

    statsString() {
        let avColor = 'y';
        let dvColor = 'y';
        if (this.isSpread) {
            if (this.av > 0) avColor = 'r';
            else if (this.av < 0) avColor = 'g';
            if (this.dv > 0) dvColor = 'r';
            else if (this.dv < 0) dvColor = 'g';
        }
        return `${avIcon}{{${avColor}|${this.av}}} ${dvIcon}{{${dvColor}|${this.dv}}}`;
    }

    handleShortDescriptionEvent(event) {
        event.description += ` ${this.statsString()}`;
    }

    handleStatDescriptionEvent(event) {
        event.description = this.statsString();
    }
}
part(MeleeWeapon, Armor);

export { Item };