import { LightningElement, api } from "lwc";

export default class TruekinBuilder extends LightningElement {
    scrollingContainer;

    callingModifiers = {
        "Strength": 0,
        "Agility": 0,
        "Toughness": 0,
        "Intelligence": 3,
        "Willpower": 0,
        "Ego": 0,
        "cybernetic": "Nocturnal Apex"
    };

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
        apSpent: 0
    }

    startBuild;

    @api
    get build() {
        return this.startBuild;
    }

    set build(build) {
        console.log(build);
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

    handleCyberneticSelection(event) {
        let cyberDetails = event.detail;
        this.buildPayload.cybernetics = cyberDetails.cybernetics;

        const payload = JSON.parse(JSON.stringify(this.buildPayload));
        let updateEvent = new CustomEvent("buildupdated", { detail: payload });
        this.dispatchEvent(updateEvent);
    }
}