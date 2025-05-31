import { LightningElement, track } from "lwc";
import { mutationPartRegistry } from 'combat/calculator';
import { getMutationData } from "c/api";

const CATEGORY_IDX = {
    Morphotypes: 0,
    Physical: 1,
    PhysicalDefects: 2,
    Mental: 3,
    MentalDefects: 4,
}

export default class MutationControls extends LightningElement {

    @track mutations = [];
    selectedMutation = '';
    selectedSrc;
    selectedText = '';
    variantChoices = [];
    mutationInLimbo;
    popup;

    constructor() {
        super();
        this.pullMutationData();
    }

    renderedCallback() {
        if (!this.popup) this.popup = this.template.querySelector('c-popup');
    }

    mutHover(event) {
        let name = event.target.dataset.name;
        let category = event.target.dataset.category;
        let mutation = this.getMutation(category, name);
        this.selectedMutation = mutation.displayName;
        this.selectedSrc = mutation.token;
        this.selectedText = this.buildFullBlurb(mutation);
    }

    mutClick(event) {

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

    /* ==== HELPERS ==== */

    trueDisplayName(mutationData) {
        if (!mutationData.selectedVariant) return mutationData.name;
        if (mutationData.name.includes('Ray')) return `${mutationData.name} (${mutationData.selectedVariant.type})`;
        return mutationData.selectedVariant.type;
    }

    buildFullBlurb(mutationData, level = 1, levelup = false) {
        let variant = this.getVariantName(mutationData);
        let description = this.getDescription(mutationData.class, variant);
        let levelText = this.getLevelText({ className: mutationData.class, variant: mutationData.variant, level, levelup });

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

    async pullMutationData() {
        let mutationData = await getMutationData();
        mutationData.Physical.mutations = mutationData.Physical.mutations.map(mut => {
            mut.variants = this.getVariants(mut);
            return mut;
        });
        this.mutations.push({ id: 1, class: 'morphotypes', data: mutationData.Morphotypes });
        this.mutations.push({ id: 2, class: 'positive', data: mutationData.Physical });
        this.mutations.push({ id: 3, class: 'negative', data: mutationData.PhysicalDefects });
        this.mutations.push({ id: 4, class: 'positive', data: mutationData.Mental });
        this.mutations.push({ id: 5, class: 'negative', data: mutationData.MentalDefects });

        console.log(this.mutations)
    }
}