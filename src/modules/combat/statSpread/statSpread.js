import { api, LightningElement } from "lwc";
import { getModifier } from "combat/calculator";

export default class StatSpread extends LightningElement {

    _creature;
    attributes = [];
    stats = [];
    @api isPlayer = false;

    @api
    get creature() {
        return this._creature;
    }

    set creature(value) {
        this._creature = value;
        let statObj = value.stats;
        this.attributes = [
            {
                id: 1,
                name: 'STR',
                class: 'strength attribute-container',
                total: statObj.Strength.total,
            }, {
                id: 2,
                name: 'AGI',
                class: 'agility attribute-container',
                total: statObj.Agility.total,
            }, {
                id: 3,
                name: 'TOU',
                class: 'toughness attribute-container',
                total: statObj.Toughness.total,
            }, {
                id: 4,
                name: 'INT',
                class: 'intelligence attribute-container',
                total: statObj.Intelligence.total,
            }, {
                id: 5,
                name: 'WIL',
                class: 'willpower attribute-container',
                total: statObj.Willpower.total,
            }, {
                id: 6,
                name: 'EGO',
                class: 'ego attribute-container',
                total: statObj.Ego.total,
            },
        ];
        this.stats = [
            {
                id: 2,
                name: 'DV',
                class: 'attribute-container',
                total: statObj.DV.value
            },
            {
                id: 3,
                name: 'AV',
                class: 'attribute-container',
                total: statObj.AV.value
            },
            {
                id: 1,
                name: 'QN',
                class: 'attribute-container',
                total: statObj.Quickness.value
            },
            {
                id: 4,
                name: 'MA',
                class: 'attribute-container',
                total: statObj.MA.value
            },
        ];
    }

    @api refresh(newCreature) {
        this.creature = newCreature;
    }

    calculateAppliedStats(value) {
        let willMod = getModifier(value.attributes.willpower);
        let toughMod = getModifier(value.attributes.toughness);
        let agilMod = getModifier(value.attributes.agility);
        let temp = JSON.parse(JSON.stringify(value));
        temp.hp = value.attributes.toughness + (value.level - 1) * Math.max(toughMod + 2, 0);
        temp.ma = 4 + willMod;
        temp.dv = 6 + agilMod;

        return temp;
    }
}