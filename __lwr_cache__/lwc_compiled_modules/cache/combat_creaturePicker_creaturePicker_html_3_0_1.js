import _implicitStylesheets from "./creaturePicker.css";

import _implicitScopedStylesheets from "./creaturePicker.scoped.css?scoped=true";

import _combatStatSpread from "combat/statSpread";
import _inputTypeahead from "input/typeahead";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, h: api_element, b: api_bind} = $api;
  const {_m0} = $ctx;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, [$cmp.currentCreature ? api_element("div", {
    classMap: {
      "creature-container": true
    },
    key: 1
  }, [api_custom_element("combat-stat-spread", _combatStatSpread, {
    props: {
      "creature": $cmp.currentCreature
    },
    key: 2
  }, [])]) : null, api_custom_element("input-typeahead", _inputTypeahead, {
    props: {
      "placeholder": "Search for a creature",
      "name": "creature-picker",
      "options": $cmp.creatureOptions
    },
    key: 3,
    on: {
      "selected": _m0 || ($ctx._m0 = api_bind($cmp.handleSelection))
    }
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
tmpl.stylesheetToken = "combat-creaturePicker_creaturePicker"
