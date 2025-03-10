import { api, LightningElement } from "lwc";
import { getModifier } from "combat/calculator";

export default class StatSpread extends LightningElement {

    _creature;
    attributes = [];
    stats = [];
    _statObj;
    @api isPlayer = false;

    @api
    get creature() {
        return this._creature;
    }

    set creature(value) {
        this._creature = value;
        this._statObj = value.stats;
        this.attributes = [
            {
                id: 1,
                name: 'STR',
                class: 'strength attribute-container',
                total: value.stats.Strength.total,
            }, {
                id: 2,
                name: 'AGI',
                class: 'agility attribute-container',
                total: value.stats.Agility.total,
            }, {
                id: 3,
                name: 'TOU',
                class: 'toughness attribute-container',
                total: value.stats.Toughness.total,
            }, {
                id: 4,
                name: 'INT',
                class: 'intelligence attribute-container',
                total: value.stats.Intelligence.total,
            }, {
                id: 5,
                name: 'WIL',
                class: 'willpower attribute-container',
                total: value.stats.Willpower.total,
            }, {
                id: 6,
                name: 'EGO',
                class: 'ego attribute-container',
                total: value.stats.Ego.total,
            },
        ];
        this.stats = [
            {
                id: 2,
                name: 'DV',
                class: 'attribute-container',
                total: value.stats.DV.value
            },
            {
                id: 3,
                name: 'AV',
                class: 'attribute-container',
                total: value.stats.AV.value
            },
            {
                id: 1,
                name: 'QN',
                class: 'attribute-container',
                total: value.stats.Quickness.value
            },
            {
                id: 4,
                name: 'MA',
                class: 'attribute-container',
                total: value.stats.MA.value
            },
        ];
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