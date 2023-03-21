import { api, LightningElement } from "lwc";

export default class Picklist extends LightningElement {

    choices = [];

    chosen = '';

    choosing = false;

    @api
    get options() {
        return this.choices;
    }

    set options(val) {
        if (val instanceof Array) {
            this.choices = val;
        }
        else {
            this.choices = val.split(',');
        }
        this.chosen = this.choices[0];
    }

    startChoosing(event) {
        if (event.key && event.key != 'Enter') return;
        this.choosing = !this.choosing;
    }

    makeChoice(event) {
        if (event.key && event.key != 'Enter') return;
        this.choosing = false;
        this.chosen = event.target.innerText;

        this.dispatchEvent(new CustomEvent('change', { detail: this.chosen }));
    }
}