import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./typeaheadOption.html";
class TypeaheadOption extends LightningElement {
  constructor(...args) {
    super(...args);
    this._value = void 0;
    this.imageSrc = void 0;
  }
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
    this.dispatchEvent(new CustomEvent('selected', {
      detail: JSON.parse(JSON.stringify(this.value))
    }));
  }
}
_registerDecorators(TypeaheadOption, {
  publicProps: {
    value: {
      config: 3
    }
  },
  fields: ["_value", "imageSrc"]
});
export default _registerComponent(TypeaheadOption, {
  tmpl: _tmpl
});