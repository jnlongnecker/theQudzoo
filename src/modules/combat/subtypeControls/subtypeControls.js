import { LightningElement, track, api } from "lwc";
import { getSubtypes } from "c/api";
import { fire } from "c/componentEvents";
import { SubtypeChangeAction } from "combat/actions";

export default class SubtypeControls extends LightningElement {



    @track callings = [];
    @track castes = [];
    isKin = false;

    subtypeHtml;
    selectedSubtype;

    @api
    get creature() { }
    set creature(value) {
        if (!value) return;
        let subtypeName = value.subtype.name;
        this.selectedSubtype = subtypeName;
        this.subtypeSelected({ currentTarget: { dataset: { subtype: subtypeName } } }, false);
    }

    constructor() {
        super();
        this.fetchSubtypeInfo();
    }

    toggleGenotype(event) {
        this.isKin = event.detail;
        if (this.isKin) {
            this.casteHovered({ currentTarget: { dataset: { subtype: 'Horticulturist' } } });
        } else {
            this.callingHovered({ currentTarget: { dataset: { subtype: 'Apostle' } } });
        }
        fire('genotypechangeevent', { detail: event.detail });
    }

    callingHovered(event) {
        let key = event.currentTarget.dataset.subtype;
        let calling = this.callings.find(elem => elem.name == key);

        let html = this.buildStartingValueHtml(calling);
        this.subtypeHtml = html;
    }

    casteHovered(event) {
        let key = event.currentTarget.dataset.subtype;
        let caste = this.findCaste(key);

        let html = this.buildStartingValueHtml(caste);
        this.subtypeHtml = html;
    }

    subtypeSelected(event, broadcast = true) {
        let key = event.currentTarget.dataset.subtype;
        let subtype;
        this.callings = this.callings.map(elem => {
            elem.class = '';
            if (elem.name === key) {
                elem.class = 'selected';
                subtype = elem;
            }
            return elem;
        });
        this.castes = this.castes.map(category => {
            category.categoryCastes = category.categoryCastes.map(caste => {
                caste.class = '';
                if (caste.name === key) {
                    caste.class = 'selected';
                    subtype = caste;
                }
                return caste;
            });
            return category;
        });

        if (broadcast) fire('actionevent', { detail: new SubtypeChangeAction(subtype) });
    }

    buildStartingValueHtml(subtype) {
        let html = '';
        for (let stat of subtype.stats) {
            let sign = stat.Bonus >= 0 ? '+' : '';
            let name = stat.Name;
            if (name === 'HeatResistance') name = 'heat resistance';
            else if (name === 'ColdResistance') name = 'cold resistance';
            html += `- ${sign}${stat.Bonus} ${name}\n`;
        }
        if (subtype.saveModifiers) {
            for (let save of subtype.saveModifiers) {
                let sign = Number.parseInt(save.Amount) >= 0 ? '+' : '';
                html += `- ${sign}${save.Amount} to saves vs. ${save.Vs.toLowerCase()}\n`;
            }
        }
        for (let skillName in subtype.skills) {
            html += `- ${subtype.skills[skillName]} \n`;
        }
        return html;
    }

    findCaste(casteName) {
        for (let category of this.castes) {
            for (let caste of category.categoryCastes) {
                if (caste.name === casteName) return caste;
            }
        }
    }

    async fetchSubtypeInfo() {
        let callingJson = await getSubtypes();
        this.callings = callingJson.callings;
        this.castes = callingJson.castes;
        if (this.isKin) {
            this.casteHovered({ currentTarget: { dataset: { subtype: 'Horticulturist' } } });
        } else {
            this.callingHovered({ currentTarget: { dataset: { subtype: 'Apostle' } } });
        }
        if (this.selectedSubtype) {
            this.subtypeSelected({ currentTarget: { dataset: { subtype: this.selectedSubtype } } }, false);
        }
    }
}