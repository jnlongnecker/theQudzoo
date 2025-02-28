import _implicitStylesheets from "./combatControls.css";

import _implicitScopedStylesheets from "./combatControls.scoped.css?scoped=true";

import _inputButton from "input/button";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, t: api_text, c: api_custom_element} = $api;
  const {_m0} = $ctx;
  return [api_custom_element("input-button", _inputButton, {
    props: {
      "variant": "stat",
      "size": "thin"
    },
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.runTest))
    }
  }, [api_text("Run Test")])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "combat-combatControls_combatControls"
