import { LightningElement, track } from "lwc";

export default class Profile extends LightningElement {

    @track
    user;

    editingName = false;

    nameInput;

    constructor() {
        super();
        this.fetchUser();
    }

    get userExists() {
        return this.user ? true : false;
    }

    get libraryFilters() {
        return {
            "$or": [
                { "owner.username": this.user.username },
                { "owner._id": this.user.id }
            ]
        }
    }

    async fetchUser() {
        let response = await fetch("/db/authenticated");
        let u = await response.json();
        if (!response.ok || !u.username) {
            console.log("User not authenticated")
            window.location.replace("/");
        }

        this.user = u;
    }

    allowEdit(event) {
        event.stopPropagation();
        this.editingName = true;
    }

    endEdit() {
        if (!this.editingName) return;

        this.nameInput = this.template.querySelector('input-text');
        this.editingName = false;

        this.user.name = this.nameInput.value;
        this.saveUser();
    }

    confirmEdit(event) {
        if (event.key === 'Enter') {
            this.endEdit();
        }
    }

    async saveUser() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let rawBody = JSON.stringify(this.user);

        let reqOptions = {
            method: "POST",
            headers: headers,
            body: rawBody,
        }

        let response = await fetch("/db/users", reqOptions);

        if (!response.ok) {
            console.log(await response.text());
        }

        this.user = await response.json();
    }
}