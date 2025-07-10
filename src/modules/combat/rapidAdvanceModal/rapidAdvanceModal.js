import Modal from 'c/modal';
import { api, createElement } from 'lwc';

export default class RapidAdvanceModal extends Modal {
    static open(config) {
        return new Promise((resolve, reject) => {
            let modal = createElement('combat-rapid-advance-modal', { is: RapidAdvanceModal });
            let prevFirst = document.body.firstChild;
            modal.resolve = resolve;
            modal.reject = reject;
            modal.self = modal;

            modal.character = config.character;
            modal.title = config.title;
            document.body.insertBefore(modal, prevFirst);
        });
    }

    @api character;

    connectedCallback() {
        console.log('Running');
        this.options = this.character.mutations.reduce((list, mut) => {
            if (mut.category === 'Physical') {
                list.push({
                    value: mut.part,
                    label: mut.displayName
                });
            }
            return list;
        }, [])
        console.log(this.options);
    }
}