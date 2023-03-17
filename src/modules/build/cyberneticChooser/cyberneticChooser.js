import { LightningElement, track, api } from "lwc";
import { getCybernetics } from "c/api";

export default class CyberneticChooser extends LightningElement {

    @track
    rawCybernetics = [];

    @api
    enabled = 'Nocturnal Apex';

    points = 12;
    selectedBlurb;
    selectedLevelBlurb;
    selectedSrc;
    selectedCybText = "No Cybernetic Selected";
    defectCapped = true;
    showBlurb = false;

    selectedCybernetic = [];
    cyberneticPayload = {
        cybernetics: []
    }

    selectingVariant = false;
    variantChoices = [];

    @api
    get cybs() {
        return [];
    }

    set cybs(cybs) {
        if (!cybs || cybs.length == 0) return;
        let target = cybs[0];
        this.setSelectedCybernetic(target);
    }

    get cybernetics() {
        return this.rawCybernetics.filter(cyb => !cyb.creationConditional || !(cyb.creationConditional && cyb.name != this.enabled))
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
        this.fetchMutations();
    }

    async setSelectedCybernetic(cyb) {
        do {
            await new Promise(t => setTimeout(t, 1000));
        } while (!this.rawCybernetics.length > 0)

        let clickedCyb =
            this.rawCybernetics.find(item => {
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
        let mutJson = await getCybernetics();
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
        let hoveredCyb =
            this.rawCybernetics.find(item => {
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

        let clickedCyb =
            this.rawCybernetics.find(item => {
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
                Variant: cyb.id ? cyb.variant : null,
            }
            this.cyberneticPayload.cybernetics.push(cybObj);
        }

        let payload = JSON.parse(JSON.stringify(this.cyberneticPayload));
        let evt = new CustomEvent("mutationselected", { detail: payload });
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
        let hoveredCyb =
            this.rawCybernetics.find(item => {
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