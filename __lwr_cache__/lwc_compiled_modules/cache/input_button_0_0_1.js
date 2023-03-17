import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./button.html";
class Button extends LightningElement {
  constructor(...args) {
    super(...args);
    this.title = void 0;
    this.size = "";
    this.variant = "";
    this.animation = "";
    this.type = "";
  }
  get buttonClass() {
    return `${this.animation} ${this.size} ${this.variant}`.trim();
  }
}
_registerDecorators(Button, {
  publicProps: {
    title: {
      config: 0
    },
    size: {
      config: 0
    },
    variant: {
      config: 0
    },
    animation: {
      config: 0
    },
    type: {
      config: 0
    }
  }
});
export default _registerComponent(Button, {
  tmpl: _tmpl
});