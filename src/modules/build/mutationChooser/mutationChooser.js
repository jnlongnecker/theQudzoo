import { api, LightningElement, track } from "lwc";
import { getMutations } from "c/api";

export default class MutationChooser extends LightningElement {

    @track
    mutations = [];

    points = 12;
    selectedBlurb;
    selectedLevelBlurb;
    selectedMutation = "No Mutation Selected";
    defectCapped = true;
    showBlurb = false;

    selectedMutations = [];
    mutationPayload = {
        mutations: [],
        mpRemaining: 0
    }

    selectingVariant = false;
    variantChoices = [];

    constructor() {
        super();
        this.fetchMutations();
    }

    get morphotypes() {
        if (!this.mutations) return "";
        return this.mutations.filter(entry => entry.category == "Morphotype");
    }

    get physicalMutations() {
        if (!this.mutations) return "";
        return this.mutations.filter(entry => entry.category == "Physical Mutation");
    }

    get physicalDefects() {
        if (!this.mutations) return "";
        return this.mutations.filter(entry => entry.category == "Physical Defect");
    }

    get mentalMutations() {
        if (!this.mutations) return "";
        return this.mutations.filter(entry => entry.category == "Mental Mutation");
    }

    get mentalDefects() {
        if (!this.mutations) return "";
        return this.mutations.filter(entry => entry.category == "Mental Defect");
    }

    get blurbClass() {
        if (window.innerWidth > 1200) return "blurb";

        return this.showBlurb ? "blurb show-blurb" : "blurb";
    }

    @api
    get muts() {
        return [];
    }

    set muts(muts) {
        if (!muts || muts.length == 0) return;
        this.setSelectedMutations(muts);
    }

    @api
    get mp() {
        return 0;
    }

    set mp(mp) {
        if (!mp) return;
        this.points = mp;
    }

    cancelChoice() {
        this.selectingVariant = false;
    }

    async fetchMutations() {
        let mutJson = await getMutations();
        this.mutations = mutJson.mutations;
        this.mutations.map(item => {
            item.class = "selectable";
            item.hover = true;
            item.marker = " ";
            item.variant = null;
            item.hasVariants = item.variants.length > 0;
            item.variantGameName = undefined;
            item.displayName = this.getDisplayName(item);
            item.numSelected = 0;
        });
        this.mutations = this.mutations.filter(item => item.cost != 0);
    }

    getMutation(mutationNode) {
        let mutName = mutationNode.getAttribute("name");
        return this.mutations.find(mut => mut.name == mutName);
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
        let hoveredMutation = this.getMutation(target);

        this.selectedMutation = hoveredMutation.displayName;
        this.selectedSrc = hoveredMutation.src;
        this.selectedBlurb.innerHTML = this.highlight(hoveredMutation.description);

        this.selectedLevelBlurb.innerHTML = this.highlight(hoveredMutation.levelText);

    }

    async setSelectedMutations(muts) {
        do {
            await new Promise(t => setTimeout(t, 1000));
        } while (!this.mutations.length > 0)

        for (let rawMut of muts) {
            let mut = this.mutations.find(mut => mut.name == rawMut.Mutation);
            mut.numSelected = rawMut.Count;
            mut.variant = rawMut.variantName;
            mut.variantGameName = rawMut.Variant;
            mut.displayName = this.getDisplayName(mut);

            if (mut.max > 1) {
                mut.marker = mut.numSelected;
            }
            else {
                mut.marker = "■";
            }
            this.selectedMutations.push(mut);
        }
        this.calculateChoiceConsequence();
    }

    mutClick(event) {
        let target = event.currentTarget;
        if (target.classList.contains("disabled")) return;

        let clickedMutation = this.getMutation(target);
        if (clickedMutation.max > 1) return this.handleMultipleSelections(clickedMutation);

        if (clickedMutation.marker == " ") {
            clickedMutation.numSelected++;
            clickedMutation.marker = "■";
            this.selectedMutations.push(clickedMutation);
            this.calculateChoiceConsequence();
        }
        else {
            clickedMutation.numSelected--;
            clickedMutation.marker = " ";
            this.selectedMutations =
                this.selectedMutations.filter(item => item.name != clickedMutation.name);
            this.calculateChoiceConsequence();
        }
    }

    handleMultipleSelections(mutSelected) {
        mutSelected.numSelected++;
        let notEnoughPoints = mutSelected.cost > this.points;
        if (mutSelected.max < mutSelected.numSelected || notEnoughPoints) {
            mutSelected.numSelected = 0;
            mutSelected.marker = " ";
            this.selectedMutations =
                this.selectedMutations.filter(item => item.name != mutSelected.name);
        }
        else {
            mutSelected.marker = mutSelected.numSelected;
            if (mutSelected.numSelected == 1) this.selectedMutations.push(mutSelected);

            this.selectedMutations = this.selectedMutations.map(item => {
                if (item.name != mutSelected.name) return item;
                return mutSelected;
            });
        }
        this.calculateChoiceConsequence();
    }

    highlight(text) {
        if (!text) return "";
        text = this.sugarInjector.highlightText(text);
        text = text.replace(/\n/g, "<br />");
        return text;
    }

    calculateChoiceConsequence() {
        let exclusions = [];
        this.selectedMutations.forEach(mut => {
            mut.excludes.forEach(item => exclusions.push(item));
        });
        let hasDefect = undefined != this.selectedMutations.find(item => item.category.includes("Defect"));
        this.points = 12 - this.selectedMutations.reduce((total, mut) => {
            return total + mut.cost * mut.numSelected;
        }, 0);

        this.mutations.map(item => {
            let excludedByCategory = exclusions.includes(item.category);
            let excludedByName = exclusions.includes(item.name);
            let excludedByCost = item.cost > this.points;
            let excudedByDefectCap = item.category.includes("Defect") && hasDefect && this.defectCapped;
            let includedBySelection = this.selectedMutations.includes(item);
            let excluded = excludedByCategory || excludedByName || excudedByDefectCap || excludedByCost;
            item.class = excluded && !includedBySelection ? "disabled" : "selectable";
            if (includedBySelection) {
                item.class = "selectable";
                item.class += item.max > 1 ? " multi-chosen" : " chosen";
            }
        });

        this.sendPayload();
    }

    sendPayload() {
        this.mutationPayload.mutations = [];
        for (let mut of this.selectedMutations) {
            let mutObj = {
                Mutation: mut.name,
                Count: mut.numSelected,
                Variant: mut.variantGameName,
                variantName: mut.variant
            }
            this.mutationPayload.mutations.push(mutObj);
        }
        this.mutationPayload.mpRemaining = this.points;

        let payload = JSON.parse(JSON.stringify(this.mutationPayload));
        let evt = new CustomEvent("mutationselected", { detail: payload });
        this.dispatchEvent(evt);
    }

    resetChanges() {
        for (let mut of this.selectedMutations) {
            mut.marker = " ";
        }
        this.selectedMutations = [];
        this.mutations.map(item => {
            item.numSelected = 0;
        })
        this.calculateChoiceConsequence();
    }

    randomizeChanges() {
        this.resetChanges();
        let cnt = 0;
        while (this.points > 0 && cnt < 1000) {
            let selection = Math.floor(Math.random() * this.mutations.length);
            let selectedMut = this.mutations[selection];

            if (selectedMut.class.includes("disabled")) continue;
            if (selectedMut.class.includes("chosen")) continue;
            if (selectedMut.cost > this.points) continue;

            selectedMut.numSelected++;
            selectedMut.marker = selectedMut.max == 1 ? "■" : selectedMut.numSelected;
            this.selectedMutations.push(selectedMut);
            this.calculateChoiceConsequence();

            cnt++;
        }
    }

    chooseVariant(event) {
        let mutName = event.currentTarget.getAttribute("name");
        event.stopPropagation();

        let mutation = this.mutations.find(mut => mut.name == mutName);
        this.mutationInLimbo = mutation;
        this.variantChoices = mutation.variants;
        this.selectingVariant = true;
    }

    variantChosen(event) {
        let variantChoice = event.target.innerText;
        this.mutationInLimbo.variant = variantChoice;
        this.mutationInLimbo.variantGameName = this.mutationInLimbo.variantTrueName[event.target.getAttribute("i")];
        this.mutationInLimbo.displayName = this.getDisplayName(this.mutationInLimbo);
        this.selectedMutation = this.mutationInLimbo.displayName;

        this.selectingVariant = false;

        let mut = this.selectedMutations.find(item => item.code == this.mutationInLimbo.code);
        if (!mut) return;
        mut.displayName = this.mutationInLimbo.displayName;

        this.sendPayload();
    }

    getDisplayName(mut) {
        let name = mut.name;
        if (!mut.variant) return name;

        if (mut.name.includes("Ray")) {
            return `${name} (${mut.variant})`;
        }

        return mut.variant;
    }

    showInfo(event) {
        event.stopPropagation();
        this.showBlurb = true;
        let mutName = event.getAttribute("name");
        let mut = this.mutations.find(mut => mut.name == mutName);

        this.selectedMutation = mut.displayName;
        this.selectedSrc = mut.src;
        this.selectedBlurb.innerHTML = this.highlight(mut.description);

        this.selectedLevelBlurb.innerHTML = this.highlight(mut.levelText);
    }

    hideBlurb() {
        this.showBlurb = false;
    }
}