import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./card.html";
class Card extends LightningElement {
  constructor(...args) {
    super(...args);
    this.info = void 0;
  }
}
_registerDecorators(Card, {
  publicProps: {
    info: {
      config: 0
    }
  }
});
export default _registerComponent(Card, {
  tmpl: _tmpl
});