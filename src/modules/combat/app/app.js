import { LightningElement, track } from "lwc";
import { Creature } from "combat/calculator";
import { fire, register } from "c/componentEvents";
import Toast from "c/toast";

export default class App extends LightningElement {
    @track creature;
    enemy;

    actionLog;
    mode = 'level';
    level = 1;
    isKin = false;

    constructor() {
        super();
        register('actionevent', (event) => { return this.handleActionGeneral(event) });
        register('modechangeevent', (event) => { this.mode = event.detail });
        register('genotypechangeevent', (event) => {
            this.creature.isKin = event.detail;
            this.isKin = event.detail;
            fire('refreshplayerevent', { detail: this.creature });
        });
        register('resetactionevent', (event) => { this.handleActionLevelReset(event) });
        register('playerchangeevent', (event) => { this.updatePlayer(event) });
        register('enemychangeevent', (event) => { this.updateEnemy(event) });
        register('refreshplayerevent', (event) => { this.level = this.creature.level });
    }

    updatePlayer(event) {
        this.creature = Creature.fromObject(JSON.parse(JSON.stringify(event.detail)), true);
        fire('refreshplayerevent', { detail: this.creature });
    }

    updateEnemy(event) {
        this.enemy = Creature.fromObject(JSON.parse(JSON.stringify(event.detail)));
        fire('refreshenemyevent', { detail: this.enemy });
    }

    sendActionToLog(action) {
        if (!this.actionLog) {
            this.actionLog = this.template.querySelector('combat-action-log');
        }
        this.actionLog.logAction(action);
    }

    sendMessageToLog(message) {
        if (!this.actionLog) {
            this.actionLog = this.template.querySelector('combat-action-log');
        }
        this.actionLog.logMessage(message);
    }

    handleUndoAction(event) {
        let action = event.detail;
        let creature = this.creature;
        try {
            action.reverse(creature);
        } catch (e) {
            this.sendMessageToLog(e);
            return;
        }
        this.actionLog.updateActionMessage(action.id);
        this.creature = creature;
        fire('refreshplayerevent', { detail: this.creature });
    }

    handleRedoAction(event) {
        let action = event.detail;
        let creature = this.creature;
        try {
            action.apply(creature);
        } catch (e) {
            this.sendMessageToLog(e);
            return;
        }
        this.actionLog.updateActionMessage(action.id);
        this.creature = creature;
        fire('refreshplayerevent', { detail: this.creature });
    }

    handleActionGeneral(event) {
        let action = event.detail;
        let creature = this.creature;
        try {
            action.apply(creature);
        } catch (e) {
            console.log(e);
            this.sendMessageToLog(e);
            return false;
        }
        this.sendActionToLog(action);
        this.creature = creature;
        fire('refreshplayerevent', { detail: this.creature });
    }

    handleActionLevelReset() {
        if (this.creature.level === 1) return;
        this.actionLog.applyLevelReset();
        this.sendMessageToLog('{{Y|Reset to level 1.}}');
    }

    selectedOption = 'subtype';

    get attrSelected() {
        return this.selectedOption === 'attributes';
    }
    get equipSelected() {
        return this.selectedOption === 'equipment';
    }
    get skillSelected() {
        return this.selectedOption === 'skills';
    }
    get mutSelected() {
        return this.selectedOption === 'mutations';
    }
    get combatSelected() {
        return this.selectedOption === 'combat';
    }
    get cybSelected() {
        return this.selectedOption === 'cybernetics';
    }
    get subSelected() {
        return this.selectedOption === 'subtype';
    }

    get attrClass() {
        return this.attrSelected ? 'icon-button selected' : 'icon-button';
    }
    get equipClass() {
        return this.equipSelected ? 'icon-button selected' : 'icon-button';
    }
    get skillClass() {
        return this.skillSelected ? 'icon-button selected' : 'icon-button';
    }
    get mutClass() {
        return this.mutSelected ? 'icon-button selected' : 'icon-button';
    }
    get combatClass() {
        return this.combatSelected ? 'icon-button selected' : 'icon-button';
    }
    get cybClass() {
        return this.cybSelected ? 'icon-button selected' : 'icon-button';
    }
    get subClass() {
        return this.subSelected ? 'icon-button selected' : 'icon-button';
    }

    get isLevelOne() {
        return this.level <= 1;
    }

    swapPanel(evt) {
        this.selectedOption = evt.currentTarget.dataset.option;
    }
}