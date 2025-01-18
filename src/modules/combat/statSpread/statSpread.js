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
        this._creature = this.isPlayer ? this.calculateAppliedStats(value) : value;
        this.attributes = [
            {
                id: 1,
                name: 'STR',
                class: 'strength attribute-container',
                total: this._creature.attributes.strength,
            }, {
                id: 2,
                name: 'AGI',
                class: 'agility attribute-container',
                total: this._creature.attributes.agility,
            }, {
                id: 3,
                name: 'TOU',
                class: 'toughness attribute-container',
                total: this._creature.attributes.toughness,
            }, {
                id: 4,
                name: 'INT',
                class: 'intelligence attribute-container',
                total: this._creature.attributes.intelligence,
            }, {
                id: 5,
                name: 'WIL',
                class: 'willpower attribute-container',
                total: this._creature.attributes.willpower,
            }, {
                id: 6,
                name: 'EGO',
                class: 'ego attribute-container',
                total: this._creature.attributes.ego,
            },
        ];
        this.stats = [
            {
                id: 2,
                name: 'DV',
                class: 'attribute-container',
                total: this._creature.dv
            },
            {
                id: 3,
                name: 'AV',
                class: 'attribute-container',
                total: this._creature.av
            },
            {
                id: 1,
                name: 'QN',
                class: 'attribute-container',
                total: this._creature.qn
            },
            {
                id: 4,
                name: 'MA',
                class: 'attribute-container',
                total: this._creature.ma
            },
        ];
    }

    calculateAppliedStats(value) {
        let willMod = getModifier(value.attributes.willpower);
        let toughMod = getModifier(value.attributes.toughness);
        let agilMod = getModifier(value.attributes.agility);
        let temp = JSON.parse(JSON.stringify(value));
        temp.hp = value.attributes.toughness + (value.level - 1) * (toughMod * 2);
        temp.ma = 4 + willMod;
        temp.dv = 6 + agilMod;

        return temp;
    }
}