import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./articleCard.html";
class ArticleCard extends LightningElement {
  constructor(...args) {
    super(...args);
    this.info = void 0;
  }
}
_registerDecorators(ArticleCard, {
  publicProps: {
    info: {
      config: 0
    }
  }
});
export default _registerComponent(ArticleCard, {
  tmpl: _tmpl
});