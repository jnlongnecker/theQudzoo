import { api, LightningElement } from "lwc";
import tagNames from 'build/tagNames';

export default class Tag extends LightningElement {

    @api
    variant = '';

    @api
    label;

    @api
    static = false;

    @api
    activated = false;

    get tagClass() {
        let ret = '' + this.variant;
        if (this.static) ret += ' static';
        if (!this.activated) ret += ' deactivated';
        return ret;
    }

    connectedCallback() {
        this.variant = tagNames[this.label];
    }

    activate() {
        if (this.static) return;
        this.activated = !this.activated;
        this.dispatchEvent(new CustomEvent('click', { detail: { label: this.label, activated: this.activated } }));
    }
}