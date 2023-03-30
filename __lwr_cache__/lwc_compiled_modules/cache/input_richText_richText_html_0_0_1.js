import _implicitStylesheets from "./richText.css";

import _implicitScopedStylesheets from "./richText.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, h: api_element, t: api_text} = $api;
  const {_m0, _m1} = $ctx;
  return [api_element("div", {
    classMap: {
      "editor-container": true
    },
    key: 0
  }, [api_element("div", {
    classMap: {
      "text-container": true
    },
    key: 1
  }, [api_element("div", {
    classMap: {
      "text": true
    },
    attrs: {
      "role": "textbox",
      "spellcheck": true,
      "contenteditable": ""
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 2,
    on: {
      "keydown": _m0 || ($ctx._m0 = api_bind($cmp.trackChanges))
    }
  }, [])]), api_element("div", {
    classMap: {
      "editor-option-container": true
    },
    key: 3
  }, [api_element("button", {
    key: 4,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.setBold))
    }
  }, [api_text("B")])])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "input-richText_richText"
