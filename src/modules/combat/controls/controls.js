import { LightningElement, api } from "lwc";

export default class Controls extends LightningElement {

    showEquipment;
    showSkills;
    showCombat;
    showAttributes = true;

    @api mode;
    @api creature;
    @api enemy;

    changeTab(event) {
        let target = event.target;
        for (let child of event.currentTarget.children) {
            child.classList.remove('selected');
        }
        target.classList.add('selected');
        this.showEquipment = target.innerHTML == 'Equipment';
        this.showSkills = target.innerHTML == 'Skills';
        this.showAttributes = target.innerHTML == 'Attributes';
        this.showCombat = target.innerHTML == 'Combat';
    }
}