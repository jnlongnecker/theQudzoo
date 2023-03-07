import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./builderStartup.html";
class BuilderStartup extends LightningElement {
  constructor() {
    super();
    this.choiceConfirmed = false;
    this.startingCode = "";
    this.startingId = "";
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
    this.startingCode = (await response.json()).builds[0].code;
    this.choiceConfirmed = true;
  }
}
_registerDecorators(BuilderStartup, {
  fields: ["choiceConfirmed", "startingCode", "startingId"]
});
export default _registerComponent(BuilderStartup, {
  tmpl: _tmpl
});