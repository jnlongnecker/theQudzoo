import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./login.html";
class Login extends LightningElement {
  get formTitle() {
    return this.useLogin ? "Login" : "Create Account";
  }
  get loginButtonText() {
    return this.showPopup ? "Cancel" : "Login";
  }
  get isError() {
    return this.errorMessage ? true : false;
  }
  constructor() {
    super();
    this.authenticated = false;
    this.useLogin = true;
    this.showPopup = false;
    this.errorMessage = void 0;
    this.displayName = void 0;
    this.clickCount = 0;
    this.runAuth();
  }
  connectedCallback() {
    window.onclick = event => {
      if (this.clickCount == 0) this.showPopup = false;
      this.clickCount = 0;
    };
  }
  componentClicked() {
    this.clickCount = -1;
  }
  dismissError() {
    this.errorMessage = "";
  }
  runAuth() {
    fetch("/db/authenticated").then(response => {
      response.json().then(result => {
        this.authenticated = !result.error;
        console.log(result);
        this.displayName = result.name;
      });
    });
  }
  loginDesired() {
    this.showPopup = !this.showPopup;
  }
  changeForm() {
    this.useLogin = !this.useLogin;
    console.log(sessionStorage.getItem("key"));
  }
  async login(event) {
    event.preventDefault();
    let username = event.submitter.form[0].value;
    let password = event.submitter.form[1].value;
    let result = await this.attemptLogin(username, password);
    if (!result.success) {
      this.errorMessage = result.message;
      return;
    }
    location.reload();
  }
  async attemptLogin(username, password) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let rawBody = JSON.stringify({
      "username": username,
      "password": password
    });
    let reqOptions = {
      method: "POST",
      headers: headers,
      body: rawBody
    };
    let response = await fetch("/db/login", reqOptions);
    return await response.json();
  }
  async register(event) {
    event.preventDefault();
    let username = event.submitter.form[0].value;
    let password = event.submitter.form[1].value;
    let confirmP = event.submitter.form[2].value;
    let validationCheckResult = this.runRegistrationValidation(username, password, confirmP);
    if (!validationCheckResult.valid) {
      this.errorMessage = validationCheckResult.message;
      return;
    }
    let result = await this.attemptRegister(username, password);
    if (!result.success) {
      this.errorMessage = result.message;
      return;
    }
    location.reload();
  }
  runRegistrationValidation(username, password, confirm) {
    if (password !== confirm) {
      return {
        valid: false,
        message: "Passwords do not match."
      };
    }
    if (!username) {
      return {
        valid: false,
        message: "Username is required."
      };
    }
    if (!password) {
      return {
        valid: false,
        message: "Password is required."
      };
    }
    return {
      valid: true
    };
  }
  async attemptRegister(username, password) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let rawBody = JSON.stringify({
      "username": username,
      "password": password
    });
    let reqOptions = {
      method: "POST",
      headers: headers,
      body: rawBody
    };
    let response = await fetch("/db/register", reqOptions);
    return await response.json();
  }
  logout() {
    this.showPopup = false;
    fetch("/db/logout", {
      method: "POST"
    }).then(response => {
      location.reload();
    });
  }
}
_registerDecorators(Login, {
  fields: ["authenticated", "useLogin", "showPopup", "errorMessage", "displayName", "clickCount"]
});
export default _registerComponent(Login, {
  tmpl: _tmpl
});