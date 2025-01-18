import { LightningElement } from "lwc";
import { getCreatures } from "c/api";

export default class CreaturePicker extends LightningElement {

    creatures;
    currentCreature;
    creatureOptions = [];

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
        this.currentCreature = this.creatures[idx];
    }
}