import _implicitStylesheets from "./actionLog.css";

import _implicitScopedStylesheets from "./actionLog.scoped.css?scoped=true";

import _inputButton from "input/button";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {k: api_key, d: api_dynamic_text, t: api_text, h: api_element, b: api_bind, c: api_custom_element, i: api_iterator} = $api;
  const {_m0, _m1} = $ctx;
  return [api_element("div", {
    classMap: {
      "chatbox": true
    },
    key: 0
  }, api_iterator($cmp.messages, function (itValue, itIndex, itFirst, itLast) {
    const it = {
      value: itValue,
      index: itIndex,
      first: itFirst,
      last: itLast
    };
    return api_element("p", {
      classMap: {
        "line": true
      },
      key: api_key(1, it.value.id)
    }, [it.value.activated ? api_element("span", {
      key: 2
    }, [api_text(api_dynamic_text(it.value.message))]) : null, it.value.activated ? it.value.action.reversible ? api_custom_element("input-button", _inputButton, {
      classMap: {
        "inline-action": true
      },
      attrs: {
        "data-index": it.value.id
      },
      props: {
        "size": "small",
        "variant": "thin"
      },
      key: 3,
      on: {
        "click": _m0 || ($ctx._m0 = api_bind($cmp.undoAction))
      }
    }, [api_text("Undo")]) : null : null, !it.value.activated ? api_element("span", {
      classMap: {
        "deactivated": true
      },
      key: 4
    }, [api_text(api_dynamic_text(it.value.message))]) : null, !it.value.activated ? api_custom_element("input-button", _inputButton, {
      classMap: {
        "inline-action": true
      },
      attrs: {
        "data-index": it.value.id
      },
      props: {
        "size": "small",
        "variant": "thin"
      },
      key: 5,
      on: {
        "click": _m1 || ($ctx._m1 = api_bind($cmp.redoAction))
      }
    }, [api_text("Redo")]) : null]);
  }))];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "combat-actionLog_actionLog"
