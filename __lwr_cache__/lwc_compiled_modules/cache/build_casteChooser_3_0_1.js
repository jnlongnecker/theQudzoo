import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./casteChooser.html";
import { getCastes } from "c/api";
class CasteChooser extends LightningElement {
  constructor() {
    super();
    this.castes = [];
    this.casteDisplay = [];
    this.starterList = void 0;
    this.sugarInjector = void 0;
    this.mobileSized = false;
    this.fetchCasteInfo();
    window.addEventListener("resize", () => {
      this.calculateLayout();
    });
    this.calculateLayout();
  }
  calculateLayout() {
    this.mobileSized = window.innerWidth <= 1000;
  }
  get caste() {
    return false;
  }
  set caste(caste) {
    if (!caste) return;
    this.setSelectedCaste(caste);
  }
  get mobileLayout() {
    return this.mobileSized;
  }
  get desktopLayout() {
    return !this.mobileSized;
  }
  connectedCallback() {
    this.sugarInjector = this.template.querySelector("c-sugar-injector");
    this.starterList = this.template.querySelector(".starter-list");
  }
  async setSelectedCaste(caste) {
    while (!this.casteDisplay.length > 0) {
      await new Promise(t => setTimeout(t, 100));
    }
    let calling = this.casteDisplay.find(elem => elem.name == caste);
    this.casteDisplay.map(elem => {
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
  callingHovered(event) {
    if (!this.sugarInjector) {
      this.sugarInjector = this.template.querySelector("c-sugar-injector");
    }
    if (!this.starterList) {
      this.starterList = this.template.querySelector(".starter-list");
    }
    let key = event.currentTarget.getAttribute("calling");
    let calling;
    for (let arc of this.castes) {
      calling = arc.castes.find(caste => caste.name == key);
      if (calling) break;
    }
    let startingValues = calling.starters.map(elem => `<li>${this.sugarInjector.highlightText(elem)}</li>`);
    let html = startingValues.reduce((prev, elem) => prev + elem);
    this.starterList.innerHTML = html;
  }
  callingSelected(event) {
    let key = event.currentTarget.getAttribute("calling");
    let calling = this.casteDisplay.find(elem => elem.name == key);
    this.casteDisplay.map(elem => {
      elem.class = "selected";
      if (elem.name != calling.name) elem.class = "";
      return elem;
    });
    this.castes.map(list => list.castes.map(elem => {
      elem.class = "selected";
      if (elem.name != calling.name) elem.class = "";
      return elem;
    }));
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
  async fetchCasteInfo() {
    let casteJson = await getCastes();
    this.castes = casteJson.castes;
    this.buildCasteDisplay();
  }
  buildCasteDisplay() {
    this.casteDisplay = [];
    for (let arc of this.castes) {
      this.casteDisplay.push(arc.castes[0]);
      this.casteDisplay.push(arc.castes[1]);
    }
    for (let arc of this.castes) {
      this.casteDisplay.push(arc.castes[2]);
      this.casteDisplay.push(arc.castes[3]);
    }
  }
}
_registerDecorators(CasteChooser, {
  publicProps: {
    caste: {
      config: 3
    }
  },
  track: {
    castes: 1,
    casteDisplay: 1
  },
  fields: ["starterList", "sugarInjector", "mobileSized"]
});
export default _registerComponent(CasteChooser, {
  tmpl: _tmpl
});