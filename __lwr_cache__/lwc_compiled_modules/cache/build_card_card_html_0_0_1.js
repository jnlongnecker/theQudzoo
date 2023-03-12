import _implicitStylesheets from "./card.css";

import _implicitScopedStylesheets from "./card.scoped.css?scoped=true";

import _cSugarInjector from "c/sugarInjector";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, b: api_bind, d: api_dynamic_text, t: api_text, h: api_element, k: api_key, i: api_iterator} = $api;
  const {_m0, _m1, _m2, _m3, _m4, _m5} = $ctx;
  return [api_custom_element("c-sugar-injector", _cSugarInjector, {
    key: 0
  }, []), $cmp.buildInfo ? $cmp.deleting ? api_element("div", {
    classMap: {
      "popup-background": true
    },
    key: 1,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.cancelDelete))
    }
  }, [api_element("div", {
    classMap: {
      "popup": true
    },
    key: 2,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.stopBubble))
    }
  }, [api_element("h1", {
    key: 3
  }, [api_text("Deleting " + api_dynamic_text($cmp.buildName))]), api_element("p", {
    key: 4
  }, [api_element("img", {
    attrs: {
      "src": $cmp.subtypeImg
    },
    key: 5
  }, [])]), api_element("p", {
    key: 6
  }, [api_text("You are about to delete this build. It's going to be gone forever if you do this.")]), api_element("div", {
    classMap: {
      "buttons": true
    },
    key: 7
  }, [api_element("button", {
    classMap: {
      "cancel-delete": true
    },
    key: 8,
    on: {
      "click": _m2 || ($ctx._m2 = api_bind($cmp.cancelDelete))
    }
  }, [api_text("Cancel")]), api_element("button", {
    classMap: {
      "confirm-delete": true
    },
    key: 9,
    on: {
      "click": _m3 || ($ctx._m3 = api_bind($cmp.confirmDelete))
    }
  }, [api_text("Delete")])])])]) : null : null, $cmp.buildInfo ? api_element("a", {
    attrs: {
      "href": $cmp.editorLink
    },
    key: 10
  }, [api_element("div", {
    className: $cmp.cardClass,
    key: 11
  }, [api_element("div", {
    classMap: {
      "header": true
    },
    key: 12
  }, [$cmp.copyable ? api_element("button", {
    classMap: {
      "copy-code": true
    },
    key: 13,
    on: {
      "click": _m4 || ($ctx._m4 = api_bind($cmp.copyCode))
    }
  }, [api_element("svg", {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 24 24"
    },
    key: 14,
    svg: true
  }, [api_element("path", {
    attrs: {
      "d": $cmp.usePath
    },
    key: 15,
    svg: true
  }, [])])]) : null, !$cmp.copyable ? api_element("span", {
    key: 16
  }, []) : null, api_element("h1", {
    key: 17
  }, [api_text(api_dynamic_text($cmp.buildName)), $cmp.hasOwner ? api_element("span", {
    key: 18
  }, [api_text(" by " + api_dynamic_text($cmp.displayName))]) : null]), $cmp.deletable ? api_element("button", {
    classMap: {
      "delete": true
    },
    key: 19,
    on: {
      "click": _m5 || ($ctx._m5 = api_bind($cmp.promptDelete))
    }
  }, [api_element("svg", {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "24",
      "height": "24",
      "viewBox": "0 0 24 24"
    },
    key: 20,
    svg: true
  }, [api_element("title", {
    key: 21,
    svg: true
  }, [api_text("Delete Build")]), api_element("path", {
    attrs: {
      "d": "M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"
    },
    key: 22,
    svg: true
  }, [])])]) : null]), api_element("div", {
    classMap: {
      "grid": true
    },
    key: 23
  }, [api_element("div", {
    classMap: {
      "attributes": true
    },
    key: 24
  }, [api_element("fieldset", {
    key: 25
  }, [api_element("legend", {
    key: 26
  }, [api_text("Attributes")]), api_element("ul", {
    key: 27
  }, api_iterator($cmp.attributes, function (attribute) {
    return api_element("li", {
      className: attribute.class,
      key: api_key(28, attribute.class)
    }, [api_element("span", {
      key: 29
    }, [api_text(api_dynamic_text(attribute.name))]), api_element("span", {
      key: 30
    }, [api_text(api_dynamic_text(attribute.value))])]);
  }))])]), api_element("div", {
    classMap: {
      "char-info": true
    },
    key: 31
  }, [api_element("img", {
    attrs: {
      "src": $cmp.subtypeImg
    },
    key: 32
  }, []), api_element("p", {
    key: 33
  }, [api_text(api_dynamic_text($cmp.subtypeName))]), api_element("p", {
    classMap: {
      "char-name": true
    },
    key: 34
  }, [api_text(api_dynamic_text($cmp.characterName))])]), api_element("div", {
    classMap: {
      "mutations": true
    },
    key: 35
  }, [api_element("fieldset", {
    key: 36
  }, [api_element("legend", {
    key: 37
  }, [api_text(api_dynamic_text($cmp.bonus))]), api_element("ul", {
    classMap: {
      "mutation-list": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 38
  }, [])])])])])]) : null];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-card_card"
