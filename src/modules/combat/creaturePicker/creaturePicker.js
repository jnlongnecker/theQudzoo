import { LightningElement, api } from "lwc";
import { getPreviews } from "c/api";

export default class CreaturePicker extends LightningElement {

    creatures;
    selectedCreature;
    creatureOptions = [];

    @api
    get creature() {
        return this.selectedCreature;
    }

    set creature(value) {
        if (!value || !value.creature) return;
        let newWrapper = {
            creature: value.creature,
            count: value.count + 1
        };
        this.selectedCreature = newWrapper;
    }

    constructor() {
        super();
    }

    async pullCreatures(term) {
        if (!term || term.length < 3) this.creatures = [];
        let query = `term=${term}`;
        this.creatures = (await getPreviews(query, 'creatures')).result.map(result => {
            return {
                primary: result.item.cleanedName,
                secondary: result.item.factions,
                src: result.item.src
            }
        });
    }

    handleSelection(event) {
        let idx = event.detail.id;
        this.dispatchEvent(new CustomEvent('charchange', { detail: this.creatures[idx] }));
    }

    handleFilterChange(event) {
        let newFilter = event.detail;
        this.pullCreatures(newFilter);
    }
}