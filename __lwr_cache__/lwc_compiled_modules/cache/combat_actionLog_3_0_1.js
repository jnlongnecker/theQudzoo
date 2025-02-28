import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./actionLog.html";
class ActionLog extends LightningElement {
  constructor(...args) {
    super(...args);
    this.messages = [];
  }
  logAction(action) {
    action.id = this.messages.length;
    this.messages.push({
      type: 'action',
      activated: true,
      id: this.messages.length,
      message: action.print(),
      action
    });
  }
  logMessage(message) {
    this.messages.push({
      type: 'text',
      id: this.messages.length,
      message: message
    });
  }
  updateActionMessage(actionId) {
    let message = this.messages[actionId];
    message.activated = !message.activated;
  }
  applyLevelReset() {
    for (let i = this.messages.length - 1; i >= 0; i--) {
      let message = this.messages[i];
      if (message.type == 'action' && message.action.undoOnLevelReset && message.activated) {
        this.dispatchEvent(new CustomEvent('undoaction', {
          detail: message.action
        }));
      }
    }
  }
  renderedCallback() {
    this.scrollContainer();
  }
  undoAction(event) {
    let messageIndex = event.target.dataset.index;
    let message = this.messages[messageIndex];
    this.dispatchEvent(new CustomEvent('undoaction', {
      detail: message.action
    }));
  }
  redoAction(event) {
    let messageIndex = event.target.dataset.index;
    let message = this.messages[messageIndex];
    this.dispatchEvent(new CustomEvent('redoaction', {
      detail: message.action
    }));
  }
  scrollContainer() {
    if (!this.container) this.container = this.template.querySelector('.chatbox');
    this.container.scrollTop = this.container.scrollHeight;
  }
}
_registerDecorators(ActionLog, {
  publicMethods: ["logAction", "logMessage", "updateActionMessage", "applyLevelReset"],
  track: {
    messages: 1
  }
});
export default _registerComponent(ActionLog, {
  tmpl: _tmpl
});