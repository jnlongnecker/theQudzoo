import { LightningElement } from "lwc";
import { expectedPenetrations } from "combat/calculator";

export default class PenTool extends LightningElement {

    result = '--';

    av;
    pv;

    pastResults = [];

    updateAV(evt) {
        this.av = Math.max(0, evt.detail);
        this.calculateExpectedPenetrations();
    }

    updatePV(evt) {
        this.pv = evt.detail;
        this.calculateExpectedPenetrations();
    }

    calculateExpectedPenetrations() {
        if (!this.av) return;
        if (!this.pv) return;

        this.result = expectedPenetrations(this.av, this.pv - 4, this.pv - 4);
        this.pastResults.push(this.result);
    }
}