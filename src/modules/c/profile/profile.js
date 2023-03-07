import { LightningElement } from "lwc";

export default class Profile extends LightningElement {

    user;

    constructor() {
        super();
        this.fetchUser();
    }

    get userExists() {
        return this.user ? true : false;
    }

    get libraryFilters() {
        return {
            "owner.username": this.user.username
        }
    }

    async fetchUser() {
        let response = await fetch("/db/authenticated");
        if (!response.ok) {
            console.log("User not authenticated")
            window.location.replace("/");
        }

        this.user = await response.json();
    }
}