import _tmpl from "./app.html";
import { registerComponent as _registerComponent, LightningElement } from "lwc";
class HelloWorldApp extends LightningElement {}
export default _registerComponent(HelloWorldApp, {
  tmpl: _tmpl
});