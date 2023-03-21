import { api, LightningElement } from "lwc";

export default class Search extends LightningElement {

    @api
    placeholder;

    @api
    value;

    inputElem;

    clearInput() {
        if (!this.inputElem) {
            this.inputElem = this.template.querySelector("input");
        }
        this.inputElem.value = '';
    }

    updateValue(event) {
        if (!this.inputElem) {
            this.inputElem = this.template.querySelector("input");
        }
        this.value = this.inputElem.value;
        this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
    }
}