import { LightningElement, api } from "lwc";

export default class Switch extends LightningElement {

    internalValue = false;

    @api
    left = '';

    @api
    right = '';

    @api
    uncheckcolor = '';

    @api
    checkcolor = '';

    @api
    get checked() {
        return this.internalValue;
    }

    set checked(val) {
        this.internalValue = val;
    }

    get leftColor() {
        return this.uncheckcolor ? this.uncheckcolor + '-left' : '';
    }

    get rightColor() {
        return this.checkcolor ? this.checkcolor + '-right' : '';
    }

    get containerClass() {
        return (`container ${this.leftColor} ${this.rightColor}`).trim();
    }

    notifyChange() {
        this.internalValue = !this.internalValue;

        this.dispatchEvent(new CustomEvent('switch', { detail: this.internalValue }));
    }
}