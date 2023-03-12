import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./library.html";
import { getBuilds } from "c/api";
class BuildLibrary extends LightningElement {
  constructor(...args) {
    super(...args);
    this.filterStore = void 0;
    this.builds = [];
    this.mode = "copy";
  }
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
_registerDecorators(BuildLibrary, {
  publicProps: {
    mode: {
      config: 0
    },
    filters: {
      config: 3
    }
  },
  fields: ["filterStore", "builds"]
});
export default _registerComponent(BuildLibrary, {
  tmpl: _tmpl
});