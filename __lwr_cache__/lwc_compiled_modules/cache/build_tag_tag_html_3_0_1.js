import _implicitStylesheets from "./tag.css";

import _implicitScopedStylesheets from "./tag.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, d: api_dynamic_text, t: api_text, h: api_element} = $api;
  const {_m0} = $ctx;
  return [api_element("span", {
    className: $cmp.tagClass,
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.activate))
    }
  }, [api_text(api_dynamic_text($cmp.label))])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-tag_tag"
