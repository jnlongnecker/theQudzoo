import { LightningElement, api } from "lwc";
import { getPreviews, getDetails } from "c/api";

export default class CreaturePicker extends LightningElement {

    creatures = [];
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
        if (!term || term.length < 3) { this.creatures = []; return; }
        let query = `term=${term}`;
        this.creatures = (await getPreviews(query, 'creatures')).result.map(result => {
            return {
                primary: result.item.cleanedName,
                secondary: result.item.factions,
                src: result.item.src,
                name: result.item.name,
            }
        });
    }

    async handleSelection(event) {
        let creatureName = event.detail.name;
        let query = `name=${creatureName}`;
        let creatureDetails = (await getDetails(query, 'creatures')).result;
        console.log(creatureDetails);
        this.dispatchEvent(new CustomEvent('charchange', { detail: creatureDetails }));
    }

    handleFilterChange(event) {
        let newFilter = event.detail;
        this.pullCreatures(newFilter);
    }
}