import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./search.html";
class Search extends LightningElement {
  constructor(...args) {
    super(...args);
    this.placeholder = void 0;
    this.value = void 0;
    this.inputElem = void 0;
  }
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
    this.dispatchEvent(new CustomEvent('change', {
      detail: this.value
    }));
  }
}
_registerDecorators(Search, {
  publicProps: {
    placeholder: {
      config: 0
    },
    value: {
      config: 0
    }
  },
  fields: ["inputElem"]
});
export default _registerComponent(Search, {
  tmpl: _tmpl
});