import _implicitStylesheets from "./search.css";

import _implicitScopedStylesheets from "./search.scoped.css?scoped=true";

import _inputIcon from "input/icon";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, c: api_custom_element, h: api_element} = $api;
  const {_m0, _m1, _m2, _m3} = $ctx;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "search",
      "size": "normal",
      "padding": "medium"
    },
    key: 1,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.updateValue))
    }
  }, []), api_element("input", {
    attrs: {
      "placeholder": $cmp.placeholder
    },
    props: {
      "value": $cmp.value
    },
    key: 2,
    on: {
      "keyup": _m1 || ($ctx._m1 = api_bind($cmp.updateValue)),
      "change": _m2 || ($ctx._m2 = api_bind($cmp.updateValue))
    }
  }, []), api_element("span", {
    classMap: {
      "x-icon": true
    },
    key: 3
  }, [api_element("span", {
    classMap: {
      "wrapper": true
    },
    key: 4,
    on: {
      "click": _m3 || ($ctx._m3 = api_bind($cmp.clearInput))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "cross",
      "size": "normal"
    },
    key: 5
  }, [])])])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "input-search_search"
