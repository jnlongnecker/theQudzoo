import _implicitStylesheets from "./picklist.css";

import _implicitScopedStylesheets from "./picklist.scoped.css?scoped=true";

import _inputIcon from "input/icon";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, d: api_dynamic_text, t: api_text, c: api_custom_element, h: api_element, k: api_key, i: api_iterator} = $api;
  const {_m0, _m1, _m2, _m3} = $ctx;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, [api_element("span", {
    classMap: {
      "chosen": true
    },
    attrs: {
      "tabindex": "0"
    },
    key: 1,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.startChoosing)),
      "keydown": _m1 || ($ctx._m1 = api_bind($cmp.startChoosing))
    }
  }, [api_text(api_dynamic_text($cmp.chosen)), api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "dropdown",
      "size": "normal"
    },
    key: 2
  }, [])]), $cmp.choosing ? api_element("div", {
    classMap: {
      "option-list": true
    },
    key: 3
  }, api_iterator($cmp.choices, function (item) {
    return api_element("span", {
      classMap: {
        "option": true
      },
      attrs: {
        "value": item,
        "tabindex": "0"
      },
      key: api_key(4, item),
      on: {
        "click": _m2 || ($ctx._m2 = api_bind($cmp.makeChoice)),
        "keydown": _m3 || ($ctx._m3 = api_bind($cmp.makeChoice))
      }
    }, [api_text(api_dynamic_text(item))]);
  })) : null])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "input-picklist_picklist"
