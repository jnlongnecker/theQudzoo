import _tmpl from "./tagNames.html";
import { registerComponent as _registerComponent } from "lwc";
const tags = {
  Beginner: 'willpower',
  Intermediate: 'agility',
  Advanced: 'toughness',
  Esper: 'ego',
  Melee: 'strength',
  Ranged: 'skill'
};
export default _registerComponent(tags, {
  tmpl: _tmpl
});