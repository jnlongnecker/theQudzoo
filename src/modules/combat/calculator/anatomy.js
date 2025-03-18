import { Item } from "./items.js";
import { Part } from "./parts.js";
import { AttackCountEvent, OffhandChanceEvent } from "./events.js";
import { Attack, AttackerPart } from "./attacks.js";
import { random } from "./rolls.js";

const SLOTS = {
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
    offhand;
    item;
    multiweaponAffected;
    dependentParts = [];
    isPrimary = false;

    constructor(name, slot, offhand, item, multiweaponAffected, cyberneticSlot) {
        super();
        this.name = name;
        this.slot = slot;
        this.cyberneticSlot = cyberneticSlot;
        this.offhand = offhand;
        this.multiweaponAffected = multiweaponAffected;
        this.item = item ? item : new Item();
    }

    getValidPrimaryCandidates(candidates = []) {
        for (let part of this.dependentParts) {
            part.getValidPrimaryCandidates(candidates);
        }
        if (this.offhand > 0 && this.item && this.item.isWeapon) {
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

        AttackCountEvent.register(host, (event) => this.handleAttackCountAction(event));
    }

    handleAttackCountAction(event) {
        if (this.slot === SLOTS.FLOATING && (!this.item || !this.item.isWeapon)) return;
        let chance = this.isPrimary ? 1 : this.host.fire(new OffhandChanceEvent(this.offhand)).chance;
        if (chance === 0) return;
        let attack = new Attack(this.host, this, this.attackName());
        attack.swfEnabled = this.isPrimary || !this.multiweaponAffected;
        attack.activationChance = chance;

        event.attacks.push(attack);

    }

    attackName() {
        let prefix = this.isPrimary ? 'Primary Hand ' : 'Offhand ';
        return `${prefix} Attack (${this.item.name}) - ${this.name}`;
    }

    static body = (name = 'Body') => new BodyPart(name, SLOTS.BODY, 0.0, null, false);
    static back = (name = 'Back') => new BodyPart(name, SLOTS.BACKWEAR, 0.0, null, false);
    static hands = (name = 'Hands') => new BodyPart(name, SLOTS.HANDWEAR, 0.0, null, false);
    static feet = (name = 'Feet') => new BodyPart(name, SLOTS.FOOTWEAR, 0.0, null, false);
    static horn = (name = 'Horn') => new BodyPart(name, SLOTS.HEADGEAR, 0.2, null, false);
    static stinger = (name = 'Stinger') => new BodyPart(name, SLOTS.TAIL, 0.2, null, false);
    static roboHand = (name = 'Robo-Hand') => new BodyPart(name, SLOTS.HAND, 0.08, null, false);
    static head = (name = 'Head') => new BodyPart(name, SLOTS.HEADGEAR, 0.0, null, false);
    static face = (name = 'Face') => new BodyPart(name, SLOTS.FACE, 0.0, null, true);
    static arm = (name = 'Arm') => new BodyPart(name, SLOTS.ARMGEAR, 0.0, null, true);
    static hand = (name = 'Hand') => new BodyPart(name, SLOTS.HAND, 0.15, Item.fist(), true);
    static float = (name = 'Floating Nearby') => new BodyPart(name, SLOTS.FLOATING, 0.15, null, true);
}

export class Anatomy {
    body;

    attach(host) {
        this.body.attachTo(host);
        host.attachPart(new AttackerPart());
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

    static humanoid() {
        let anat = new Anatomy();
        anat.body = BodyPart.body();

        let head = BodyPart.head();
        head.dependentParts.push(BodyPart.face());
        let armLeft = BodyPart.arm('Left Arm');
        armLeft.dependentParts.push(BodyPart.hand('Left Hand'));
        let armRight = BodyPart.arm('Right Arm');
        armRight.dependentParts.push(BodyPart.hand('Right Hand'));
        let back = BodyPart.back();
        let hands = BodyPart.hands();
        let feet = BodyPart.feet();
        let float = BodyPart.float();

        anat.body.dependentParts.push(head, back, armLeft, armRight, hands, feet, float);
        return anat;
    }
}

const ANATOMIES = {
    HUMANOID: Anatomy.humanoid(),
};

export { ANATOMIES };