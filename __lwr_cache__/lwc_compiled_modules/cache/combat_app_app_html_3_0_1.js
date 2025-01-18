import _implicitStylesheets from "./app.css";

import _implicitScopedStylesheets from "./app.scoped.css?scoped=true";

import _combatCharacterBuilder from "combat/characterBuilder";
import _combatControls from "combat/controls";
import _combatCreaturePicker from "combat/creaturePicker";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, c: api_custom_element, h: api_element} = $api;
  const {_m0, _m1} = $ctx;
  return [api_element("section", {
    classMap: {
      "app-container": true
    },
    key: 0
  }, [api_custom_element("combat-character-builder", _combatCharacterBuilder, {
    props: {
      "character": $cmp.creature
    },
    key: 1,
    on: {
      "charchange": _m0 || ($ctx._m0 = api_bind($cmp.updateCreature))
    }
  }, []), api_custom_element("combat-controls", _combatControls, {
    props: {
      "creature": $cmp.creature
    },
    key: 2,
    on: {
      "charchange": _m1 || ($ctx._m1 = api_bind($cmp.updateCreature))
    }
  }, []), api_custom_element("combat-creature-picker", _combatCreaturePicker, {
    key: 3
  }, [])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "combat-app_app"
