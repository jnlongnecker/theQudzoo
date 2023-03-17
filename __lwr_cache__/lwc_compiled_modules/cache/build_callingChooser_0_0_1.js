import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./callingChooser.html";
import { getCallings } from "c/api";
class CallingChooser extends LightningElement {
  get calling() {
    return false;
  }
  set calling(c) {
    if (!c) return;
    this.setSelectedCalling(c);
  }
  constructor() {
    super();
    this.callings = [];
    this.starterList = void 0;
    this.sugarInjector = void 0;
    this.fetchCallingInfo();
  }
  connectedCallback() {
    this.sugarInjector = this.template.querySelector("c-sugar-injector");
    this.starterList = this.template.querySelector(".starter-list");
  }
  callingHovered(event) {
    if (!this.sugarInjector) {
      this.sugarInjector = this.template.querySelector("c-sugar-injector");
    }
    if (!this.starterList) {
      this.starterList = this.template.querySelector(".starter-list");
    }
    let key = event.currentTarget.getAttribute("calling");
    let calling = this.callings.find(elem => elem.name == key);
    let startingValues = calling.starters.map(elem => `<li>${this.sugarInjector.highlightText(elem)}</li>`);
    let html = startingValues.reduce((prev, elem) => prev + elem);
    this.starterList.innerHTML = html;
  }
  callingSelected(event) {
    let key = event.currentTarget.getAttribute("calling");
    let calling = this.callings.find(elem => elem.name == key);
    this.callings.map(elem => {
      elem.class = "selected";
      if (elem.name != calling.name) elem.class = "";
      return elem;
    });
    const payload = {
      id: "calling info",
      callingName: calling.name,
      attributeModifiers: calling.modifiers
    };
    let evt = new CustomEvent("callingselected", {
      detail: payload
    });
    this.dispatchEvent(evt);
  }
  async setSelectedCalling(clng) {
    while (!this.callings.length > 0) {
      await new Promise(t => setTimeout(t, 100));
    }
    let calling = this.callings.find(elem => elem.name == clng);
    this.callings.map(elem => {
      elem.class = "selected";
      if (elem.name != calling.name) elem.class = "";
      return elem;
    });
    const payload = {
      id: "calling info",
      callingName: calling.name,
      attributeModifiers: calling.modifiers
    };
    let evt = new CustomEvent("callingselected", {
      detail: payload
    });
    this.dispatchEvent(evt);
  }
  async fetchCallingInfo() {
    let callingJson = await getCallings();
    this.callings = callingJson.callings;
  }
}
_registerDecorators(CallingChooser, {
  publicProps: {
    calling: {
      config: 3
    }
  },
  track: {
    callings: 1
  },
  fields: ["starterList", "sugarInjector"]
});
export default _registerComponent(CallingChooser, {
  tmpl: _tmpl
});