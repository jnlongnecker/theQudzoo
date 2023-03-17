import { LightningElement, api } from "lwc";

export default class Text extends LightningElement {

    @api
    value;

    @api
    variant;

    get inputClass() {
        return (`${this.variant}`).trim();
    }

    updateValue(event) {
        this.value = event.target.value;
    }
}