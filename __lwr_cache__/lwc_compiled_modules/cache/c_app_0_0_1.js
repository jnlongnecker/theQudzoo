import _tmpl from "./app.html";
import { registerComponent as _registerComponent, LightningElement } from "lwc";
class App extends LightningElement {}
export default _registerComponent(App, {
  tmpl: _tmpl
});