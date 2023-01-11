import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./header.html";
class Header extends LightningElement {
  constructor(...args) {
    super(...args);
    this.links = [{
      label: "A-F-F-I-N-E's Advice",
      link: "/advice"
    }];
    this.mobileSized = false;
  }
  get useMobileLayout() {
    return this.mobileSized;
  }
  get useDesktopLayout() {
    return !this.mobileSized;
  }
  connectedCallback() {
    window.addEventListener("resize", () => {
      this.calculateHeaderLayout();
    });
    this.calculateHeaderLayout();
  }
  calculateHeaderLayout() {
    this.mobileSized = window.innerWidth <= 900;
  }
  activateHamburgerMenu(event) {
    let status = event.currentTarget.getAttribute("status");
    if (status === "open") {
      event.currentTarget.setAttribute("status", "closed");
      return;
    }
    event.currentTarget.setAttribute("status", "open");
  }
}
_registerDecorators(Header, {
  fields: ["links", "mobileSized"]
});
export default _registerComponent(Header, {
  tmpl: _tmpl
});