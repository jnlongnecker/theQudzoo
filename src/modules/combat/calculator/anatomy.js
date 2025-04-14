import { Item, MeleeWeapon } from "./items";
import { Part } from "./parts";
import { GetAttacksEvent, OffhandChanceEvent, GetAttackCountEvent } from "./events";
import { Attack, AttackerPart } from "./attacks";
import { random } from "./rolls";
import { part } from "./metadata";

export const SLOTS = {
    HEADGEAR: 0,
    BODY: 1,
    FOOTWEAR: 2,
    HANDWEAR: 3,
    HAND: 4,
    ARMGEAR: 5,
    BACKWEAR: 6,
    FACE: 7,
    TAIL: 8,
    FLOATING: 9
};

export const CYBERNETIC_SLOT = {
    HEAD: 0,
    BODY: 1,
    FEET: 2,
    HANDS: 3,
    ARM: 4,
    BACK: 5,
    FACE: 6
}


class BodyPart extends Part {
    name;
    slot;
    cyberneticSlot;
    item;
    defaultBehavior;
    isExtrinsic;
    dismembered = false;
    dependentParts = [];
    isPrimary = false;

    _cachedWeapon = { dirty: true, weapon: false };

    constructor(name, slot, item, cyberneticSlot, defaultBehavior = null, isExtrinsic = false) {
        super();
        this.name = name;
        this.slot = slot;
        this.cyberneticSlot = cyberneticSlot;
        this.defaultBehavior = defaultBehavior;
        this.item = item;
        this.isExtrinsic = isExtrinsic;
    }

    getValidPrimaryCandidates(candidates = [], slot) {
        if (slot === undefined) {
            let primaryTag = this.host.getTag('PrimaryLimbType');
            slot = primaryTag ? primaryTag.value : 'Body';
        }
        for (let part of this.dependentParts) {
            part.getValidPrimaryCandidates(candidates);
        }
        if (this.slot === slot) {
            candidates.push(this);
        }
        return candidates;
    }

    attachTo(host) {
        host.attachPart(this);
        for (let part of this.dependentParts) part.attachTo(host);
    }

    onAttach(host) {
        super.onAttach(host);

        GetAttacksEvent.register(host, (event) => this.handleGetAttacksEvent(event));
    }

    doesAttack() {
        if (this.isPrimary) return true;
        if (this.dismembered) return false;
        return this.getMeleeWeapon() !== null;
    }

    getMeleeWeapon() {
        if (this._cachedWeapon.dirty) this.cacheMeleeWeapon();
        return this._cachedWeapon.weapon;
    }

    cacheMeleeWeapon() {
        this._cachedWeapon.dirty = false;
        let projectedWeapon = null;
        if (this.item && this.item.hasTag('MeleeWeapon')) {
            projectedWeapon = this.item.getPart('MeleeWeapon');
        }
        else if (this.defaultBehavior) {
            projectedWeapon = this.defaultBehavior.getPart('MeleeWeapon');
        }
        this._cachedWeapon.weapon = projectedWeapon;
    }

    shouldEquipAsDefaultBehavior(item) {
        if (!item.hasTag('NaturalGear')) return false;
        if (item.hasPart('Armor') && !item.hasTag('AllowArmorDefaultBehavior')) return false;
        if (item.hasPart('Shield') && !item.hasTag('AllowShieldDefaultBehavior')) return false;
        if (item.hasTag('NoDefaultBehavior')) return false;
        return true;
    }

    equip(item) {
        if (!this.canUnequip()) return false;
        this._cachedWeapon.dirty = true;
        if (this.shouldEquipAsDefaultBehavior(item)) {
            this.defaultBehavior = item;
        }
        let slots = item.usesSlots.split(',');
        let candidates = this.host.anatomy.getEquipCandidates(item, this);
        let equippers = [];
        let addedThis = false;
        for (let slot of slots) {
            if (slot === this.slot && !addedThis) { equippers.push(this); addedThis = true; continue; }
            let bestMatch;
            for (let candidate of candidates) {
                if (candidate.slot === slot && candidate.item === null) { bestMatch = candidate; break; }
                else if (candidate.slot === slot && candidate.canUnequip()) { bestMatch = candidate; }
            }
            if (!bestMatch) {
                throw `Missing slot ${slot} to equip ${item.name}.`;
            }
            equippers.push(bestMatch);
        }
        for (let equipper of equippers) {
            equipper.item = item;
        }

        this.host.anatomy.recheckEquipmentList(this);
        return true;
    }

    canUnequip() {
        if (this.item === null) return true;
        if (this.item.hasTag('NaturalGear')) return false;
        return true;
    }

    unequip() {
        if (this.item === null) return true;
        if (this.item.hasTag('NaturalGear')) return false;
        this.item = null;
        this.host.anatomy.recheckEquipmentList(this);
        return true;
    }

    getOffhandChance(actualPart = null) {
        if (actualPart === null) return this.getOffhandChance(this.host.anatomy.getPartForOffhandChance(this));

        let evt = new OffhandChanceEvent(actualPart.isExtrinsic ? -7 : 0);
        if (!actualPart.item) return actualPart.host.fire(evt).chance;
        return actualPart.item.fire(evt).chance;
    }

    handleGetAttacksEvent(event) {
        if (!this.host.anatomy.amFirstEquipped(this)) return;
        let weapon = this.getMeleeWeapon();
        if (weapon === null && !this.isPrimary) return;

        if (this.isPrimary && weapon === null) weapon = MeleeWeapon.default();

        let attack = new Attack(this.host, weapon, this, this.attackName());
        attack.activationChance = this.isPrimary ? 1 : this.getOffhandChance();;

        let attacks = this.host.fire(new GetAttackCountEvent(attack, this.isPrimary)).attacks;
        event.attacks = event.attacks.concat(attacks);
    }

    attackName(modifier = '') {
        let prefix = this.isPrimary ? 'Primary Hand ' : 'Offhand ';
        let itemName = this.item !== null ? this.item.name : this.defaultBehavior ? this.defaultBehavior.name : this.name;
        return `${prefix}${modifier} Attack (${itemName}) - ${this.name}`;
    }

    // Standard human limbs
    static body = (name = 'Body') => new BodyPart(name, 'Body', null, CYBERNETIC_SLOT.BODY);
    static back = (name = 'Back') => new BodyPart(name, 'Back', null, CYBERNETIC_SLOT.BACK);
    static hands = (name = 'Hands') => new BodyPart(name, 'Hands', null, CYBERNETIC_SLOT.HANDS);
    static feet = (name = 'Feet') => new BodyPart(name, 'Feet', null, CYBERNETIC_SLOT.FEET);
    static head = (name = 'Head') => new BodyPart(name, 'Head', null, CYBERNETIC_SLOT.HEAD);
    static face = (name = 'Face') => new BodyPart(name, 'Face', null, CYBERNETIC_SLOT.FACE);
    static arm = (name = 'Arm') => new BodyPart(name, 'Arm', null, CYBERNETIC_SLOT.ARM);
    static hand = (name = 'Hand') => new BodyPart(name, 'Hand', null);
    static float = (name = 'Floating Nearby') => new BodyPart(name, 'Floating Nearby', null);

    // Mutation limbs
    static horn = (name = 'Horn') => new BodyPart(name, SLOTS.HEADGEAR, null);
    static stinger = (name = 'Stinger') => new BodyPart(name, SLOTS.TAIL, null);

    // Equipment limbs
    static roboArm = (name = 'Robo-Arm') => new BodyPart(name, 'Arm', null);
    static roboHand = (name = 'Robo-Hand') => new BodyPart(name, 'Hand', null, null);
}
part(BodyPart);


export class Anatomy {
    body;
    equipmentList = [];

    static fromPart(part) {
        return Anatomy.humanoid();
        let anatomyType = part.Anatomy;
    }

    attach(host) {
        this.body.attachTo(host);
        host.attachPart(new AttackerPart());
    }

    getLimbArray(currLimb, array = []) {
        array.push(currLimb);
        for (let part of currLimb.dependentParts) {
            this.getLimbArray(part, array);
        }
        return array;
    }

    setDefaultPrimaryLimb() {
        let candidates = this.body.getValidPrimaryCandidates();
        if (candidates.length == 0) {
            this.body.isPrimary = true;
            return;
        }
        let choice = random(0, candidates.length - 1);
        for (let candidate of candidates) candidate.isPrimary = false;
        candidates[choice].isPrimary = true;
    }

    getPartForOffhandChance(part) {
        if (part.isPrimary) return part;
        if (this.equipmentList.length <= 1 || this.equipmentList[0] !== part) return part;
        return this.equipmentList.find(item => item.isPrimary);
    }

    setPrimaryLimb(primaryLimb) {
        let limbArray = this.getLimbArray(this.body);
        for (let limb of limbArray) {
            limb.isPrimary = false;
        }
        primaryLimb.isPrimary = true;
    }

    amFirstEquipped(limb) {
        if (limb.isPrimary) return true;
        if (!limb.item) return true;
        let item = limb.item;
        if (item.slots < 2) return true;
        let limbsEquipping = this.getLimbsEquipping(item);
        if (limbsEquipping.length < 2) return true;
        if (limbsEquipping[0] !== limb || limbsEquipping[1].isPrimary) return false;
    }

    getLimbsEquipping(item) {
        let limbs = this.getLimbArray(this.body);
        return limbs.filter(limb => limb.item === item);
    }

    getEquipCandidates(item, primaryLimb) {
        let limbArray = this.getLimbArray(this.body);
        return limbArray.filter(limb => limb.id !== primaryLimb.id && item.usesSlots.includes(limb.slot));
    }

    recheckEquipmentList(part) {
        let isEquipment = part.doesAttack();
        let newList = [];
        for (let i = 0; i < this.equipmentList.length; i++) {
            let currPart = this.equipmentList[i];
            if (part !== currPart) { newList.push(currPart); continue; }
            if (isEquipment) return;
        }
        if (isEquipment) newList.push(part);
        this.equipmentList = newList;
    }

    static humanoid() {
        let anat = new Anatomy();
        anat.body = BodyPart.body();

        let head = BodyPart.head();
        head.dependentParts.push(BodyPart.face());
        let armLeft = BodyPart.arm('Left Arm');
        let leftHand = BodyPart.hand('Left Hand');
        armLeft.dependentParts.push(leftHand);
        let armRight = BodyPart.arm('Right Arm');
        let rightHand = BodyPart.hand('Right Hand');
        armRight.dependentParts.push(rightHand);

        let back = BodyPart.back();
        let hands = BodyPart.hands();
        let feet = BodyPart.feet();
        let float = BodyPart.float();
        anat.equipmentList.push(leftHand);
        anat.equipmentList.push(rightHand);

        anat.body.dependentParts.push(head, back, armLeft, armRight, hands, feet, float);
        rightHand.defaultBehavior = Item.fist();
        leftHand.defaultBehavior = Item.fist();
        return anat;
    }
}

const ANATOMIES = {
    HUMANOID: Anatomy.humanoid(),
};

export { ANATOMIES };