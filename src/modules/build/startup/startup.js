import { LightningElement } from "lwc";
import { getBuilds } from "c/api";

export default class BuilderStartup extends LightningElement {

    choiceConfirmed = false;

    startingId = "";
    choiceConfirmed = false;

    error;
    startingBuild;

    constructor() {
        super();
        const params = new URLSearchParams(window.location.search);
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
            likes: 0,
        }
        this.choiceConfirmed = true;
    }

    async loadBuildFromId(id) {
        let response = await getBuilds({ _id: id });

        this.startingBuild = response.builds[0];
        this.choiceConfirmed = true;
    }
}