import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./details.html";
class Details extends LightningElement {
  constructor(...args) {
    super(...args);
    this.summary = void 0;
  }
}
_registerDecorators(Details, {
  publicProps: {
    summary: {
      config: 0
    }
  }
});
export default _registerComponent(Details, {
  tmpl: _tmpl
});