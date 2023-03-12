import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./mutantBuilder.html";
class MutantBuilder extends LightningElement {
  constructor(...args) {
    super(...args);
    this.scrollingContainer = void 0;
    this.callingModifiers = void 0;
    this.buildPayload = {
      genotype: "Mutant",
      subtype: "Apostle",
      mpRemaining: "12",
      mutations: [],
      pointSpread: {
        Agility: 0,
        Ego: 0,
        Intelligence: 0,
        Strength: 0,
        Toughness: 0,
        Willpower: 0
      },
      apSpent: 0
    };
    this.startBuild = void 0;
  }
  get build() {
    return this.startBuild;
  }
  set build(b) {
    this.startBuild = b;
  }
  get calling() {
    if (!this.startBuild) return;
    return this.startBuild.subtype;
  }
  get mutations() {
    if (!this.startBuild) return;
    return this.startBuild.selections;
  }
  get attributes() {
    if (!this.startBuild) return;
    return this.startBuild.attributes;
  }
  get pointsUsed() {
    if (!this.startBuild) return;
    return this.startBuild.pointsUsed;
  }
  get mpRemaining() {
    if (!this.startBuild) return;
    return this.startBuild.mpRemaining;
  }
  advance() {
    let currOffset = this.template.host.style.getPropertyValue("--offset");
    currOffset = Number(currOffset);
    let newOffset = currOffset + 1 < 3 ? currOffset + 1 : currOffset;
    this.template.host.style.setProperty("--offset", newOffset);
  }
  backtrack() {
    let currOffset = this.template.host.style.getPropertyValue("--offset");
    currOffset = Number(currOffset);
    let newOffset = currOffset - 1 >= 0 ? currOffset - 1 : currOffset;
    this.template.host.style.setProperty("--offset", newOffset);
  }
  handleCallingSelection(event) {
    let callingDetails = event.detail;
    this.buildPayload.subtype = callingDetails.callingName;
    this.callingModifiers = callingDetails.attributeModifiers;
    const payload = JSON.parse(JSON.stringify(this.buildPayload));
    let updateEvent = new CustomEvent("buildupdated", {
      detail: payload
    });
    this.dispatchEvent(updateEvent);
  }
  handleAttributesChosen(event) {
    let attributeDetails = event.detail;
    this.buildPayload.pointSpread = attributeDetails.attributes;
    this.buildPayload.apSpent = attributeDetails.apSpent;
    const payload = JSON.parse(JSON.stringify(this.buildPayload));
    let updateEvent = new CustomEvent("buildupdated", {
      detail: payload
    });
    this.dispatchEvent(updateEvent);
  }
  handleMutationSelection(event) {
    let mutDetails = event.detail;
    this.buildPayload.mpRemaining = mutDetails.mpRemaining;
    this.buildPayload.mutations = mutDetails.mutations;
    const payload = JSON.parse(JSON.stringify(this.buildPayload));
    let updateEvent = new CustomEvent("buildupdated", {
      detail: payload
    });
    this.dispatchEvent(updateEvent);
  }
}
_registerDecorators(MutantBuilder, {
  publicProps: {
    build: {
      config: 3
    }
  },
  fields: ["scrollingContainer", "callingModifiers", "buildPayload", "startBuild"]
});
export default _registerComponent(MutantBuilder, {
  tmpl: _tmpl
});