import _implicitStylesheets from "./button.css";

import _implicitScopedStylesheets from "./button.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {s: api_slot, h: api_element} = $api;
  return [api_element("button", {
    className: $cmp.buttonClass,
    attrs: {
      "title": $cmp.title,
      "type": $cmp.type
    },
    key: 0
  }, [api_slot("", {
    key: 1
  }, [], $slotset)])];
}
export default registerTemplate(tmpl);
tmpl.slots = [""];
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "input-button_button"
