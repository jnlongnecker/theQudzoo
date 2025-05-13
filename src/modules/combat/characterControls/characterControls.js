import { track, LightningElement } from "lwc";
import { getDetails } from "c/api";
import { LevelUpAction } from "combat/actions";
import { fire, register } from "c/componentEvents";
import Modal from "c/modal";

export default class CharacterControls extends LightningElement {

    @track character;
    statSpread;

    constructor() {
        super();

        register('refreshplayerevent', (event) => { this.character = event.detail; this.statSpread?.refresh(this.character); });
        this.pullCreatures();
    }

    renderedCallback() {
        if (!this.statSpread) this.statSpread = this.template.querySelector('combat-stat-spread');
    }

    async pullCreatures() {
        let starts = await getDetails('', 'starts');

        this.character = starts.BaseHumanoid;
        fire('playerchangeevent', { detail: this.character });
    }

    toggleMode(event) {
        let mode = event.detail ? 'free' : 'level';
        fire('modechangeevent', { detail: mode });
    }

    sendActionLevelUp() {
        fire('actionevent', { detail: new LevelUpAction() });
    }

    async sendActionLevelReset() {
        if (await this.confirmLevelReset()) fire('resetactionevent');
    }

    async confirmLevelReset() {
        let result;
        try {
            result = await Modal.open({
                title: 'Confirm Level Reset',
                bodyText: `This action will reset your character to level 1. This is not reversible. Confirm reset to level 1?`,
                options: [
                    { value: 'yes', label: 'Confirm' },
                    { value: 'no', label: 'Cancel' },
                ]
            });
        } catch (e) {
            return false;
        }
        return result === 'yes';
    }
}