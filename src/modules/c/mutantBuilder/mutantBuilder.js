import { api, LightningElement } from "lwc";

export default class MutantBuilder extends LightningElement {
    scrollingContainer;

    callingModifiers;

    buildPayload = {
        genotype: "Mutant",
        subtype: "Acolyte",
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
    }

    startBuild;

    @api
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

    connectedCallback() {
        let scrollingContainer = this.template.querySelector(".scrolling-banner");
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
        this.callingModifiers = callingDetails.attributeModifiers

        const payload = JSON.parse(JSON.stringify(this.buildPayload));
        let updateEvent = new CustomEvent("buildupdated", { detail: payload });
        this.dispatchEvent(updateEvent);
    }

    handleAttributesChosen(event) {
        let attributeDetails = event.detail;
        this.buildPayload.pointSpread = attributeDetails.attributes;
        this.buildPayload.apSpent = attributeDetails.apSpent;

        const payload = JSON.parse(JSON.stringify(this.buildPayload));
        let updateEvent = new CustomEvent("buildupdated", { detail: payload });
        this.dispatchEvent(updateEvent);
    }

    handleMutationSelection(event) {
        let mutDetails = event.detail;
        this.buildPayload.mpRemaining = mutDetails.mpRemaining;
        this.buildPayload.mutations = mutDetails.mutations;

        const payload = JSON.parse(JSON.stringify(this.buildPayload));
        let updateEvent = new CustomEvent("buildupdated", { detail: payload });
        this.dispatchEvent(updateEvent);
    }
}