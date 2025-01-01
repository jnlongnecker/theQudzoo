import _implicitStylesheets from "./number.css";

import _implicitScopedStylesheets from "./number.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, h: api_element} = $api;
  const {_m0, _m1} = $ctx;
  return [api_element("input", {
    className: $cmp.inputClass,
    attrs: {
      "type": "number",
      "max": "99"
    },
    props: {
      "value": $cmp.value
    },
    key: 0,
    on: {
      "keyup": _m0 || ($ctx._m0 = api_bind($cmp.updateValue)),
      "change": _m1 || ($ctx._m1 = api_bind($cmp.updateValue))
    }
  }, [])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "input-number_number"
