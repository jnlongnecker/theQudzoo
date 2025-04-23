import { api, LightningElement } from "lwc";
import { getSkillData } from "c/api";
import { fire, register } from "c/componentEvents";

export default class SkillControls extends LightningElement {

    skills = [];
    selectedCategory;
    selectedSkill;

    skillPoints = 0;

    @api
    get creature() { }
    set creature(value) {
        this.skillPoints = value.skillPoints - value.skillExpenditure.spent;
    }

    constructor() {
        super();
        this.fetchSkills();
        register('refreshplayerevent', (e) => this.skillPoints = e.detail.skillPoints - e.detail.skillExpenditure.spent);
    }

    async fetchSkills() {
        this.skills = await getSkillData();
    }

    selectCategory(event) {
        let categoryName = event.currentTarget.dataset.category;

        this.selectedCategory = this.skills.find(category => category.name === categoryName);
    }

    handleBack() {
        this.selectedCategory = null;
        this.selectedSkill = null;
    }

    selectSkill(event) { }

    updateBlurb(event) {
        let skillName = event.currentTarget.dataset.skill;
        this.selectedSkill = this.selectedCategory.categorySkills.find(skill => skill.name === skillName);
    }
}