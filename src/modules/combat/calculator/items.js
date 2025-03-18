
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

class Item {
    name;
    pvBonus;
    pvCap;
    hitBonus;
    damage;
    type;
    mods;
    tier;
    isWeapon;
    hands;

    constructor(name = '', isWeapon = false, pvBonus = 0, pvCap = 0, hitBonus = 0, damage = '1d2', type = 'cudgel', tier = 1, hands = 1) {
        this.name = name;
        this.pvBonus = pvBonus;
        this.pvCap = pvCap;
        this.hitBonus = hitBonus;
        this.damage = damage;
        this.type = type;
        this.tier = tier;
        this.isWeapon = isWeapon;
        this.hands = hands;
    }

    static fist() {
        return new Item('Fist', true, 0, 999);
    }
}

export { Item };