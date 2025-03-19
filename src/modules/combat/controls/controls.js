import { LightningElement, api } from "lwc";

export default class Controls extends LightningElement {

    showEquipment;
    showSkills;
    showCombat;
    showMutations;
    showCybernetics;
    showAttributes = true;

    _creature;
    @api mode;
    @api enemy;

    @api get creature() {
        return this._creature;
    }

    set creature(value) {
        if (!value || !value.creature) return;
        let newCreature = {
            creature: value.creature,
            count: value.count + 1,
        };
        this._creature = newCreature;
    }

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
        this.showMutations = target.innerHTML == 'Mutations';
        this.showCybernetics = target.innerHTML == 'Cybernetics';
    }
}