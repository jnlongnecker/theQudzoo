import { LightningElement, track } from "lwc";
import { Creature } from "combat/calculator";
import { fire, register } from "c/componentEvents";

export default class App extends LightningElement {
    creature;
    enemy;

    actionLog;

    constructor() {
        super();
        register('actionevent', (event) => { this.handleActionGeneral(event) });
        register('resetactionevent', (event) => { this.handleActionLevelReset(event) });
        register('playerchangeevent', (event) => { this.updatePlayer(event) });
        register('enemychangeevent', (event) => { this.updateEnemy(event) });
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
            this.sendMessageToLog(e);
            return;
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
}