import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./characterBuilder.html";
import { getCreatures } from "c/api";
import { LevelUpAction } from "combat/actions";
class CharacterBuilder extends LightningElement {
  get character() {
    return this._character;
  }
  set character(value) {
    if (!value) return;
    this._character = value;
  }
  constructor() {
    super();
    this._character = void 0;
    this.pullCreatures();
  }
  async pullCreatures() {
    let creatures = await getCreatures();
    this.character = creatures.filter(creatureData => creatureData.name.includes('Player'))[0];
    this.dispatchEvent(new CustomEvent('charchange', {
      detail: this.character
    }));
  }
  toggleMode(event) {
    let mode = event.detail ? 'free' : 'level';
    this.dispatchEvent(new CustomEvent('modechange', {
      detail: mode
    }));
  }
  sendActionLevelUp() {
    this.dispatchEvent(new CustomEvent('actionlevelup', {
      detail: new LevelUpAction(),
      bubbles: true,
      composed: true
    }));
  }
  sendActionLevelReset() {
    this.dispatchEvent(new CustomEvent('actionlevelreset', {
      bubbles: true,
      composed: true
    }));
  }
}
_registerDecorators(CharacterBuilder, {
  publicProps: {
    character: {
      config: 3
    }
  },
  fields: ["_character"]
});
export default _registerComponent(CharacterBuilder, {
  tmpl: _tmpl
});