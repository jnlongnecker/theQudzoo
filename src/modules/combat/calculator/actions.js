import { ActivatedActionEvent } from "./events";

export class ActivatedAction {
    name;
    actionId;
    type;
    activator;
    energy;

    cachedResult;

    constructor(name, actionId, type, energy, activator) {
        this.name = name;
        this.actionId = actionId;
        this.type = type;
        this.energy = energy;
        this.activator = activator;
    }

    preview(details) {
        this.cachedResult = this.activator.fire(new ActivatedActionEvent(this.actionId, details)).attacks;
    }

    activate(details) {
        if (!this.cachedResult) this.preview(details);

    }
}
