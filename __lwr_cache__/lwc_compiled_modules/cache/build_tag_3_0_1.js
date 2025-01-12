import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./tag.html";
import tagNames from 'build/tagNames';
class Tag extends LightningElement {
  constructor(...args) {
    super(...args);
    this.variant = '';
    this.label = void 0;
    this.static = false;
    this.activated = false;
  }
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
    this.dispatchEvent(new CustomEvent('click', {
      detail: {
        label: this.label,
        activated: this.activated
      }
    }));
  }
}
_registerDecorators(Tag, {
  publicProps: {
    variant: {
      config: 0
    },
    label: {
      config: 0
    },
    "static": {
      config: 0
    },
    activated: {
      config: 0
    }
  }
});
export default _registerComponent(Tag, {
  tmpl: _tmpl
});