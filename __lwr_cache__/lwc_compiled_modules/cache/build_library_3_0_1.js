import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./library.html";
import { getBuilds, getAuthenticatedUser } from "c/api";
import tagNames from 'build/tagNames';
class BuildLibrary extends LightningElement {
  get switchChecked() {
    return !this.ascending;
  }
  get filters() {
    return this.filterStore;
  }
  set filters(newFilters) {
    this.filterStore = JSON.parse(JSON.stringify(newFilters));
    console.log(this.filterStore);
    this.fetchBuilds();
  }
  get showAuthor() {
    return this.mode != 'delete';
  }
  get noBuilds() {
    return this.builds.length == 0;
  }
  get filterClass() {
    return this.hideFilters ? "setting-button" : "setting-button on";
  }
  get sortClass() {
    return this.hideFilters ? 'sort hide' : 'sort show';
  }
  get tags() {
    let ret = [];
    for (let tag in tagNames) {
      ret.push(tag);
    }
    return ret;
  }
  constructor() {
    super();
    this.filterStore = null;
    this.builds = [];
    this.ghostBuilds = [1, 2, 3, 4, 5, 6];
    this.mode = "copy";
    this.popup = false;
    this.ownerFilter = '';
    this.buildNameFilter = '';
    this.genotypeFilter = 'Any';
    this.sortBy = 'Likes';
    this.ascending = false;
    this.working = true;
    this.contextUserId = void 0;
    this.page = 0;
    this.hitMax = false;
    this.headerText = '';
    this.hideFilters = true;
    this.chosenTags = [];
    this.getContextUser();
    setTimeout(() => {
      if (!this.builds.length && !this.filters) {
        this.filterStore = {};
        this.fetchBuilds();
      }
    }, 50);
    window.addEventListener('scroll', event => this.checkPosition(event));
  }
  toggleFilters() {
    this.hideFilters = !this.hideFilters;
  }
  async getContextUser() {
    let result = await getAuthenticatedUser();
    this.contextUserId = result.id;
  }
  constructBuildFilters() {
    this.filterStore['owner.displayName'] = this.ownerFilter;
    this.filterStore['name'] = this.buildNameFilter;
    this.filterStore['genotype'] = this.genotypeFilter == 'Any' ? '' : this.genotypeFilter;
    this.filterStore['public'] = this.mode != 'delete' ? true : null;
    this.filterStore['sort'] = {
      ascending: this.ascending,
      sortBy: this.sortBy
    };
    this.filterStore['page'] = this.page;
    this.filterStore['tags'] = this.chosenTags.length > 0 ? this.chosenTags : undefined;
    console.log(this.filterStore);
  }
  async fetchBuilds() {
    this.constructBuildFilters();
    let response = await getBuilds(this.filters);
    if (response.error) {
      console.error(response);
      return;
    }
    this.builds = response.builds;
    this.working = false;
    if (this.builds.length == response.maxBuilds) this.hitMax = true;
  }
  async fetchMoreBuilds() {
    if (this.hitMax) return;
    this.working = true;
    this.page++;
    this.constructBuildFilters();
    let response = await getBuilds(this.filters);
    if (response.error) {
      console.error(response);
      return;
    }
    this.builds = this.builds.concat(response.builds);
    this.working = false;
    if (this.builds.length == response.maxBuilds) this.hitMax = true;
  }
  checkPosition(event) {
    if (this.hitMax) return;
    this.doc = document.documentElement;
    this.body = document.body;
    this.perc = (this.doc['scrollTop'] || this.body['scrollTop']) / ((this.doc['scrollHeight'] || this.body['scrollHeight']) - this.doc.clientHeight) * 100;
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        if (this.perc > 80) {
          this.fetchMoreBuilds();
        }
        this.ticking = false;
      });
      this.ticking = true;
    }
  }
  updateAuthor(event) {
    this.ownerFilter = event.currentTarget.value;
    this.runSearch();
  }
  updateName(event) {
    this.buildNameFilter = event.currentTarget.value;
    this.runSearch();
  }
  updateGenotype(event) {
    this.genotypeFilter = event.detail;
    this.runSearch();
  }
  updateSort(event) {
    this.sortBy = event.detail;
    this.runSearch();
  }
  updateOrder(event) {
    this.ascending = !this.ascending;
    this.runSearch();
  }
  changeTag(event) {
    if (event.detail.activated) {
      this.chosenTags.push(event.detail.label);
      this.runSearch();
      return;
    }
    this.chosenTags = this.chosenTags.filter(tag => tag != event.detail.label);
    this.runSearch();
  }
  sortBuilds() {
    let sorter = [...this.builds];
    this.displayBuilds = sorter.sort((a, b) => {
      let valA;
      let valB;
      switch (this.sortBy) {
        case 'Likes':
          return this.ascending ? a.likes.length - b.likes.length : b.likes.length - a.likes.length;
        case 'Created Date':
          valA = Date.UTC(a.created);
          valB = Date.UTC(b.created);
          return this.ascending ? valA - valB : valB - valA;
        case 'Last Updated':
          valA = Date.UTC(a.updated);
          valB = Date.UTC(b.updated);
          return this.ascending ? valA - valB : valB - valA;
      }
    });
  }
  runSearch() {
    this.hitMax = false;
    this.page = 0;
    this.fetchBuilds();
  }
}
_registerDecorators(BuildLibrary, {
  publicProps: {
    mode: {
      config: 0
    },
    headerText: {
      config: 0
    },
    filters: {
      config: 3
    }
  },
  track: {
    builds: 1
  },
  fields: ["filterStore", "ghostBuilds", "popup", "ownerFilter", "buildNameFilter", "genotypeFilter", "sortBy", "ascending", "working", "contextUserId", "page", "hitMax", "hideFilters", "chosenTags"]
});
export default _registerComponent(BuildLibrary, {
  tmpl: _tmpl
});