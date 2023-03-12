import { LightningElement, api } from "lwc";
import { getBuilds } from "c/api";

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
        let response = await getBuilds(this.filters);

        if (response.error) {
            console.error(response);
            return;
        }

        this.builds = response.builds;
    }
}