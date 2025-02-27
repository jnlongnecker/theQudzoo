import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./app.html";
class App extends LightningElement {
  constructor(...args) {
    super(...args);
    this.creature = void 0;
    this.actionLog = void 0;
  }
  updateCreature(event) {
    this.creature = this.populateDefaults(JSON.parse(JSON.stringify(event.detail)));
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
    let error = action.reverse(newCreature);
    if (error) {
      this.sendMessageToLog(error);
      return;
    }
    this.creature = newCreature;
  }
  handleRedoAction(event) {
    let action = event.detail;
    let newCreature = JSON.parse(JSON.stringify(this.creature));
    action.apply(newCreature);
    this.creature = newCreature;
  }
  handleActionAttributeChange(event) {
    let action = event.detail;
    this.sendActionToLog(action);
    let newCreature = JSON.parse(JSON.stringify(this.creature));
    action.apply(newCreature);
    this.creature = newCreature;
  }
}
_registerDecorators(App, {
  fields: ["creature", "actionLog"]
});
export default _registerComponent(App, {
  tmpl: _tmpl
});