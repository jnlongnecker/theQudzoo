import { LightningElement, createElement, api } from "lwc";

export default class Modal extends LightningElement {
    static open(config) {
        return new Promise((resolve, reject) => {
            let modal = createElement('c-modal', { is: Modal });
            let prevFirst = document.body.firstChild;
            modal.resolve = resolve;
            modal.reject = reject;
            modal.self = modal;

            for (let property in config) {
                modal[property] = config[property];
            }
            document.body.insertBefore(modal, prevFirst);
        });
    }

    @api resolve;
    @api reject;
    @api self;

    @api title;
    @api bodyText;
    @api bodyStyle = '';
    @api options = [];

    close(result, reject) {
        if (reject) {
            this.reject(reject);
        }
        else if (result) {
            this.resolve(result);
        }
        if (this.self) {
            document.body.removeChild(this.self);
        }
    }

    handleClose() {
        this.close(undefined, 'Exit');
    }

    handleOption(event) {
        let optionVal = event.currentTarget.dataset.value;
        this.close(optionVal);
    }
}