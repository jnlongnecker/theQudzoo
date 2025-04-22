import { Part } from "../parts";
import { GetItemFlavorDescriptionEvent } from "../events";

export class Physics extends Part {

    usesTwoSlots;

    constructor({ UsesTwoSlots = false, FlameTemperature = 350, VaporTemperature = 10000, FreezeTemperature = 0, BrittleTemperature = -100, Temperature = 25 } = {}) {
        super();
        this.usesTwoSlots = UsesTwoSlots;
    }
}

export class Description extends Part {

    description;

    constructor({ Short = '' } = {}) {
        super();

        this.description = Short;
    }

    onAttach(host) {
        super.onAttach(host);

        GetItemFlavorDescriptionEvent.register(host, (event) => this.handleFlavorDescriptionEvent(event), this.id);
    }

    handleFlavorDescriptionEvent(event) {
        event.description += `${this.description}`;
    }
}