import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./typeahead.html";
class Typeahead extends LightningElement {
  constructor(...args) {
    super(...args);
    this._options = void 0;
    this.filteredOptions = [];
    this.value = '';
    this.unfocused = true;
    this.placeholder = void 0;
    this.name = void 0;
  }
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
    this.dispatchEvent(new CustomEvent('selected', {
      detail: event.detail
    }));
  }
  handleFocus() {
    this.unfocused = false;
  }
  handleBlur() {
    setTimeout(() => this.unfocused = true, 300);
  }
}
_registerDecorators(Typeahead, {
  publicProps: {
    placeholder: {
      config: 0
    },
    name: {
      config: 0
    },
    options: {
      config: 3
    }
  },
  fields: ["_options", "filteredOptions", "value", "unfocused"]
});
export default _registerComponent(Typeahead, {
  tmpl: _tmpl
});