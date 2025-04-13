import { api, LightningElement } from "lwc";

export default class Builder extends LightningElement {
    showAttributes = true;
    @api character;
}