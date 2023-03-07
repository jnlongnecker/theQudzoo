import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./profile.html";
class Profile extends LightningElement {
  constructor() {
    super();
    this.user = void 0;
    this.fetchUser();
  }
  get userExists() {
    return this.user ? true : false;
  }
  get libraryFilters() {
    return {
      "owner.username": this.user.username
    };
  }
  async fetchUser() {
    let response = await fetch("/db/authenticated");
    if (!response.ok) {
      console.log("User not authenticated");
      window.location.replace("/");
    }
    this.user = await response.json();
  }
}
_registerDecorators(Profile, {
  fields: ["user"]
});
export default _registerComponent(Profile, {
  tmpl: _tmpl
});