import { api, LightningElement } from "lwc";
import { getCreatures } from "c/api";
import { LevelUpAction } from "combat/actions";

export default class CharacterBuilder extends LightningElement {

    _character;

    @api
    get character() {
        return this._character;
    }

    set character(value) {
        if (!value || !value.creature) return;
        let newWrapper = {
            creature: value.creature,
            count: value.count + 1
        };
        this._character = newWrapper;
    }

    constructor() {
        super();

        this.pullCreatures();
    }

    async pullCreatures() {
        let creatures = await getCreatures();

        this._character = creatures.filter(creatureData => creatureData.name.includes('Player'))[0];
        console.log('Sending char change event');
        this.dispatchEvent(new CustomEvent('charchange', { detail: this.character }));
    }

    toggleMode(event) {
        let mode = event.detail ? 'free' : 'level';
        this.dispatchEvent(new CustomEvent('modechange', { detail: mode }));
    }

    sendActionLevelUp() {
        this.dispatchEvent(new CustomEvent('actionlevelup', { detail: new LevelUpAction(), bubbles: true, composed: true }));
    }

    sendActionLevelReset() {
        this.dispatchEvent(new CustomEvent('actionlevelreset', { bubbles: true, composed: true }));
    }
}