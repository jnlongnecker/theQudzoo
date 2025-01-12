import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./popup.html";
class Popup extends LightningElement {
  constructor(...args) {
    super(...args);
    this.show = false;
  }
  stopProp(event) {
    event.stopPropagation();
  }
  closePopup() {
    this.dispatchEvent(new CustomEvent('close'));
  }
}
_registerDecorators(Popup, {
  publicProps: {
    show: {
      config: 0
    }
  }
});
export default _registerComponent(Popup, {
  tmpl: _tmpl
});