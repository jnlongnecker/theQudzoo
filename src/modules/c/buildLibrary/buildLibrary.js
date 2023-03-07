import { LightningElement, api } from "lwc";

export default class BuildLibrary extends LightningElement {

    filterStore;

    builds = [];

    @api
    mode = "copy"

    @api
    get filters() {
        return this.filterStore;
    }

    set filters(newFilters) {
        this.filterStore = newFilters;
        this.fetchBuilds();
    }

    async fetchBuilds() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("filters", JSON.stringify(this.filters));

        let reqOptions = {
            method: "GET",
            headers: headers,
        }

        let response = await fetch("/db/builds", reqOptions);

        if (!response.ok) {
            console.error(await response.text());
            return;
        }

        this.builds = (await response.json()).builds;
        console.log(this.builds);
    }
}