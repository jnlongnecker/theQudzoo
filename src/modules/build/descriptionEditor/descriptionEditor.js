import { api, LightningElement } from "lwc";

export default class DescriptionEditor extends LightningElement {

    editBuild = true;

    @api
    description = '';

    get buttonLabel() {
        return this.editBuild ? 'Preview' : 'Edit';
    }

    toggleEdit(event) {
        this.editBuild = !this.editBuild;
    }

    handleChange(event) {
        this.description = event.target.value;

        this.dispatchEvent(new CustomEvent('descriptionset', { detail: this.description }));
    }
}