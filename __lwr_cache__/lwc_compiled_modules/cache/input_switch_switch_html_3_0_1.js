import _implicitStylesheets from "./switch.css";

import _implicitScopedStylesheets from "./switch.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {d: api_dynamic_text, t: api_text, h: api_element, b: api_bind} = $api;
  const {_m0} = $ctx;
  return [api_element("div", {
    className: $cmp.containerClass,
    key: 0
  }, [api_element("label", {
    className: $cmp.checkedClass,
    key: 1
  }, [api_text(api_dynamic_text($cmp.left))]), api_element("span", {
    className: $cmp.switchClass,
    key: 2,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.notifyChange))
    }
  }, [api_element("span", {
    className: $cmp.checkboxClass,
    key: 3
  }, [])]), api_element("label", {
    className: $cmp.checkedClass,
    key: 4
  }, [api_text(api_dynamic_text($cmp.right))])])];
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
