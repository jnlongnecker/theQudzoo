import { LightningElement, api } from "lwc";

export default class TypeaheadOption extends LightningElement {
    _value;

    imageSrc;

    @api
    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;

        if (val.src) {
            this.imageSrc = val.src;
        }
    }

    handleClick() {
        this.dispatchEvent(new CustomEvent('selected', { detail: JSON.parse(JSON.stringify(this.value)) }));
    }
}