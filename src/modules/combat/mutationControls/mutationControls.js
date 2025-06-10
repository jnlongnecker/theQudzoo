import { api, LightningElement, track } from "lwc";
import { mutationPartRegistry } from 'combat/calculator';
import { getMutationData } from "c/api";
import { fire, register } from "c/componentEvents";
import { BaseMutationChangeAction } from "combat/actions";

const CATEGORY_IDX = {
    Morphotypes: 0,
    Physical: 1,
    PhysicalDefects: 2,
    Mental: 3,
    MentalDefects: 4,
}

export default class MutationControls extends LightningElement {

    @track mutations = [];
    selectedMutations = [];
    selectedMutation = '';
    selectedSrc;
    selectedText = '';
    variantChoices = [];
    mutationInLimbo;
    popup;
    stats;

    mutationPoints = 0;

    @api
    get creature() { }
    set creature(value) {
        this.handlePlayerRefresh({ detail: value });
    }

    constructor() {
        super();
        this.pullMutationData();
        register('refreshplayerevent', (e) => this.handlePlayerRefresh(e));
    }

    renderedCallback() {
        if (!this.popup) this.popup = this.template.querySelector('c-popup');
    }

    mutHover(event) {
        let name = event.currentTarget.dataset.name;
        let category = event.currentTarget.dataset.category;
        let mutation = this.getMutation(category, name);
        this.selectedMutation = mutation.displayName;
        this.selectedSrc = mutation.token;
        this.selectedText = this.buildFullBlurb(mutation);
    }

    mutClick(event) {
        let name = event.currentTarget.dataset.name;
        let category = event.currentTarget.dataset.category;
        let mutation = this.getMutation(category, name);
        let cost = mutation.cost;

        mutation.category = category;

        if (mutation.max === 1) {
            mutation.numSelected = mutation.numSelected === 1 ? 0 : 1;
            mutation.marker = mutation.numSelected === 1 ? '■' : ' ';
            mutation.format = mutation.numSelected === 1 ? 'chosen' : '';
        } else {
            let wrap = mutation.cost > this.mutationPoints;
            if (mutation.numSelected === undefined) mutation.numSelected = 0;
            cost = mutation.numSelected * mutation.cost;
            mutation.numSelected = wrap ? 0 : mutation.numSelected + 1;
            mutation.marker = mutation.numSelected === 0 ? ' ' : `${mutation.numSelected}`;
            mutation.format = mutation.numSelected >= 1 ? 'multi-chosen' : '';
        }
        let deselected = mutation.numSelected === 0;
        if (deselected) {
            this.selectedMutations = this.selectedMutations.filter(m => m !== mutation);
        } else { this.selectedMutations.push(mutation); }
        this.mutationPoints = !deselected ? this.mutationPoints - mutation.cost : this.mutationPoints + cost;
        this.calculateMutationSelectConsequences();
        fire('actionevent', { detail: new BaseMutationChangeAction(mutation, !deselected) });
    }

    chooseVariant(event) {
        let name = event.currentTarget.dataset.name;
        let category = event.currentTarget.dataset.category;
        event.stopPropagation();

        let mutation = this.getMutation(category, name);
        this.mutationInLimbo = mutation;
        this.variantChoices = mutation.variants;

        this.popup.open();
    }

    variantChosen(event) {
        let variantChoice = this.variantChoices[event.target.dataset.index];
        this.mutationInLimbo.selectedVariant = variantChoice;

        // Give the display name a new coat of paint
        let displayName = this.trueDisplayName(this.mutationInLimbo);
        this.mutationInLimbo.displayName = displayName;
        this.selectedMutation = displayName;
        this.popup.close();
    }

    handlePlayerRefresh(event) {
        let creature = event.detail;
        this.stats = creature.stats;
        this.mutationPoints = creature.mutationPoints;
    }

    /* ==== HELPERS ==== */

    trueDisplayName(mutationData) {
        if (!mutationData.selectedVariant) return mutationData.name;
        if (mutationData.name.includes('Ray')) return `${mutationData.name} (${mutationData.selectedVariant.type})`;
        return mutationData.selectedVariant.type;
    }

    buildFullBlurb(mutationData, level = 1, levelup = false) {
        let variant = mutationData.class === 'LightManipulation' ? this.getVariantName(mutationData) : this.stats.Willpower.value;
        let description = this.getDescription(mutationData.class, variant);
        let levelText = this.getLevelText({ className: mutationData.class, variant, level, levelup });

        let blurb = this.collapseSpace(`{{C|${description}}}\n\n${levelText}`);
        return blurb;
    }

    getDescription(className, variant) {
        return mutationPartRegistry.getConstructorFor(className).getDescription(variant);
    }

    getLevelText({ className, level = 1, variant, levelup = false } = {}) {
        return mutationPartRegistry.getConstructorFor(className).getLevelText(level, levelup, variant);
    }

    getVariantName(mutationData) {
        let variantData = mutationData.selectedVariant;
        let variants = mutationPartRegistry.getConstructorFor(mutationData.class).getVariants();
        if (variants.length === 0 && !variantData) return '';
        if (!variantData) return variants[0].type;
        return variantData.type;
    }

    getVariants(mutationData) {
        let variants = mutationPartRegistry.getConstructorFor(mutationData.class).getVariants();
        return variants.length > 0 ? variants : null;
    }

    getMutation(category, name) {
        for (let mutation of this.mutations[CATEGORY_IDX[category]].data.mutations) {
            if (mutation.name === name) {
                return mutation;
            }
        }
    }

    collapseSpace(text) {
        let chars = [];
        let startIgnore = false;
        for (let char of text) {
            if (char !== ' ') startIgnore = false;
            if (char === '\n') { startIgnore = true; chars.push('<br />') }
            if (!startIgnore) chars.push(char);
        }
        return chars.join('');
    }

    calculateMutationSelectConsequences() {
        let exclusions = this.selectedMutations.map(m => m.exclusions).join(',');
        let categories = this.selectedMutations.map(m => m.category);
        for (let category of this.mutations) {
            category = category.data;
            if (exclusions.includes(category.name)) {
                for (let mutation of category.mutations) mutation.selectable = false;
            } else {
                for (let mutation of category.mutations) {
                    if (exclusions.includes(mutation.name)) mutation.selectable = false;
                    else if (mutation.exclusions.includes('*')) {
                        let excludeThisMutation = categories.reduce((running, curr) => {
                            return running || mutation.exclusions.includes(curr)
                        }, false);
                        if (excludeThisMutation) mutation.selectable = false;
                        else if (mutation.format) mutation.selectable = true;
                        else if (mutation.cost > this.mutationPoints) mutation.selectable = false;
                        else mutation.selectable = true;
                    }
                    else if (mutation.format) mutation.selectable = true;
                    else if (mutation.cost > this.mutationPoints) mutation.selectable = false;
                    else mutation.selectable = true;
                }
            }
        }
    }

    async pullMutationData() {
        let mutationData = await getMutationData();
        mutationData.Physical.mutations = mutationData.Physical.mutations.map(mut => {
            mut.variants = this.getVariants(mut);
            mut.selectable = true;
            return mut;
        });
        mutationData.Morphotypes.mutations = mutationData.Morphotypes.mutations.map(mut => {
            mut.selectable = true; return mut;
        });
        mutationData.PhysicalDefects.mutations = mutationData.PhysicalDefects.mutations.map(mut => {
            mut.selectable = true; return mut;
        });
        mutationData.Mental.mutations = mutationData.Mental.mutations.map(mut => {
            mut.selectable = true; return mut;
        });
        mutationData.MentalDefects.mutations = mutationData.MentalDefects.mutations.map(mut => {
            mut.selectable = true; return mut;
        });
        this.mutations.push({ id: 1, class: 'morphotypes', data: mutationData.Morphotypes });
        this.mutations.push({ id: 2, class: 'positive', data: mutationData.Physical });
        this.mutations.push({ id: 3, class: 'negative', data: mutationData.PhysicalDefects });
        this.mutations.push({ id: 4, class: 'positive', data: mutationData.Mental });
        this.mutations.push({ id: 5, class: 'negative', data: mutationData.MentalDefects });

        console.log(this.mutations)
    }
}