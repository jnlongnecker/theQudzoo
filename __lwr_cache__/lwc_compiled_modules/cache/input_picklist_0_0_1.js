import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./picklist.html";
class Picklist extends LightningElement {
  constructor(...args) {
    super(...args);
    this.choices = [];
    this.chosen = '';
    this.choosing = false;
  }
  get options() {
    return this.choices;
  }
  set options(val) {
    if (val instanceof Array) {
      this.choices = val;
    } else {
      this.choices = val.split(',');
    }
    this.chosen = this.choices[0];
  }
  startChoosing(event) {
    if (event.key && event.key != 'Enter') return;
    this.choosing = !this.choosing;
  }
  makeChoice(event) {
    if (event.key && event.key != 'Enter') return;
    this.choosing = false;
    this.chosen = event.target.innerText;
    this.dispatchEvent(new CustomEvent('change', {
      detail: this.chosen
    }));
  }
}
_registerDecorators(Picklist, {
  publicProps: {
    options: {
      config: 3
    }
  },
  fields: ["choices", "chosen", "choosing"]
});
export default _registerComponent(Picklist, {
  tmpl: _tmpl
});