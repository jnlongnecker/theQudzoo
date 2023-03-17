import { api, LightningElement } from "lwc";

export default class Popup extends LightningElement {

    @api
    show = false;

    stopProp(event) {
        event.stopPropagation();
    }

    closePopup() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}