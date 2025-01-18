import { LightningElement, api } from "lwc";

export default class Controls extends LightningElement {

    showEquipment;
    showSkills;
    showCombat;
    showAttributes = true;

    @api creature;

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

    updateAttributes(event) {
        let attr = event.detail.attributes;
        let newCreature = JSON.parse(JSON.stringify(this.creature));

        newCreature.attributes.strength = attr.Strength;
        newCreature.attributes.agility = attr.Agility;
        newCreature.attributes.toughness = attr.Toughness;
        newCreature.attributes.intelligence = attr.Intelligence;
        newCreature.attributes.willpower = attr.Willpower;
        newCreature.attributes.ego = attr.Ego;

        this.creature = newCreature;
        this.dispatchEvent(new CustomEvent('charchange', { detail: this.creature }));
    }
}