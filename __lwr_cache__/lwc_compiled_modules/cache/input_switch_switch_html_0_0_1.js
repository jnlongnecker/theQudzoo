import _implicitStylesheets from "./switch.css";

import _implicitScopedStylesheets from "./switch.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {h: api_element} = $api;
  return [api_element("span", {
    classMap: {
      "switch": true
    },
    key: 0
  }, [api_element("input", {
    attrs: {
      "type": "checkbox"
    },
    props: {
      "checked": $cmp.checked
    },
    key: 1
  }, []), api_element("span", {
    classMap: {
      "slider-dot": true
    },
    key: 2
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
tmpl.stylesheetToken = "input-switch_switch"
