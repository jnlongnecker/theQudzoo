import { LightningElement, api } from "lwc";

export default class QudzooBanner extends LightningElement {

    @api
    imageSrc;

    textOptions = [
        "caves_of_qud_guides",
        "mutation_overviews",
        "skill_breakdowns",
        "story_quest_walkthroughs",
        "demystifying_qud",
        "snapjaw_zero_to_chrome_hero"
    ];

    chanceToSkipFrame = 0.3;

    pathText;

    textChoice;

    interval;

    blinkerClass = "";

    connectedCallback() {
        let randomOptionIndex = Math.floor(Math.random() * this.textOptions.length);
        this.textChoice = this.textOptions[randomOptionIndex];

        this.startTypeAnimation();
    }

    startTypeAnimation() {
        let index = 0;
        this.pathText = "";
        this.interval = setInterval(() => {
            if (index >= this.textChoice.length) {
                clearInterval(this.interval);
                this.blinkerClass = "blinker";
                return;
            }

            let randomChoice = Math.random();
            if (randomChoice <= this.chanceToSkipFrame) {
                return;
            }

            this.pathText += this.textChoice[index];
            index++;
        }, 100);
    }
}