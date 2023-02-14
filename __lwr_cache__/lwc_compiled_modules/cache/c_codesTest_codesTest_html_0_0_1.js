import _implicitStylesheets from "./codesTest.css";

import _implicitScopedStylesheets from "./codesTest.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, t: api_text, h: api_element} = $api;
  const {_m0} = $ctx;
  return [api_element("button", {
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.go))
    }
  }, [api_text("Go")]), api_element("input", {
    attrs: {
      "type": "text"
    },
    key: 1
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
tmpl.stylesheetToken = "c-codesTest_codesTest"
