import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./creaturePicker.html";
import { getCreatures } from "c/api";
class CreaturePicker extends LightningElement {
  constructor() {
    super();
    this.creatures = void 0;
    this.currentCreature = void 0;
    this.creatureOptions = [];
    this.pullCreatures();
  }
  async pullCreatures() {
    this.creatures = await getCreatures();
    this.creatureOptions = this.creatures.reduce((filtered, creature, id) => {
      if (!creature.hidden) {
        filtered.push({
          primary: creature.name,
          secondary: creature.faction,
          metadata: `${creature.name.toLowerCase()} ${creature.faction.toLowerCase()}`,
          src: creature.token,
          id
        });
      }
      return filtered;
    }, []);
  }
  handleSelection(event) {
    let idx = event.detail.id;
    this.currentCreature = this.creatures[idx];
  }
}
_registerDecorators(CreaturePicker, {
  fields: ["creatures", "currentCreature", "creatureOptions"]
});
export default _registerComponent(CreaturePicker, {
  tmpl: _tmpl
});