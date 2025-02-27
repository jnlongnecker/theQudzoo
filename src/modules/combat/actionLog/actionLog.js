import { LightningElement, api, track } from "lwc";

export default class ActionLog extends LightningElement {

    @track
    messages = [];

    @api
    logAction(action) {
        this.messages.push({
            type: 'action',
            id: this.messages.length,
            activated: true,
            message: action.print(),
            action,
        });
    }

    undoAction(event) {
        let messageIndex = event.target.dataset.index;
        let message = this.messages[messageIndex];
        message.activated = false;
        this.dispatchEvent(new CustomEvent('undoaction', { detail: message.action }));
    }

    redoAction(event) {
        let messageIndex = event.target.dataset.index;
        let message = this.messages[messageIndex];
        message.activated = true;
        this.dispatchEvent(new CustomEvent('redoaction', { detail: message.action }));
    }
}