import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./actionLog.html";
class ActionLog extends LightningElement {
  constructor(...args) {
    super(...args);
    this.messages = [];
  }
  logAction(action) {
    this.messages.push({
      type: 'action',
      id: this.messages.length,
      activated: true,
      message: action.print(),
      action
    });
  }
  undoAction(event) {
    let messageIndex = event.target.dataset.index;
    let message = this.messages[messageIndex];
    message.activated = false;
    this.dispatchEvent(new CustomEvent('undoaction', {
      detail: message.action
    }));
  }
  redoAction(event) {
    let messageIndex = event.target.dataset.index;
    let message = this.messages[messageIndex];
    message.activated = true;
    this.dispatchEvent(new CustomEvent('redoaction', {
      detail: message.action
    }));
  }
}
_registerDecorators(ActionLog, {
  publicMethods: ["logAction"],
  track: {
    messages: 1
  }
});
export default _registerComponent(ActionLog, {
  tmpl: _tmpl
});