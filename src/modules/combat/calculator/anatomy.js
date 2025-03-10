const SLOTS = {
    HEADGEAR: 0,
    BODY: 1,
    FOOTWEAR: 2,
    HANDWEAR: 3,
    HAND: 4,
    ARMGEAR: 5,
    BACKWEAR: 6,
    FACE: 7,
    TAIL: 8
};


class Limb {
    name;
    slot;
    offhand;
    item;
    multiweaponAffected;

    constructor(name, slot, offhand, item, multiweaponAffected) {
        this.name = name;
        this.slot = slot;
        this.offhand = offhand;
        this.item = item;
        this.multiweaponAffected = multiweaponAffected;
    }

    static head = (name = 'Head') => new Limb(name, SLOTS.HEADGEAR, 0.0, null, false);
    static face = (name = 'Face') => new Limb(name, SLOTS.FACE, 0.0, null, true);
    static body = (name = 'Body') => new Limb(name, SLOTS.BODY, 0.0, null, false);
    static back = (name = 'Back') => new Limb(name, SLOTS.BACKWEAR, 0.0, null, false);
    static arm = (name = 'Arm') => new Limb(name, SLOTS.ARMGEAR, 0.0, null, true);
    static hand = (name = 'Hand') => new Limb(name, SLOTS.HAND, 0.15, null, true);
    static hands = (name = 'Hands') => new Limb(name, SLOTS.HANDWEAR, 0.0, null, false);
    static feet = (name = 'Feet') => new Limb(name, SLOTS.FOOTWEAR, 0.0, null, false);
    static horn = (name = 'Horn') => new Limb(name, SLOTS.HEADGEAR, 0.2, null, false);
    static stinger = (name = 'Stinger') => new Limb(name, SLOTS.TAIL, 0.2, null, false);
    static roboHand = (name = 'Robo-Hand') => new Limb(name, SLOTS.HAND, 0.08, null, false);
}

const ANATOMIES = {
    HUMANOID: [
        Limb.head(),
        Limb.face(),
        Limb.body(),
        Limb.back(),
        Limb.arm('Right Arm'),
        Limb.arm('Left Arm'),
        Limb.hand('Right Hand'),
        Limb.hand('Left Hand'),
        Limb.hands(),
        Limb.feet()
    ]
};

export { ANATOMIES };