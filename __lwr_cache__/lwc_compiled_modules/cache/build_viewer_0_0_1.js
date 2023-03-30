import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./viewer.html";
class Viewer extends LightningElement {
  constructor(...args) {
    super(...args);
    this._buildInfo = void 0;
  }
  get buildInfo() {
    return this._buildInfo;
  }
  set buildInfo(newInfo) {
    this._buildInfo = JSON.parse(newInfo);
  }
  get holderClass() {
    let ret = 'button-holder';
    if (!this.buildInfo) return ret;
    return this.buildInfo.genotype == 'True Kin' ? ret + ' true-kin' : ret + 'mutant';
  }
  get tagBlurb() {
    let tags = this.buildInfo.tags;
    if (!tags || !tags.length) {
      return `The build maker didn't put any tags, so your guess is as good as mine as to how to play it!`;
    }
    let combatTags = tags.filter(tag => tag === 'Melee' || tag === 'Ranged' || tag === 'Esper');
    let difficultyTags = tags.filter(tag => tag === 'Beginner' || tag === 'Intermediate' || tag === 'Advanced');
    let combatBlurb = this.buildCombatBlurb(combatTags);
    let difficultyBlurb = this.buildDifficultyBlurb(difficultyTags);
    return difficultyBlurb + ' ' + combatBlurb;
  }
  stopBubble(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  copyCode(event) {
    this.stopBubble(event);
    if (!this.inputForCopying) {
      this.inputForCopying = document.createElement("input");
    }
    this.inputForCopying.value = this._buildInfo.code;
    this.inputForCopying.select();
    this.inputForCopying.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(this.inputForCopying.value);
  }
  buildCombatBlurb(tags) {
    if (!tags || !tags.length || tags.length === 3) {
      return 'The build maker doesn\'t recommend any particular combat style.';
    }
    let isMelee = tags.includes('Melee');
    let isRanged = tags.includes('Ranged');
    let isEsper = tags.includes('Esper');
    if (isMelee && isRanged) {
      return 'The recommended combat style is a hybrid of melee and ranged.';
    }
    if (isMelee && isEsper) {
      return 'The recommended combat style is melee with mental mutation support.';
    }
    if (isRanged && isEsper) {
      return 'The recommended combat style is ranged with mental mutation support.';
    }
    if (isMelee) {
      return 'It specializes and thrives in melee combat.';
    }
    if (isRanged) {
      return 'It specializes in keeping distance and relies on guns.';
    }
    if (isEsper) {
      return 'It relies heavily on mental mutations.';
    }
  }
  buildDifficultyBlurb(tags) {
    if (!tags || !tags.length || tags.length === 3) {
      return 'This build is for anyone.';
    }
    let isBeginner = tags.includes('Beginner');
    let isIntermediate = tags.includes('Intermediate');
    let isAdvanced = tags.includes('Advanced');
    if (isBeginner && !isIntermediate && !isAdvanced) {
      return 'This build has a low skill floor, so is recommended for beginners.';
    }
    if (isBeginner && isAdvanced) {
      return 'This build has a low skill floor, but a high skill ceiling. This is a great build to come back to.';
    }
    if (isBeginner && isIntermediate) {
      return 'This build has a low skill floor, but a moderate skill ceiling. This is a great build for learning.';
    }
    if (!isBeginner && isIntermediate && !isAdvanced) {
      return 'This build requires some knowledge to use properly, but isn\'t too advanced.';
    }
    if (isIntermediate && isAdvanced) {
      return 'This build takes knowledge to use and even more knowledge to use well.';
    }
    if (!isBeginner && !isIntermediate && isAdvanced) {
      return 'This build is very difficult to even properly use; for advanced users only.';
    }
  }
}
_registerDecorators(Viewer, {
  publicProps: {
    buildInfo: {
      config: 3
    }
  },
  fields: ["_buildInfo"]
});
export default _registerComponent(Viewer, {
  tmpl: _tmpl
});