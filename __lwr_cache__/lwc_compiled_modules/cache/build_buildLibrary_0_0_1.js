import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./buildLibrary.html";
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
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("filters", JSON.stringify(this.filters));
    let reqOptions = {
      method: "GET",
      headers: headers
    };
    let response = await fetch("/db/builds", reqOptions);
    if (!response.ok) {
      console.error(await response.text());
      return;
    }
    this.builds = (await response.json()).builds;
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