import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./profile.html";
class Profile extends LightningElement {
  constructor() {
    super();
    this.user = void 0;
    this.editingName = false;
    this.nameInput = void 0;
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
  allowEdit(event) {
    event.stopPropagation();
    this.editingName = true;
  }
  endEdit() {
    this.editingName = false;
    this.nameInput = this.template.querySelector('input');
    this.user.name = this.nameInput.value;
    this.saveUser();
  }
  confirmEdit(event) {
    if (event.key === 'Enter') {
      this.endEdit();
    }
  }
  async saveUser() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let rawBody = JSON.stringify(this.user);
    let reqOptions = {
      method: "POST",
      headers: headers,
      body: rawBody
    };
    let response = await fetch("/db/users", reqOptions);
    if (!response.ok) {
      console.log(await response.text());
    }
    this.user = await response.json();
  }
}
_registerDecorators(Profile, {
  track: {
    user: 1
  },
  fields: ["editingName", "nameInput"]
});
export default _registerComponent(Profile, {
  tmpl: _tmpl
});