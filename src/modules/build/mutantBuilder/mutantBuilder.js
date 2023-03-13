import { api, LightningElement } from "lwc";

export default class MutantBuilder extends LightningElement {
    scrollingContainer;

    callingModifiers;

    buildPayload = {
        genotype: "Mutated Human",
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
    }

    modified = false;

    currOffset = 0;

    startBuild;

    @api
    get build() {
        return this.startBuild;
    }

    set build(b) {
        if (!b || b.genotype == "True Kin") return;
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

    get noBacktrack() {
        return this.currOffset == 0;
    }

    get noAdvance() {
        if (this.currOffset == 3) return true;
        return this.currOffset == 2 && !this.modified;
    }

    advance() {
        this.currOffset = this.currOffset + 1 < 4 ? this.currOffset + 1 : this.currOffset;
        this.template.host.style.setProperty("--offset", this.currOffset);
    }

    backtrack() {
        this.currOffset = this.currOffset - 1 >= 0 ? this.currOffset - 1 : this.currOffset;
        this.template.host.style.setProperty("--offset", this.currOffset);
    }

    handleCallingSelection(event) {
        this.modified = true;
        let callingDetails = event.detail;
        this.buildPayload.subtype = callingDetails.callingName;
        this.callingModifiers = callingDetails.attributeModifiers

        const payload = JSON.parse(JSON.stringify(this.buildPayload));
        let updateEvent = new CustomEvent("buildupdated", { detail: payload });
        this.dispatchEvent(updateEvent);
    }

    handleAttributesChosen(event) {
        this.modified = true;
        let attributeDetails = event.detail;
        this.buildPayload.pointSpread = attributeDetails.attributes;
        this.buildPayload.apSpent = attributeDetails.apSpent;

        const payload = JSON.parse(JSON.stringify(this.buildPayload));
        let updateEvent = new CustomEvent("buildupdated", { detail: payload });
        this.dispatchEvent(updateEvent);
    }

    handleMutationSelection(event) {
        this.modified = true;
        let mutDetails = event.detail;
        this.buildPayload.mpRemaining = mutDetails.mpRemaining;
        this.buildPayload.mutations = mutDetails.mutations;

        const payload = JSON.parse(JSON.stringify(this.buildPayload));
        let updateEvent = new CustomEvent("buildupdated", { detail: payload });
        this.dispatchEvent(updateEvent);
    }
}