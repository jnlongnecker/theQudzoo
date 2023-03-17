import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./switch.html";
class Switch extends LightningElement {
  constructor(...args) {
    super(...args);
    this.checked = false;
  }
  changeCheck() {
    this.checked = !this.checked;
  }
}
_registerDecorators(Switch, {
  publicProps: {
    checked: {
      config: 0
    }
  }
});
export default _registerComponent(Switch, {
  tmpl: _tmpl
});