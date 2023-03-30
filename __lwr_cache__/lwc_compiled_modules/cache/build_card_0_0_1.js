import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./card.html";
import { fetchJsonForBuildCode } from "build/buildCodeHandler";
import { deleteBuilds, likeBuild, getCallings, getCastes } from "c/api";
class BuildCard extends LightningElement {
  constructor(...args) {
    super(...args);
    this.buildInfo = void 0;
    this.buildJson = void 0;
    this.mode = "static";
    this.contextid = void 0;
    this.sugarInjector = void 0;
    this.mutationHolder = void 0;
    this.clipboardPath = "M16 10c3.469 0 2 4 2 4s4-1.594 4 2v6h-10v-12h4zm.827-2h-6.827v16h14v-8.842c0-2.392-4.011-7.158-7.173-7.158zm-8.827 12h-6v-16h4l2.102 2h3.898l2-2h4v2.145c.656.143 1.327.391 2 .754v-4.899h-3c-1.229 0-2.18-1.084-3-2h-8c-.82.916-1.771 2-3 2h-3v20h8v-2zm2-18c.553 0 1 .448 1 1s-.447 1-1 1-1-.448-1-1 .447-1 1-1zm4 18h6v-1h-6v1zm0-2h6v-1h-6v1zm0-2h6v-1h-6v1z";
    this.checkPath = "M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z";
    this.usePath = this.clipboardPath;
    this.order = {
      Strength: 1,
      Agility: 2,
      Toughness: 3,
      Intelligence: 4,
      Willpower: 5,
      Ego: 6
    };
    this.cyberneticMap = {
      BiologicalIndexer: "Optical bioscanner",
      TechnologicalIndexer: "Optical technoscanner",
      DermalInsulation: "Dermal insulation",
      NightVision: "Night vision",
      HyperElasticAnkleTendons: "Hyper-elastic ankle tendons",
      ParabolicMuscularSubroutine: "Parabolic muscular subroutine",
      TranslucentSkin: "Translucent skin",
      StabilizerArmLocks: "Stabilizer arm locks",
      RapidReleaseFingerFlexors: "Rapid release finger flexors",
      CarbideHandBones: "Carbide hand bones",
      Pentaceps: "Pentaceps",
      InflatableAxons: "Inflatable axons",
      AirCurrentMicrosensor: "Air current microsensor",
      CherubicVisage: "Cherubic visage",
      NocturnalApex: "Nocturnal apex",
      "<none>": "<none>"
    };
    this.deleting = false;
    this.subtypeBonuses = void 0;
  }
  get deletable() {
    return this.mode == "delete";
  }
  get copyable() {
    return this.mode != "static";
  }
  get editable() {
    return this.mode == "delete";
  }
  get onlyCopyable() {
    return this.copyable && !this.editable;
  }
  get build() {
    return this.buildInfo;
  }
  set build(newBuild) {
    if (!newBuild) return;
    this.buildInfo = newBuild;
    this.fetchJson();
  }
  get lastUpdated() {
    if (!this.buildInfo) return '';
    return new Date(this.buildInfo.updated).toDateString();
  }
  get created() {
    if (!this.buildInfo) return '';
    return new Date(this.buildInfo.created).toDateString();
  }
  get likes() {
    if (!this.buildInfo) return '';
    return this.buildInfo.likes.length;
  }
  get userLikedBuild() {
    if (!this.buildInfo || !this.contextid) return false;
    return this.buildInfo.likes.find(item => item.toString() == this.contextid.toString());
  }
  get likeClass() {
    return this.userLikedBuild ? 'user-liked' : 'user-not-liked';
  }
  get buildCode() {
    return this.buildInfo.code;
  }
  get buildName() {
    return this.buildInfo.name ? this.buildInfo.name : "Unnamed Build";
  }
  get displayName() {
    if (!this.buildInfo.owner) return;
    return this.buildInfo.owner.displayName ? this.buildInfo.owner.displayName : "Anonymous";
  }
  get hasOwner() {
    return this.buildInfo.owner ? true : false;
  }
  get genotype() {
    if (!this.buildJson) return;
    return this.buildJson.modules[0].data.Genotype;
  }
  get bonus() {
    if (!this.buildJson) return;
    return this.genotype == "True Kin" ? "Cybernetics" : "Mutations";
  }
  get cardClass() {
    let extension = !this.mode.includes('static') ? '' : ' static';
    if (!this.buildJson) return "card" + extension;
    return this.genotype == "True Kin" ? "card truekin" + extension : "card mutant" + extension;
  }
  get attributes() {
    if (!this.buildJson) return [];
    let obj;
    let add;
    if (this.genotype == "True Kin") {
      obj = this.buildJson.modules[2].data.PointsPurchased;
      add = 12;
    } else {
      obj = this.buildJson.modules[3].data.PointsPurchased;
      add = 10;
    }
    let arr = [];
    for (let key in obj) {
      let val = obj[key] + add;
      let bonus = 0;
      if (this.subtypeBonuses) bonus = this.subtypeBonuses[key];
      arr.push({
        i: this.order[key],
        class: key.toLowerCase(),
        name: `${key}: `,
        value: val + bonus
      });
    }
    arr.sort((a, b) => {
      if (a.i > b.i) return 1;
      if (a.i < b.i) return -1;
      return 0;
    });
    return arr;
  }
  get mutations() {
    if (!this.buildJson) return [];
    let choices;
    if (this.genotype == "True Kin") {
      choices = this.buildJson.modules[3].data.selections;
    } else {
      choices = this.buildJson.modules[2].data.selections;
    }
    let arr = [];
    if (choices.length == 0) {
      return [{
        value: "No selections"
      }];
    }
    return choices.map(choice => {
      if (this.genotype == "True Kin") {
        return {
          value: this.cyberneticMap[choice.Cybernetic]
        };
      }
      let mutText = choice.Count > 1 ? `${choice.Mutation} x${choice.Count}` : choice.Mutation;
      return {
        value: mutText
      };
    });
  }
  get subtypeName() {
    if (!this.buildJson) return;
    return this.buildJson.modules[1].data.Subtype;
  }
  get characterName() {
    if (!this.buildJson) return;
    return this.buildJson.modules[4].data.name;
  }
  get subtypeImg() {
    if (!this.buildJson) return;
    let subName = this.camelCaseSubtype();
    if (this.genotype == "True Kin") {
      return `/1/asset/s/latest/public/assets/images/casteImages/${subName}.png`;
    }
    return `/1/asset/s/latest/public/assets/images/callingImages/${subName}.png`;
  }
  get editorLink() {
    return "/builds?id=" + this.buildInfo._id;
  }
  get staticLink() {
    if (this.mode.includes('static')) return;
    return '/builds/' + this.buildInfo._id;
  }
  get remixLink() {
    if (!this.copyable) return;
    return "/builds?code=" + encodeURIComponent(this.buildCode);
  }
  get combatTags() {
    if (!this.buildInfo) return [];
    return this.buildInfo.tags.filter(tag => tag === 'Melee' || tag === 'Ranged' || tag === 'Esper');
  }
  get difficultyTags() {
    if (!this.buildInfo) return [];
    return this.buildInfo.tags.filter(tag => tag === 'Beginner' || tag === 'Intermediate' || tag === 'Advanced');
  }
  async fetchJson() {
    if (!this.buildInfo.code) return;
    let json = await fetchJsonForBuildCode(this.buildInfo.code);
    this.buildJson = json;
    if (!this.mutationHolder) {
      this.mutationHolder = this.template.querySelector(".mutation-list");
    }
    if (!this.sugarInjector) {
      this.sugarInjector = this.template.querySelector("c-sugar-injector");
    }
    while (this.sugarInjector.infoReady !== 4) {
      await new Promise(t => setTimeout(t, 100));
    }
    let sugaryValues = this.mutations.map(elem => `<li><span>${this.sugarInjector.highlightText(elem.value)}</span></li>`);
    let html = sugaryValues.reduce((prev, elem) => prev + elem);
    this.mutationHolder.innerHTML = html;
    this.fetchSubtypeBonus();
  }
  async fetchSubtypeBonus() {
    if (this.genotype == 'True Kin') {
      let castes = await getCastes();
      for (let arcology of castes.castes) {
        let caste = arcology.castes.filter(item => item.name == this.subtypeName);
        if (caste.length) {
          this.subtypeBonuses = caste[0].modifiers;
          return;
        }
      }
    }
    let callings = await getCallings();
    let calling = callings.callings.filter(item => item.name == this.subtypeName);
    this.subtypeBonuses = calling[0].modifiers;
  }
  camelCaseSubtype() {
    let subtype = this.subtypeName;
    let parts = subtype.split(/( )|(-)/);
    let ret = parts[0].toLowerCase();
    for (let i = 1; i < parts.length; i++) {
      let part = parts[i];
      if (!part) continue;
      if (part.match(/( )|(-)/)) continue;
      part = part.toLowerCase();
      part = part[0].toUpperCase() + part.substring(1);
      ret += part;
    }
    return ret;
  }
  sendToBuilder(event) {
    this.stopBubble(event);
    window.open(this.remixLink, '_blank');
  }
  editBuild(event) {
    this.stopBubble(event);
    window.open(this.editorLink, '_blank');
  }
  copyShareLink(event) {
    this.stopBubble(event);
    if (!this.inputForCopying) {
      this.inputForCopying = document.createElement("input");
    }
    this.inputForCopying.value = `https://www.qudzoo.com${'/builds/' + this.buildInfo._id}`;
    this.inputForCopying.select();
    this.inputForCopying.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(this.inputForCopying.value);
  }
  promptDelete(event) {
    this.stopBubble(event);
    this.deleting = true;
  }
  stopBubble(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  cancelDelete() {
    this.deleting = false;
  }
  async confirmDelete() {
    await deleteBuilds([this.build._id]);
    this.deleting = false;
    this.buildInfo = null;
    this.buildJson = null;
    this.dispatchEvent(new CustomEvent('deletedbuild'));
  }
  copyCode(event) {
    this.stopBubble(event);
    if (!this.inputForCopying) {
      this.inputForCopying = document.createElement("input");
    }
    this.inputForCopying.value = this.buildCode;
    this.inputForCopying.select();
    this.inputForCopying.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(this.inputForCopying.value);
  }
  async likeMyBuild() {
    let result = await likeBuild(this.buildInfo);
    this.buildInfo = JSON.parse(result.build);
  }
}
_registerDecorators(BuildCard, {
  publicProps: {
    mode: {
      config: 0
    },
    contextid: {
      config: 0
    },
    build: {
      config: 3
    }
  },
  track: {
    buildInfo: 1,
    buildJson: 1
  },
  fields: ["sugarInjector", "mutationHolder", "clipboardPath", "checkPath", "usePath", "order", "cyberneticMap", "deleting", "subtypeBonuses"]
});
export default _registerComponent(BuildCard, {
  tmpl: _tmpl
});