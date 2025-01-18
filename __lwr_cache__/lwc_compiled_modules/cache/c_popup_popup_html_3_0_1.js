import _implicitStylesheets from "./popup.css";

import _implicitScopedStylesheets from "./popup.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, s: api_slot, h: api_element} = $api;
  const {_m0, _m1} = $ctx;
  return [$cmp.show ? api_element("div", {
    classMap: {
      "popup-background": true
    },
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.closePopup))
    }
  }, [api_element("div", {
    classMap: {
      "popup-container": true
    },
    key: 1,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.stopProp))
    }
  }, [api_element("fieldset", {
    key: 2
  }, [api_element("legend", {
    key: 3
  }, [api_slot("header", {
    attrs: {
      "name": "header"
    },
    key: 4
  }, [], $slotset)]), api_slot("", {
    key: 5
  }, [], $slotset), api_element("div", {
    classMap: {
      "buttons": true
    },
    key: 6
  }, [api_slot("input", {
    attrs: {
      "name": "input"
    },
    key: 7
  }, [], $slotset)])])])]) : null];
}
export default registerTemplate(tmpl);
tmpl.slots = ["", "header", "input"];
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-popup_popup"
