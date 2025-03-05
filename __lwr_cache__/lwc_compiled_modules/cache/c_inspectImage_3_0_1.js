import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./inspectImage.html";
class InspectImage extends LightningElement {
  constructor(...args) {
    super(...args);
    this.imageLink = void 0;
    this.activated = false;
  }
  connectedCallback() {
    let contentImages = document.querySelectorAll("*:not(.injected) img");
    for (let image of contentImages) {
      image.addEventListener("click", event => {
        this.imageLink = event.currentTarget.getAttribute("src");
        this.activated = true;
      });
    }
  }
  deactivate() {
    this.imageLink = "";
    this.activated = false;
  }
}
_registerDecorators(InspectImage, {
  fields: ["imageLink", "activated"]
});
export default _registerComponent(InspectImage, {
  tmpl: _tmpl
});