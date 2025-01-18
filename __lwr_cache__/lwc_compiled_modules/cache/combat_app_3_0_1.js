import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./app.html";
class App extends LightningElement {
  constructor(...args) {
    super(...args);
    this.creature = void 0;
  }
  updateCreature(event) {
    this.creature = JSON.parse(JSON.stringify(event.detail));
  }
}
_registerDecorators(App, {
  fields: ["creature"]
});
export default _registerComponent(App, {
  tmpl: _tmpl
});