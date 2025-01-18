import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./characterBuilder.html";
import { getCreatures } from "c/api";
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