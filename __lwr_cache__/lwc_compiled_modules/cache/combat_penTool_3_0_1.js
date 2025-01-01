import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./penTool.html";
import { expectedPenetrations } from "combat/calculator";
class PenTool extends LightningElement {
  constructor(...args) {
    super(...args);
    this.result = '--';
    this.av = void 0;
    this.pv = void 0;
    this.pastResults = [];
  }
  updateAV(evt) {
    this.av = Math.max(0, evt.detail);
    this.calculateExpectedPenetrations();
  }
  updatePV(evt) {
    this.pv = evt.detail;
    this.calculateExpectedPenetrations();
  }
  calculateExpectedPenetrations() {
    if (!this.av) return;
    if (!this.pv) return;
    this.result = expectedPenetrations(this.av, this.pv - 4, this.pv - 4);
    this.pastResults.push(this.result);
  }
}
_registerDecorators(PenTool, {
  fields: ["result", "av", "pv", "pastResults"]
});
export default _registerComponent(PenTool, {
  tmpl: _tmpl
});