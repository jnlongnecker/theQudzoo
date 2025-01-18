import { api, LightningElement } from "lwc";
import { getCreatures } from "c/api";

export default class CharacterBuilder extends LightningElement {

    _character;

    @api
    get character() {
        return this._character;
    }

    set character(value) {
        if (!value) return;
        this._character = value;
    }

    constructor() {
        super();

        this.pullCreatures();
    }

    async pullCreatures() {
        let creatures = await getCreatures();

        this.character = creatures.filter(creatureData => creatureData.name.includes('Player'))[0];
        this.dispatchEvent(new CustomEvent('charchange', { detail: this.character }));
    }
}