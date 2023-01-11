import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./qudzooBanner.html";
class QudzooBanner extends LightningElement {
  constructor(...args) {
    super(...args);
    this.imageSrc = void 0;
    this.textOptions = ["caves_of_qud_guides", "mutation_overviews", "skill_breakdowns", "story_quest_walkthroughs", "demystifying_qud", "snapjaw_zero_to_chrome_hero"];
    this.chanceToSkipFrame = 0.3;
    this.pathText = void 0;
    this.textChoice = void 0;
    this.interval = void 0;
  }
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
_registerDecorators(QudzooBanner, {
  publicProps: {
    imageSrc: {
      config: 0
    }
  },
  fields: ["textOptions", "chanceToSkipFrame", "pathText", "textChoice", "interval"]
});
export default _registerComponent(QudzooBanner, {
  tmpl: _tmpl
});