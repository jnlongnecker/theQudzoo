import { api, LightningElement, track } from "lwc";
import { fetchBuildCodeForPayload, fetchJsonForBuildCode } from "build/buildCodeHandler";
import { isLoggedIn, saveBuild } from "c/api";


export default class Container extends LightningElement {
    mutantSelected = true;

    saveRequested = false;

    userLoggedIn;

    buildCode = "";
    inputForCopying;
    lastBuildCode;

    @track
    sanitisedBuild;

    @api
    get code() {
        return this.buildCode;
    }

    set code(newCode) {
        this.buildCode = newCode;
        this.currBuild.code = newCode;
        this.initializeFromExistingCode();
    }

    get codeAvailable() {
        return this.buildCode ? true : false;
    }

    @track
    currBuild = {
        _id: null,
        code: "",
        name: "",
        owner: null,
        description: "",
        public: false,
        likes: [],
        tags: [],
        genotype: 'Mutated Human',
    }

    @api
    get startingbuild() {
        return this.currBuild;
    }

    set startingbuild(b) {
        if (!b) return;
        this.currBuild = b;
        this.buildCode = this.currBuild.code;
        this.initializeFromExistingCode();
    }

    get isBeginner() {
        if (!this.currBuild.tags) return false;
        return this.currBuild.tags.includes('Beginner');
    }

    get isIntermediate() {
        if (!this.currBuild.tags) return false;
        return this.currBuild.tags.includes('Intermediate');
    }

    get isAdvanced() {
        if (!this.currBuild.tags) return false;
        return this.currBuild.tags.includes('Advanced');
    }

    get isMelee() {
        if (!this.currBuild.tags) return false;
        return this.currBuild.tags.includes('Melee');
    }

    get isRanged() {
        if (!this.currBuild.tags) return false;
        return this.currBuild.tags.includes('Ranged');
    }

    get isEsper() {
        if (!this.currBuild.tags) return false;
        return this.currBuild.tags.includes('Esper');
    }

    get isSaveable() {
        if (!this.buildCode) return false;
        return this.userLoggedIn;
    }

    get buildName() {
        return this.currBuild.name;
    }

    get isPublic() {
        return this.currBuild.public;
    }

    get truekinSelected() {
        return !this.mutantSelected;
    }

    @api
    get idval() {
        return this.currBuild._id;
    }

    set idval(idVal) {
        if (!idVal) return;
        this.currBuild._id = idVal;
    }

    get popupClass() {
        return this.saveRequested ? "popup-background" : "in-build"
    }

    get btnTitle() {
        if (!this.codeAvailable) return 'You must have a build to save first.';
        if (!this.isSaveable) return 'You must be logged in to save a build.';
        return '';
    }

    connectedCallback() {
        this.inputForCopying = document.createElement("input");
        isLoggedIn().then(result => {
            this.userLoggedIn = result;
        });
    }

    tabSwitch(event) {
        let selectedAttribute = document.createAttribute("selected");
        this.currBuild = { ...this.currBuild };
        if (event.currentTarget.textContent == "Mutants") {
            this.mutantSelected = true;
            event.currentTarget.setAttributeNode(selectedAttribute);
            event.currentTarget.nextSibling.removeAttribute("selected");
            this.template.host.style.setProperty("--code-color", "var(--mutation-color");
            this.currBuild.genotype = 'Mutated Human';
        }
        else {
            this.mutantSelected = false;
            event.currentTarget.setAttributeNode(selectedAttribute);
            event.currentTarget.previousSibling.removeAttribute("selected");
            this.template.host.style.setProperty("--code-color", "var(--intelligence-color");
            this.currBuild.genotype = 'True Kin';
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
        this.currBuild = JSON.parse(JSON.stringify(this.currBuild));
        this.currBuild.code = result;
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

        this.currBuild = JSON.parse((await saveBuild(this.currBuild)).build);
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

        if (genotype != "True Kin") {
            attributes = fullBuild.modules[3].data.PointsPurchased;
            selections = fullBuild.modules[2].data.selections;
            pointsUsed = 0 - fullBuild.modules[3].data.apSpent;
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

        console.log(JSON.parse(JSON.stringify(this.currBuild)));
        this.sanitisedBuild = {
            attributes: attributes,
            selections: selections,
            pointsUsed: pointsUsed,
            mpRemaining: mpRemaining,
            genotype: genotype,
            subtype: subtype,
            description: this.currBuild.description
        }

        this.template.querySelector(".build-action .name-input").value = name;
    }

    updateBuildName(event) {
        this.currBuild.name = event.currentTarget.value;
    }

    updateAccessibility(event) {
        console.log('updating');
        this.currBuild.public = event.detail;
    }

    stopProp(event) {
        event.stopPropagation();
    }

    handleTagSelect(event) {
        if (event.detail.activated) {
            this.currBuild.tags.push(event.detail.label);
            return;
        }

        this.currBuild.tags = this.currBuild.tags.filter(tag => tag != event.detail.label);
    }

    handleDescriptionUpdate(event) {
        this.currBuild.description = event.detail;
    }
}