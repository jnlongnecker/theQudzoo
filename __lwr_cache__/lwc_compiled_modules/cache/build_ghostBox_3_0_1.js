import _tmpl from "./ghostBox.html";
import { registerComponent as _registerComponent, LightningElement } from "lwc";
class GhostBox extends LightningElement {}
export default _registerComponent(GhostBox, {
  tmpl: _tmpl
});