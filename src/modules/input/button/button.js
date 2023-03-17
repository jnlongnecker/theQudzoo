import { LightningElement, api } from "lwc";

export default class Button extends LightningElement {

    @api
    title;

    @api
    size = "";

    @api
    variant = "";

    @api
    animation = "";

    @api
    type = "";

    get buttonClass() {
        return (`${this.animation} ${this.size} ${this.variant}`).trim();
    }
}