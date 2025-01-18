import _implicitStylesheets from "./typeaheadOption.css";

import _implicitScopedStylesheets from "./typeaheadOption.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, d: api_dynamic_text, t: api_text, h: api_element} = $api;
  const {_m0} = $ctx;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClick))
    }
  }, [api_element("div", {
    classMap: {
      "text": true
    },
    key: 1
  }, [api_element("p", {
    classMap: {
      "primary": true
    },
    key: 2
  }, [api_text(api_dynamic_text($cmp.value.primary))]), api_element("p", {
    classMap: {
      "secondary": true
    },
    key: 3
  }, [api_text(api_dynamic_text($cmp.value.secondary))])]), $cmp.imageSrc ? api_element("div", {
    classMap: {
      "image": true
    },
    key: 4
  }, [api_element("img", {
    attrs: {
      "src": $cmp.imageSrc
    },
    key: 5
  }, [])]) : null])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "input-typeaheadOption_typeaheadOption"
