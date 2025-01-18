import _implicitStylesheets from "./characterBuilder.css";

import _implicitScopedStylesheets from "./characterBuilder.scoped.css?scoped=true";

import _combatStatSpread from "combat/statSpread";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, h: api_element} = $api;
  return [$cmp.character ? api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, [api_custom_element("combat-stat-spread", _combatStatSpread, {
    props: {
      "isPlayer": "true",
      "creature": $cmp.character
    },
    key: 1
  }, [])]) : null];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "combat-characterBuilder_characterBuilder"
