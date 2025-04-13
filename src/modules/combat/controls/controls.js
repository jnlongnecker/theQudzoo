import { LightningElement, api } from "lwc";
import { register } from "c/componentEvents";

export default class Controls extends LightningElement {

    showCombat;
    showBuilder = true;

    _creature;
    @api mode;
    @api enemy;

    @api get creature() {
        return this._creature;
    }

    set creature(value) {
        if (!value) return;
        this._creature = value;
    }

    constructor() {
        super();

        register('refreshplayerevent', (e) => { this.creature = e.detail });
        register('refreshenemyevent', (e) => { this.enemy = e.detail });
    }

    changeTab(event) {
        let target = event.target;
        for (let child of event.currentTarget.children) {
            child.classList.remove('selected');
        }
        target.classList.add('selected');
        this.showBuilder = target.innerHTML == 'Character Builder';
        this.showCombat = target.innerHTML == 'Combat Builder';
    }
}