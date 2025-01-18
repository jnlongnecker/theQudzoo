import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./switch.html";
class Switch extends LightningElement {
  constructor(...args) {
    super(...args);
    this.internalValue = false;
    this.left = '';
    this.right = '';
    this.uncheckcolor = '';
    this.checkcolor = '';
  }
  get checked() {
    return this.internalValue;
  }
  set checked(val) {
    this.internalValue = val;
  }
  get checkboxClass() {
    return 'slider-dot ' + this.checkedClass;
  }
  get switchClass() {
    return 'switch ' + this.checkedClass;
  }
  get checkedClass() {
    return this.internalValue ? 'checked' : 'unchecked';
  }
  get leftColor() {
    return this.uncheckcolor ? this.uncheckcolor + '-left' : '';
  }
  get rightColor() {
    return this.checkcolor ? this.checkcolor + '-right' : '';
  }
  get containerClass() {
    return `container ${this.leftColor} ${this.rightColor}`.trim();
  }
  notifyChange() {
    this.internalValue = !this.internalValue;
    this.dispatchEvent(new CustomEvent('switch', {
      detail: this.internalValue
    }));
  }
}
_registerDecorators(Switch, {
  publicProps: {
    left: {
      config: 0
    },
    right: {
      config: 0
    },
    uncheckcolor: {
      config: 0
    },
    checkcolor: {
      config: 0
    },
    checked: {
      config: 3
    }
  },
  fields: ["internalValue"]
});
export default _registerComponent(Switch, {
  tmpl: _tmpl
});