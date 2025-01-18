import { LightningElement } from "lwc";

export default class App extends LightningElement {
    creature;

    updateCreature(event) {
        this.creature = JSON.parse(JSON.stringify(event.detail));
    }
}