import { LightningElement, api, track } from "lwc";

export default class ActionLog extends LightningElement {

    @track
    messages = [];

    @api
    logAction(action) {
        action.id = this.messages.length;
        this.messages.push({
            type: 'action',
            activated: true,
            id: this.messages.length,
            message: action.print(),
            action,
        });
    }

    @api
    logMessage(message) {
        this.messages.push({
            type: 'text',
            id: this.messages.length,
            message: message
        });
    }

    @api
    updateActionMessage(actionId) {
        let message = this.messages[actionId];
        message.activated = !message.activated;
    }

    @api
    applyLevelReset() {
        for (let i = this.messages.length - 1; i >= 0; i--) {
            let message = this.messages[i];
            if (message.type == 'action' && message.action.undoOnLevelReset && message.activated) {
                this.dispatchEvent(new CustomEvent('undoaction', { detail: message.action }));
            }
        }
    }

    renderedCallback() {
        this.scrollContainer();
    }

    undoAction(event) {
        let messageIndex = event.target.dataset.index;
        let message = this.messages[messageIndex];
        this.dispatchEvent(new CustomEvent('undoaction', { detail: message.action }));
    }

    redoAction(event) {
        let messageIndex = event.target.dataset.index;
        let message = this.messages[messageIndex];
        this.dispatchEvent(new CustomEvent('redoaction', { detail: message.action }));
    }

    scrollContainer() {
        if (!this.container)
            this.container = this.template.querySelector('.chatbox');
        this.container.scrollTop = this.container.scrollHeight;
    }
}