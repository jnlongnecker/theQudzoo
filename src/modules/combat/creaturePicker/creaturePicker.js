import { LightningElement, api } from "lwc";
import { getCreatures } from "c/api";

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

        this.pullCreatures();
    }

    async pullCreatures() {
        this.creatures = await getCreatures();
        this.creatureOptions = this.creatures.reduce((filtered, creature, id) => {
            if (!creature.hidden) {
                filtered.push({
                    primary: creature.name,
                    secondary: creature.faction,
                    metadata: `${creature.name.toLowerCase()} ${creature.faction.toLowerCase()}`,
                    src: creature.token,
                    id
                });
            }
            return filtered;
        }, []);
    }

    handleSelection(event) {
        let idx = event.detail.id;
        this.dispatchEvent(new CustomEvent('charchange', { detail: this.creatures[idx] }));
    }
}