import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./cyberneticChooser.html";
class CyberneticChooser extends LightningElement {
  get cybs() {
    return [];
  }
  set cybs(cybs) {
    if (!cybs || cybs.length == 0) return;
    let target = cybs[0];
    this.setSelectedCybernetic(target);
  }
  get cybernetics() {
    return this.rawCybernetics.filter(cyb => !cyb.creationConditional || !(cyb.creationConditional && cyb.name != this.enabled));
  }
  set cybernetics(c) {
    this.rawCybernetics = c;
  }
  get blurbClass() {
    if (window.innerWidth > 1200) return "blurb";
    return this.showBlurb ? "blurb show-blurb" : "blurb";
  }
  constructor() {
    super();
    this.rawCybernetics = [];
    this.enabled = void 0;
    this.points = 12;
    this.selectedBlurb = void 0;
    this.selectedLevelBlurb = void 0;
    this.selectedSrc = void 0;
    this.selectedCybText = "No Cybernetic Selected";
    this.defectCapped = true;
    this.showBlurb = false;
    this.selectedCybernetic = [];
    this.cyberneticPayload = {
      cybernetics: []
    };
    this.selectingVariant = false;
    this.variantChoices = [];
    this.fetchMutations();
  }
  async setSelectedCybernetic(cyb) {
    while (!this.rawCybernetics.length > 0) {
      await new Promise(t => setTimeout(t, 500));
    }
    let clickedCyb = this.rawCybernetics.find(item => {
      let sameName = item.id == cyb.Cybernetic;
      let sameVar = item.variant == cyb.Variant;
      return sameName && sameVar;
    });
    for (let cyb of this.rawCybernetics) {
      cyb.marker = " ";
      cyb.numSelected = 0;
      cyb.class = "selectable";
    }
    clickedCyb.numSelected = 1;
    clickedCyb.marker = "■";
    clickedCyb.class += " chosen";
    this.selectedCybernetic = [];
    this.selectedCybernetic.push(clickedCyb);
    this.sendPayload();
  }
  async fetchMutations() {
    let req = new Request("/api/cybernetics");
    const response = await fetch(req);
    if (!response.ok) {
      console.error(await response.text());
      return;
    }
    let mutJson = await response.json();
    let rawList = mutJson.cybernetics;
    this.rawCybernetics = [];
    for (let cyb of rawList) {
      let avail = cyb.creationAvailable;
      if (!avail) continue;
      let cybCopy = JSON.parse(JSON.stringify(cyb));
      cybCopy.variant = cyb.slots[0];
      cybCopy.variantIndex = 0;
      cybCopy.creationConditional = cyb.creationConditional;
      cybCopy.id = cyb.id;
      this.rawCybernetics.push(cybCopy);
      for (let i = 1; i < cyb.slots.length; i++) {
        let variation = cyb.slots[i];
        let cybCopy = JSON.parse(JSON.stringify(cyb));
        cybCopy.variant = variation;
        cybCopy.variantIndex = i;
        this.rawCybernetics.push(cybCopy);
      }
    }
    this.rawCybernetics.map(item => {
      item.class = "selectable";
      item.hover = true;
      item.marker = " ";
      item.numSelected = 0;
      item.key = item.name + item.variant;
    });
  }
  getMutation(mutationNode) {
    let mutName = mutationNode.getAttribute("name");
    return this.rawCybernetics.find(mut => mut.name == mutName);
  }
  mutHover(event) {
    if (!this.selectedBlurb) {
      this.selectedBlurb = this.template.querySelector(".blurbText");
    }
    if (!this.selectedLevelBlurb) {
      this.selectedLevelBlurb = this.template.querySelector(".levelBlurb");
    }
    if (!this.sugarInjector) {
      this.sugarInjector = this.template.querySelector("c-sugar-injector");
    }
    let target = event.currentTarget;
    let hoveredCyb = this.rawCybernetics.find(item => {
      let sameName = item.name == target.getAttribute("name");
      let sameVar = item.variant == target.getAttribute("variant");
      return sameName && sameVar;
    });
    this.selectedCybText = hoveredCyb.name;
    this.selectedSrc = hoveredCyb.src;
    this.selectedBlurb.innerHTML = this.highlight(hoveredCyb.flavorText);
    this.selectedLevelBlurb.innerHTML = this.highlight(hoveredCyb.description);
  }
  mutClick(event) {
    let target = event.currentTarget;
    let clickedCyb = this.rawCybernetics.find(item => {
      let sameName = item.name == target.getAttribute("name");
      let sameVar = item.variant == target.getAttribute("variant");
      return sameName && sameVar;
    });
    for (let cyb of this.rawCybernetics) {
      cyb.marker = " ";
      cyb.numSelected = 0;
      cyb.class = "selectable";
    }
    clickedCyb.numSelected = 1;
    clickedCyb.marker = "■";
    clickedCyb.class += " chosen";
    this.selectedCybernetic = [];
    this.selectedCybernetic.push(clickedCyb);
    this.sendPayload();
  }
  highlight(text) {
    if (!text) return "";
    text = this.sugarInjector.highlightText(text);
    text = text.replace(/\n/g, "<br />");
    return text;
  }
  sendPayload() {
    this.cyberneticPayload.cybernetics = [];
    for (let cyb of this.selectedCybernetic) {
      let cybObj = {
        Count: cyb.numSelected,
        Cybernetic: cyb.id,
        Variant: cyb.id ? cyb.variant : null
      };
      this.cyberneticPayload.cybernetics.push(cybObj);
    }
    let payload = JSON.parse(JSON.stringify(this.cyberneticPayload));
    let evt = new CustomEvent("mutationselected", {
      detail: payload
    });
    this.dispatchEvent(evt);
  }
  resetChanges() {
    if (this.selectedCybernetic.length == 0) return;
    let cyb = this.selectedCybernetic[0];
    cyb.marker = " ";
    cyb.numSelected = 0;
    cyb.class = "selectable";
    this.selectedCybernetic = [];
    this.sendPayload();
  }
  randomizeChanges() {
    this.resetChanges();
    let selection = Math.floor(Math.random() * this.rawCybernetics.length);
    let cyb = this.rawCybernetics[selection];
    cyb.numSelected = 1;
    cyb.marker = "■";
    cyb.class = "selectable chosen";
    this.selectedCybernetic.push(cyb);
    this.sendPayload();
  }
  showInfo(event) {
    event.stopPropagation();
    this.showBlurb = true;
    let target = event.currentTarget;
    let hoveredCyb = this.rawCybernetics.find(item => {
      let sameName = item.name == target.getAttribute("name");
      let sameVar = item.variant == target.getAttribute("variant");
      return sameName && sameVar;
    });
    this.selectedCybText = hoveredCyb.name;
    this.selectedSrc = hoveredCyb.src;
    this.selectedBlurb.innerHTML = this.highlight(hoveredCyb.flavorText);
    this.selectedLevelBlurb.innerHTML = this.highlight(hoveredCyb.description);
  }
  hideBlurb() {
    this.showBlurb = false;
  }
}
_registerDecorators(CyberneticChooser, {
  publicProps: {
    enabled: {
      config: 0
    },
    cybs: {
      config: 3
    }
  },
  track: {
    rawCybernetics: 1
  },
  fields: ["points", "selectedBlurb", "selectedLevelBlurb", "selectedSrc", "selectedCybText", "defectCapped", "showBlurb", "selectedCybernetic", "cyberneticPayload", "selectingVariant", "variantChoices"]
});
export default _registerComponent(CyberneticChooser, {
  tmpl: _tmpl
});