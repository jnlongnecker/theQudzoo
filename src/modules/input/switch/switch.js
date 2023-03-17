import { LightningElement, api } from "lwc";

export default class Switch extends LightningElement {
    @api
    checked = false;

    changeCheck() {
        this.checked = !this.checked;
    }
}