import { api, LightningElement } from "lwc";
import { getDetails } from "c/api";
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
        let starts = await getDetails('', 'starts');

        this._character = starts.BaseHumanoid;
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