import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./builderStartup.html";
class BuilderStartup extends LightningElement {
  constructor() {
    super();
    this.choiceConfirmed = false;
    this.startingId = "";
    this.choiceConfirmed = false;
    this.error = void 0;
    this.startingBuild = void 0;
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    if (!params || !params.get("id")) return;
    this.startingId = params.get("id");
    this.loadBuildFromId(params.get("id"));
  }
  createNew() {
    this.choiceConfirmed = true;
  }
  loadCode() {
    if (!this.codeInput) {
      this.codeInput = this.template.querySelector(".build-input");
    }
    if (!this.codeInput.value) {
      console.log("clicked");
      this.error = "You've gotta at least put something in there";
      return;
    }
    this.startingBuild = {
      _id: null,
      code: this.codeInput.value,
      name: "",
      owner: null,
      public: false,
      likes: 0
    };
    this.choiceConfirmed = true;
  }
  async loadBuildFromId(id) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("filters", JSON.stringify({
      _id: id
    }));
    let reqOptions = {
      method: "GET",
      headers: headers
    };
    let response = await fetch("/db/builds", reqOptions);
    if (!response.ok) {
      console.error(await response.text());
      return;
    }
    this.startingBuild = (await response.json()).builds[0];
    this.choiceConfirmed = true;
  }
}
_registerDecorators(BuilderStartup, {
  fields: ["choiceConfirmed", "startingId", "choiceConfirmed", "error", "startingBuild"]
});
export default _registerComponent(BuilderStartup, {
  tmpl: _tmpl
});