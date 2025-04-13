import { LightningElement, api } from "lwc";
import { getPreviews, getDetails } from "c/api";
import { fire, register } from "c/componentEvents";

export default class CreaturePicker extends LightningElement {

    creatures = [];
    selectedCreature;
    creatureOptions = [];
    statSpread;

    @api
    get creature() {
        return this.selectedCreature;
    }

    set creature(value) {
        if (!value) return;
        this.selectedCreature = value;
    }

    constructor() {
        super();

        register('refreshenemyevent', (event) => { this.creature = event.detail; this.statSpread?.refresh(this.creature); });
    }

    renderedCallback() {
        if (!this.statSpread) this.statSpread = this.template.querySelector('combat-stat-spread');
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
        fire('enemychangeevent', { detail: creatureDetails });
    }

    handleFilterChange(event) {
        let newFilter = event.detail;
        this.pullCreatures(newFilter);
    }
}