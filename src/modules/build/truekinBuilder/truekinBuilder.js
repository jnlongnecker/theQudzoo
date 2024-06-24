import { LightningElement, api } from "lwc";

export default class TruekinBuilder extends LightningElement {
    scrollingContainer;

    callingModifiers;

    buildPayload = {
        genotype: "True Kin",
        subtype: "Horticulturist",
        cybernetics: [],
        pointSpread: {
            Agility: 0,
            Ego: 0,
            Intelligence: 0,
            Strength: 0,
            Toughness: 0,
            Willpower: 0
        },
        apSpent: 0,
        description: ''
    }

    startBuild;

    currOffset = 0;
    modified = false;

    get allowedCybernetic() {
        if (!this.callingModifiers) return;
        return this.callingModifiers.cybernetic;
    }

    @api
    get build() {
        return this.startBuild;
    }

    set build(build) {
        if (!build || build.genotype != "True Kin") return;
        this.startBuild = build;
    }

    get caste() {
        if (!this.startBuild) return;
        return this.startBuild.subtype;
    }

    get cybernetics() {
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

    get description() {
        if (!this.startBuild) return;
        console.log(JSON.parse(JSON.stringify(this.startBuild)));
        return this.startBuild.description;
    }

    connectedCallback() {
        let scrollingContainer = this.template.querySelector(".scrolling-banner");
    }

    get noBacktrack() {
        return this.currOffset == 0;
    }

    get noAdvance() {
        if (this.currOffset == 4) return true;
        return this.currOffset == 2 && !this.modified;
    }

    advance() {
        this.currOffset = this.currOffset + 1 < 5 ? this.currOffset + 1 : this.currOffset;
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

    handleCyberneticSelection(event) {
        this.modified = true;
        let cyberDetails = event.detail;
        this.buildPayload.cybernetics = cyberDetails.cybernetics;

        const payload = JSON.parse(JSON.stringify(this.buildPayload));
        let updateEvent = new CustomEvent("buildupdated", { detail: payload });
        this.dispatchEvent(updateEvent);
    }

    handleDescriptionSet(event) {
        let updateEvent = new CustomEvent("descriptionupdated", { detail: event.detail });
        this.dispatchEvent(updateEvent);
    }
}