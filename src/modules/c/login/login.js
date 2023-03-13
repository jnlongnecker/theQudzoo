import { LightningElement } from "lwc";
import { attemptLogin, attemptRegister, logout as logMeOut, getAuthenticatedUser } from "c/api";

export default class Login extends LightningElement {

    authenticated = false;

    useLogin = true;
    showPopup = false;
    errorMessage;
    displayName;

    clickCount = 0;

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
        this.runAuth();
    }

    connectedCallback() {
        window.onclick = (event) => {
            if (this.clickCount == 0) this.showPopup = false;
            this.clickCount = 0;
        }
    }

    componentClicked() {
        this.clickCount = -1;
    }

    dismissError() {
        this.errorMessage = "";
    }

    runAuth() {
        getAuthenticatedUser().then(result => {
            this.authenticated = result.username ? true : false;
            this.displayName = result.name;
        })
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
        let result = await attemptLogin(username, password);
        if (!result.success) {
            this.errorMessage = result.message;
            return;
        }

        location.reload();
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
        let result = await attemptRegister(username, password);
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
            }
        }

        if (!username) {
            return {
                valid: false,
                message: "Username is required."
            }
        }

        if (!password) {
            return {
                valid: false,
                message: "Password is required."
            }
        }

        if (!username.match(/^[\w_\-\d]*$/)) {
            return {
                valid: false,
                message: "Username can only include -, _ and alphanumeric characters."
            }
        }

        if (username.length < 5) {
            return {
                valid: false,
                message: "Username must be at least 5 characters long."
            }
        }

        if (username.length > 15) {
            return {
                valid: false,
                message: "Username can be up to 15 characters long."
            }
        }

        if (password.length < 7) {
            return {
                valid: false,
                message: "Password must be at least 7 characters long."
            }
        }

        return {
            valid: true
        }
    }

    logout() {
        this.showPopup = false;
        console.log(logMeOut);
        logMeOut().then(() => {
            location.reload();
        });
    }

    cancelLogin() {
        this.showPopup = false;
    }

    stopBubble(event) {
        event.stopPropagation();
    }
}