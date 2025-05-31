import { api, LightningElement } from "lwc";

export default class Popup extends LightningElement {

    show = false;

    @api open() {
        this.show = true;
    }

    @api close() {
        this.dispatchEvent(new CustomEvent('close'));
        this.show = false;
    }
}