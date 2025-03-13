import { ActivatedActionEvent } from "./events";

export class Part {
    host

    onAttach(host) {
        if (!host) console.error('No host supplied.');
        this.host = host;
    }
}

export class AttackerPart extends Part {

    onAttach(host) {
        super.onAttach(host);

        ActivatedActionEvent.register(this.host, (event) => this.handleActivatedAction(event));
    }

    handleActivatedAction(event) {
        if (event.actionId !== 'Bump_Attack') return;
    }
}