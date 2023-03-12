import { api, LightningElement, track } from "lwc";
import { fetchBuildCodeForPayload, fetchJsonForBuildCode } from "build/buildCodeHandler";
import { isLoggedIn } from "c/api";


export default class BuilderContainer extends LightningElement {
    mutantSelected = true;

    saveRequested = false;

    userLoggedIn;

    buildCode = "";
    inputForCopying;
    lastBuildCode;

    @track
    sanitisedBuild;

    clipboardPath = "M16 10c3.469 0 2 4 2 4s4-1.594 4 2v6h-10v-12h4zm.827-2h-6.827v16h14v-8.842c0-2.392-4.011-7.158-7.173-7.158zm-8.827 12h-6v-16h4l2.102 2h3.898l2-2h4v2.145c.656.143 1.327.391 2 .754v-4.899h-3c-1.229 0-2.18-1.084-3-2h-8c-.82.916-1.771 2-3 2h-3v20h8v-2zm2-18c.553 0 1 .448 1 1s-.447 1-1 1-1-.448-1-1 .447-1 1-1zm4 18h6v-1h-6v1zm0-2h6v-1h-6v1zm0-2h6v-1h-6v1z";
    checkPath = "M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z";

    usePath = this.clipboardPath;

    @api
    get code() {
        return this.buildCode;
    }

    set code(newCode) {
        this.buildCode = newCode;
        this.build.code = newCode;
        this.initializeFromExistingCode();
    }

    get codeAvailable() {
        return this.buildCode ? true : false;
    }

    @track
    build = {
        _id: null,
        code: "",
        name: "",
        owner: null,
        public: false,
        likes: 0,
    }

    @api
    get startingbuild() {
        return this.build;
    }

    set startingbuild(b) {
        if (!b) return;
        this.build = b;
        this.buildCode = this.build.code;
        this.initializeFromExistingCode();
    }

    get isSaveable() {
        if (!this.buildCode) return false;
        return this.userLoggedIn;
    }

    get buildName() {
        return this.build.name;
    }

    get isPublic() {
        return this.build.public;
    }

    get truekinSelected() {
        return !this.mutantSelected;
    }

    @api
    get idval() {
        return this.build._id;
    }

    set idval(idVal) {
        if (!idVal) return;
        this.build._id = idVal;
    }

    connectedCallback() {
        this.inputForCopying = document.createElement("input");
        isLoggedIn().then(result => {
            this.userLoggedIn = result;
        });
    }

    tabSwitch(event) {
        let selectedAttribute = document.createAttribute("selected");
        if (event.currentTarget.textContent == "Mutants") {
            this.mutantSelected = true;
            event.currentTarget.setAttributeNode(selectedAttribute);
            event.currentTarget.nextSibling.removeAttribute("selected");
            this.template.host.style.setProperty("--code-color", "var(--mutation-color");
        }
        else {
            this.mutantSelected = false;
            event.currentTarget.setAttributeNode(selectedAttribute);
            event.currentTarget.previousSibling.removeAttribute("selected");
            this.template.host.style.setProperty("--code-color", "var(--intelligence-color");
        }
    }

    updateName(event) {
        let newName = event.currentTarget.value;
        this.lastBuildCode.name = newName;
        this.fetchCode(this.lastBuildCode);
    }

    calculateBuildCode(event) {
        if (!this.nameInput) {
            this.nameInput = this.template.querySelector(".build-action .name-input");
        }
        let payload = event.detail;
        payload.name = this.nameInput.value;
        this.lastBuildCode = payload;
        this.fetchCode(payload);
    }

    async fetchCode(payload) {
        let result = await fetchBuildCodeForPayload(payload);
        this.buildCode = result;
        this.build.code = result;
    }

    copyCode(event) {

        if (!this.buildCode) {
            let el = event.currentTarget.addEventListener("animationend", (event) => {
                event.currentTarget.classList.remove("shake");
                event.currentTarget.removeEventListener("animationend", el);
            });
            event.currentTarget.classList.add("shake");
            return;
        }

        this.inputForCopying.value = this.buildCode;
        this.inputForCopying.select();
        this.inputForCopying.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(this.inputForCopying.value);

        event.currentTarget.firstChild.classList.remove("grow");
        event.currentTarget.firstChild.classList.add("shrink");



        let funcA = (ev) => {
            if (ev.currentTarget.classList.contains("shrink")) {
                ev.currentTarget.classList.remove("shrink");
                ev.currentTarget.classList.add("grow");
                this.usePath = this.checkPath;
                return;
            }

            ev.currentTarget.removeEventListener("animationend", funcA);
            var lastElem = ev.currentTarget;
            setTimeout(() => {
                lastElem.classList.remove("grow");
                lastElem.classList.add("shrink");
                let funcB = (evnt) => {
                    evnt.currentTarget.classList.remove("shrink");
                    evnt.currentTarget.classList.add("grow");
                    this.usePath = this.clipboardPath;

                    evnt.currentTarget.removeEventListener("animationend", funcB);
                }
                let el = lastElem.addEventListener("animationend", funcB);
            }, 1000);
        }

        event.currentTarget.firstChild.addEventListener("animationend", funcA);
    }

    saveClick() {
        if (!this.buildCode) return;
        this.saveRequested = true;
    }

    saveCancel() {
        this.saveRequested = false;
    }

    async saveBuild(event) {
        event.preventDefault();
        if (!this.buildCode) return;

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let rawBody = JSON.stringify(this.build);

        let reqOptions = {
            method: "POST",
            headers: headers,
            body: rawBody,
        }

        let response = await fetch("/db/savebuild", reqOptions);

        if (!response.ok) {
            console.log(await response.text());
        }

        this.build = JSON.parse((await response.json()).build);
        this.saveRequested = false;
    }

    async initializeFromExistingCode() {
        let fullBuild = await fetchJsonForBuildCode(this.buildCode);

        let genotype = fullBuild.modules[0].data.Genotype;
        let subtype = fullBuild.modules[1].data.Subtype;
        let name = fullBuild.modules[4].data.name;
        let attributes;
        let selections;
        let pointsUsed;
        let mpRemaining;

        if (genotype == "Mutant") {
            attributes = fullBuild.modules[3].data.PointsPurchased;
            selections = fullBuild.modules[2].data.selections;
            pointsUsed = 0 - fullBuild.modules[3].data.apSpent;
            console.log(fullBuild.modules[3].data.apSpent);
            mpRemaining = fullBuild.modules[2].data.mp;
            this.template.querySelector(".tabs button:first-child").click();
        }
        else {
            attributes = fullBuild.modules[2].data.PointsPurchased;
            selections = fullBuild.modules[3].data.selections;
            pointsUsed = 0 - fullBuild.modules[2].data.apSpent;
            mpRemaining = 0;
            this.template.querySelector(".tabs button:nth-child(2)").click();
        }

        this.sanitisedBuild = {
            attributes: attributes,
            selections: selections,
            pointsUsed: pointsUsed,
            mpRemaining: mpRemaining,
            genotype: genotype,
            subtype: subtype
        }

        this.template.querySelector(".build-action .name-input").value = name;
    }

    updateBuildName(event) {
        this.build.name = event.currentTarget.value;
    }

    updateAccessibility(event) {
        this.build.public = !this.build.public;
        console.log(this.build.public);
    }

    stopProp(event) {
        event.stopPropagation();
    }
}