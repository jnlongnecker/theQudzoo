import { api, LightningElement } from "lwc";
import { getSkillData } from "c/api";
import { fire, register } from "c/componentEvents";
import { AddSkillAction } from "combat/actions";
import Modal from "c/modal";

export default class SkillControls extends LightningElement {

    @api mode = 'level';
    skills = [];
    skillPoints = 0;

    selectedCategory;
    selectedSkill;
    creatureSkills;

    @api
    get creature() { }
    set creature(value) {
        this.creatureSkills = value.skills;
        this.skillPoints = value.skillPoints - value.skillExpenditure.spent;
        for (let category of this.skills) {
            category.unlocked = value.skills[category.name];
            category.class = `category ${category.unlocked ? 'unlocked' : 'locked'}`;
            for (let skill of category.categorySkills) {
                skill.unlocked = value.skills[skill.name];
                skill.class = `category ${skill.unlocked ? 'skill unlocked' : 'locked'}`;
            }
        }
    }

    get isLevelMode() {
        return this.mode === 'level';
    }

    constructor() {
        super();
        this.fetchSkills();
        register('refreshplayerevent', (e) => this.creature = e.detail);
    }

    async fetchSkills() {
        this.skills = await getSkillData();
        if (this.creatureSkills) {
            for (let category of this.skills) {
                category.unlocked = this.creatureSkills[category.name];
                category.class = `category ${category.unlocked ? 'unlocked' : 'locked'}`;
                for (let skill of category.categorySkills) {
                    skill.unlocked = this.creatureSkills[skill.name];
                    skill.class = `category ${skill.unlocked ? 'unlocked' : 'locked'}`;
                }
            }
        }
    }

    selectCategory(event) {
        let categoryName = event.currentTarget.dataset.category;

        this.selectedCategory = this.skills.find(category => category.name === categoryName);
    }

    handleBack() {
        this.selectedCategory = null;
        this.selectedSkill = null;
    }

    async selectSkill(event) {
        this.updateBlurb(event);

        // Category must be unlocked before any of the skills are
        if (!this.selectedCategory.unlocked) {

            // Wait for confirmation, do nothing if unconfirmed
            if (await this.confirmBuyCategory()) {

                // Unlock the category, free skills, and selected skill
                let category = this.selectedCategory;
                category.attribute = category.categorySkills[0].attribute;
                category.minimum = category.categorySkills[0].minimum;
                if (fire('actionevent', { detail: new AddSkillAction(this.mode, category) })) {
                    // Automatically add the free skills with the category, unless the free skill is the selected skill
                    let freeSkills = category.categorySkills.filter(
                        skill => Number.parseInt(skill.cost) === 0 && skill.name !== this.selectedSkill.name);
                    for (let freeSkill of freeSkills) {
                        fire('actionevent', { detail: new AddSkillAction(this.mode, freeSkill) });
                    }
                    // Try to add the selected skill after unlocking the category
                    fire('actionevent', { detail: new AddSkillAction(this.mode, this.selectedSkill) });
                }
            }
        } else {
            // If the category is unlocked, just try to add the selected skill
            fire('actionevent', { detail: new AddSkillAction(this.mode, this.selectedSkill) });
        }

    }

    updateBlurb(event) {
        let skillName = event.currentTarget.dataset.skill;
        this.selectedSkill = this.selectedCategory.categorySkills.find(skill => skill.name === skillName);
    }

    async confirmBuyCategory() {
        let categoryName = this.selectedCategory.displayName;
        let cost = this.selectedCategory.cost;
        let skillName = this.selectedSkill.displayName;
        let result;
        try {
            result = await Modal.open({
                title: 'Confirm Category Unlock',
                bodyText: `You do not currently have the ${categoryName} category unlocked, which is a prerequisite for ${skillName}. Unlock ${categoryName} for ${cost} SP?`,
                options: [
                    { value: 'yes', label: 'Unlock' },
                    { value: 'no', label: 'Cancel' },
                ]
            });
        } catch (e) {
            return false;
        }
        if (result === 'yes') return true;
        return false;
    }
}