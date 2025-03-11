import { LightningElement, track } from "lwc";
import { Creature } from "combat/calculator";

export default class App extends LightningElement {
    @track creatureWrapper = { creature: undefined, count: 0 };
    @track enemy;

    actionLog;
    mode = 'level';

    updateCreature(event) {
        this.forceRerenderCreature(Creature.fromObject(JSON.parse(JSON.stringify(event.detail))));
    }

    updateEnemy(event) {
        this.enemy = Creature.fromObject(JSON.parse(JSON.stringify(event.detail)));
    }

    /**
     * Hack to get the Lighting Component Framework to properly detect a mutation
     * to the creature object.
     * @param {Object} newCreature The updated creature to broadcast mutations to
     */
    forceRerenderCreature(newCreature) {
        let newWrapper = {
            creature: newCreature,
            count: this.creatureWrapper.count + 1,
        };
        this.creatureWrapper = newWrapper;
    }

    handleModeChange(event) {
        this.mode = event.detail;
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
        let creature = this.creatureWrapper.creature;
        try {
            action.reverse(creature);
        } catch (e) {
            this.sendMessageToLog(e);
            return;
        }
        this.actionLog.updateActionMessage(action.id);
        this.forceRerenderCreature(creature);
    }

    handleRedoAction(event) {
        let action = event.detail;
        let creature = this.creatureWrapper.creature;
        try {
            action.apply(creature);
        } catch (e) {
            this.sendMessageToLog(e);
            return;
        }
        this.actionLog.updateActionMessage(action.id);
        this.forceRerenderCreature(creature);
    }

    handleActionGeneral(event) {
        let action = event.detail;
        let creature = this.creatureWrapper.creature;
        try {
            action.apply(creature);
        } catch (e) {
            this.sendMessageToLog(e);
            return;
        }
        this.sendActionToLog(action);
        this.forceRerenderCreature(creature);
    }

    handleActionLevelReset() {
        if (this.creatureWrapper.creature.level === 1) return;
        this.actionLog.applyLevelReset();
        this.sendMessageToLog('Reset to level 1.');
    }
}