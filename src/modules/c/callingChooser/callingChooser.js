import { LightningElement, api, track } from "lwc";

export default class CallingChooser extends LightningElement {

    @track
    callings = [];

    starterList;
    sugarInjector;

    @api
    get calling() {
        return false;
    }

    set calling(c) {
        if (!c) return;
        this.setSelectedCalling(c);
    }

    constructor() {
        super();
        this.fetchCallingInfo();
    }
    connectedCallback() {
        this.sugarInjector = this.template.querySelector("c-sugar-injector");
        this.starterList = this.template.querySelector(".starter-list");
    }

    callingHovered(event) {
        if (!this.sugarInjector) {
            this.sugarInjector = this.template.querySelector("c-sugar-injector");
        }
        if (!this.starterList) {
            this.starterList = this.template.querySelector(".starter-list");
        }
        let key = event.currentTarget.getAttribute("calling");
        let calling = this.callings.find(elem => elem.name == key);

        let startingValues = calling.starters.map(elem => `<li>${this.sugarInjector.highlightText(elem)}</li>`);
        let html = startingValues.reduce((prev, elem) => prev + elem);
        this.starterList.innerHTML = html;
    }

    callingSelected(event) {
        let key = event.currentTarget.getAttribute("calling");
        let calling = this.callings.find(elem => elem.name == key);
        this.callings.map(elem => {
            elem.class = "selected";
            if (elem.name != calling.name)
                elem.class = "";
            return elem;
        });

        const payload = {
            id: "calling info",
            callingName: calling.name,
            attributeModifiers: calling.modifiers
        };

        let evt = new CustomEvent("callingselected", { detail: payload });
        this.dispatchEvent(evt);
    }

    async setSelectedCalling(clng) {

        while (!this.callings.length > 0) {
            await new Promise(t => setTimeout(t, 100));
        }

        let calling = this.callings.find(elem => elem.name == clng);

        this.callings.map(elem => {
            elem.class = "selected";
            if (elem.name != calling.name)
                elem.class = "";
            return elem;
        });
        const payload = {
            id: "calling info",
            callingName: calling.name,
            attributeModifiers: calling.modifiers
        };

        let evt = new CustomEvent("callingselected", { detail: payload });
        this.dispatchEvent(evt);
    }

    async fetchCallingInfo() {
        let request = new Request("/api/callings");
        let response = await fetch(request);
        if (!response.ok) {
            console.error(await response.text());
            return;
        }

        let callingJson = await response.json();
        this.callings = callingJson.callings;
    }
}