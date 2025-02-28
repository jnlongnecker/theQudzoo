import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./app.html";
class App extends LightningElement {
  constructor(...args) {
    super(...args);
    this.creature = void 0;
    this.enemy = void 0;
    this.actionLog = void 0;
    this.mode = 'level';
  }
  updateCreature(event) {
    this.creature = this.populateDefaults(JSON.parse(JSON.stringify(event.detail)));
  }
  updateEnemy(event) {
    this.enemy = JSON.parse(JSON.stringify(event.detail));
  }
  populateDefaults(draftCreature) {
    draftCreature.attributeExpenditure = this.defaultAttributeData(draftCreature);
    return draftCreature;
  }
  defaultAttributeData(draftCreature) {
    let leveledPoints = 0;
    let freePoints = draftCreature.isKin ? 38 : 44;
    let minTotal = draftCreature.isKin ? 12 : 10;
    return {
      leveledPoints,
      freePoints,
      minTotal,
      freePointsUsed: 0,
      leveledPointsUsed: 0
    };
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
    let newCreature = JSON.parse(JSON.stringify(this.creature));
    try {
      action.reverse(newCreature);
    } catch (e) {
      this.sendMessageToLog(e);
      return;
    }
    this.creature = newCreature;
    this.actionLog.updateActionMessage(action.id);
  }
  handleRedoAction(event) {
    let action = event.detail;
    let newCreature = JSON.parse(JSON.stringify(this.creature));
    try {
      action.apply(newCreature);
    } catch (e) {
      this.sendMessageToLog(e);
      return;
    }
    this.creature = newCreature;
    this.actionLog.updateActionMessage(action.id);
  }
  handleActionGeneral(event) {
    let action = event.detail;
    let newCreature = JSON.parse(JSON.stringify(this.creature));
    try {
      action.apply(newCreature);
    } catch (e) {
      this.sendMessageToLog(e);
      return;
    }
    this.sendActionToLog(action);
    this.creature = newCreature;
  }
  handleActionLevelReset() {
    if (this.creature.level === 1) return;
    this.actionLog.applyLevelReset();
    this.sendMessageToLog('Reset to level 1.');
  }
}
_registerDecorators(App, {
  fields: ["creature", "enemy", "actionLog", "mode"]
});
export default _registerComponent(App, {
  tmpl: _tmpl
});