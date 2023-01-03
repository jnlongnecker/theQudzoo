import _tmpl from "./header.html";
import { registerComponent as _registerComponent, LightningElement } from "lwc";
class Header extends LightningElement {}
export default _registerComponent(Header, {
  tmpl: _tmpl
});