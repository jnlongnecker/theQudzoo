import _implicitStylesheets from "./card.css";

import _implicitScopedStylesheets from "./card.scoped.css?scoped=true";

import _cSugarInjector from "c/sugarInjector";
import _inputButton from "input/button";
import _cPopup from "c/popup";
import _inputIcon from "input/icon";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, b: api_bind, d: api_dynamic_text, t: api_text, h: api_element, k: api_key, i: api_iterator} = $api;
  const {_m0, _m1, _m2, _m3, _m4} = $ctx;
  return [api_custom_element("c-sugar-injector", _cSugarInjector, {
    key: 0
  }, []), $cmp.buildInfo ? api_custom_element("c-popup", _cPopup, {
    props: {
      "show": $cmp.deleting
    },
    key: 1,
    on: {
      "close": _m0 || ($ctx._m0 = api_bind($cmp.cancelDelete))
    }
  }, [api_element("span", {
    attrs: {
      "slot": "header"
    },
    key: 2
  }, [api_text("Deleting " + api_dynamic_text($cmp.buildName))]), api_element("p", {
    key: 3
  }, [api_element("img", {
    attrs: {
      "src": $cmp.subtypeImg
    },
    key: 4
  }, [])]), api_element("p", {
    key: 5
  }, [api_text("You are about to delete this build. It's going to be gone forever if you do this.")]), api_custom_element("input-button", _inputButton, {
    attrs: {
      "slot": "input"
    },
    props: {
      "size": "thin large",
      "variant": "intelligence"
    },
    key: 6,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.cancelDelete))
    }
  }, [api_text("Cancel")]), api_custom_element("input-button", _inputButton, {
    attrs: {
      "slot": "input"
    },
    props: {
      "size": "thin large",
      "variant": "toughness"
    },
    key: 7,
    on: {
      "click": _m2 || ($ctx._m2 = api_bind($cmp.confirmDelete))
    }
  }, [api_text("Delete")])]) : null, $cmp.buildInfo ? api_element("a", {
    attrs: {
      "href": $cmp.editorLink
    },
    key: 8
  }, [api_element("div", {
    className: $cmp.cardClass,
    key: 9
  }, [api_element("div", {
    classMap: {
      "header": true
    },
    key: 10
  }, [$cmp.copyable ? api_element("button", {
    classMap: {
      "copy-code": true
    },
    key: 11,
    on: {
      "click": _m3 || ($ctx._m3 = api_bind($cmp.copyCode))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "clipboard",
      "flipvariant": "check",
      "title": "Copy Build Code",
      "padding": "large"
    },
    key: 12
  }, [])]) : null, !$cmp.copyable ? api_element("span", {
    key: 13
  }, []) : null, api_element("h1", {
    key: 14
  }, [api_text(api_dynamic_text($cmp.buildName)), $cmp.hasOwner ? api_element("span", {
    key: 15
  }, [api_text(" by " + api_dynamic_text($cmp.displayName))]) : null]), $cmp.deletable ? api_element("button", {
    classMap: {
      "delete": true
    },
    key: 16,
    on: {
      "click": _m4 || ($ctx._m4 = api_bind($cmp.promptDelete))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "delete",
      "title": "Delete Build",
      "padding": "large"
    },
    key: 17
  }, [])]) : null]), api_element("div", {
    classMap: {
      "grid": true
    },
    key: 18
  }, [api_element("div", {
    classMap: {
      "attributes": true
    },
    key: 19
  }, [api_element("fieldset", {
    key: 20
  }, [api_element("legend", {
    key: 21
  }, [api_text("Attributes")]), api_element("ul", {
    key: 22
  }, api_iterator($cmp.attributes, function (attribute) {
    return api_element("li", {
      className: attribute.class,
      key: api_key(23, attribute.class)
    }, [api_element("span", {
      key: 24
    }, [api_text(api_dynamic_text(attribute.name))]), api_element("span", {
      key: 25
    }, [api_text(api_dynamic_text(attribute.value))])]);
  }))])]), api_element("div", {
    classMap: {
      "char-info": true
    },
    key: 26
  }, [api_element("img", {
    attrs: {
      "src": $cmp.subtypeImg
    },
    key: 27
  }, []), api_element("p", {
    key: 28
  }, [api_text(api_dynamic_text($cmp.subtypeName))]), api_element("p", {
    classMap: {
      "char-name": true
    },
    key: 29
  }, [api_text(api_dynamic_text($cmp.characterName))])]), api_element("div", {
    classMap: {
      "mutations": true
    },
    key: 30
  }, [api_element("fieldset", {
    key: 31
  }, [api_element("legend", {
    key: 32
  }, [api_text(api_dynamic_text($cmp.bonus))]), api_element("ul", {
    classMap: {
      "mutation-list": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 33
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
