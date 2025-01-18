import { LightningElement, api } from "lwc";

export default class Typeahead extends LightningElement {

    _options;
    filteredOptions = [];
    value = '';
    unfocused = true;

    @api placeholder;
    @api name;

    @api
    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value.map((item, idx) => {
            return {
                id: idx,
                item
            };
        });
    }

    get optionsAvailable() {
        return this.filteredOptions.length > 0 && !this.unfocused;
    }

    updateFilter(event) {
        this.value = event.target.value;
        let metaValue = this.value.toLowerCase();
        this.filteredOptions = this.options.filter(option => {
            let primaryHit = option.item.primary.includes(this.value);
            let secondaryHit = option.item.secondary.includes(this.value);
            let metaHit = option.item.metadata.includes(metaValue);
            return primaryHit || secondaryHit || metaHit;
        });
    }

    handleSelection(event) {
        this.value = event.detail.primary;
        this.unfocused = true;
        this.dispatchEvent(new CustomEvent('selected', { detail: event.detail }));
    }

    handleFocus() {
        this.unfocused = false;
    }

    handleBlur() {
        setTimeout(() => this.unfocused = true, 300);
    }
}