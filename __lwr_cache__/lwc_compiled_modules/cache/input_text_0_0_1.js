import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./text.html";
class Text extends LightningElement {
  constructor(...args) {
    super(...args);
    this.value = '';
    this.variant = void 0;
  }
  get inputClass() {
    return `${this.variant}`.trim();
  }
  updateValue(event) {
    this.value = event.target.value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: this.value
    }));
  }
}
_registerDecorators(Text, {
  publicProps: {
    value: {
      config: 0
    },
    variant: {
      config: 0
    }
  }
});
export default _registerComponent(Text, {
  tmpl: _tmpl
});