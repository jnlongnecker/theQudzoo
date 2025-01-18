import _implicitStylesheets from "./details.css";

import _implicitScopedStylesheets from "./details.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {d: api_dynamic_text, t: api_text, h: api_element, s: api_slot} = $api;
  return [api_element("details", {
    key: 0
  }, [api_element("summary", {
    key: 1
  }, [api_text(api_dynamic_text($cmp.summary))]), api_slot("", {
    key: 2
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
tmpl.stylesheetToken = "c-details_details"
