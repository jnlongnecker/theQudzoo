import { LightningElement, api } from "lwc";
import { getBuilds } from "c/api";

export default class BuildLibrary extends LightningElement {

    filterStore;

    builds = [];

    ghostBuilds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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

    get noBuilds() {
        return this.builds.length == 0;
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