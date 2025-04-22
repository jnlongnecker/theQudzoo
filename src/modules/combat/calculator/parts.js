import { deregisterPart } from "./events";

export class Part {
    host
    id;

    constructor() {
        this.id = crypto.randomUUID();
    }

    onAttach(host) {
        if (!host) console.error('No host supplied.');
        this.host = host;
    }

    onDetach() {
        deregisterPart(this.host, this);
    }

    onEquip() { }
    onUnequip() { }
}