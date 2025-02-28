import _implicitStylesheets from "./attributeControls.css";

import _implicitScopedStylesheets from "./attributeControls.scoped.css?scoped=true";

import _inputButton from "input/button";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {k: api_key, b: api_bind, d: api_dynamic_text, t: api_text, h: api_element, i: api_iterator, c: api_custom_element} = $api;
  const {_m0, _m1, _m2} = $ctx;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, [api_element("div", {
    classMap: {
      "attribute-grid": true
    },
    key: 1
  }, api_iterator($cmp.attributes, function (attribute, num) {
    return api_element("div", {
      className: attribute.class,
      attrs: {
        "index": num
      },
      key: api_key(2, attribute.name),
      on: {
        "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClick))
      }
    }, [api_element("div", {
      classMap: {
        "attribute-input": true
      },
      key: 3
    }, [api_element("div", {
      classMap: {
        "stat-container": true
      },
      attrs: {
        "index": num
      },
      key: 4
    }, [api_element("h3", {
      key: 5
    }, [api_text(api_dynamic_text(attribute.abbreviation))]), api_element("h3", {
      className: attribute.classModifier,
      key: 6
    }, [api_text(api_dynamic_text(attribute.displayTotal))]), api_element("p", {
      classMap: {
        "modifier": true
      },
      key: 7
    }, [api_text("[" + api_dynamic_text(attribute.modifier) + "]")])]), api_element("div", {
      classMap: {
        "buttons": true
      },
      key: 8
    }, [$cmp.showIncrease ? api_element("button", {
      key: 9
    }, [api_text("+")]) : null, $cmp.showDecrease ? api_element("button", {
      key: 10
    }, [api_text("-")]) : null])]), api_element("p", {
      classMap: {
        "point-cost": true
      },
      key: api_key(11, attribute.name)
    }, [api_text("[" + api_dynamic_text(attribute.cost) + "pts]")])]);
  }))]), api_element("div", {
    classMap: {
      "options": true
    },
    key: 12
  }, [!$cmp.isFreeMode ? api_element("span", {
    key: 13
  }, [api_text("Points Remaining: " + api_dynamic_text($cmp.points))]) : null, $cmp.showButtons ? !$cmp.isFreeMode ? api_element("span", {
    key: 14
  }, [api_custom_element("input-button", _inputButton, {
    props: {
      "variant": "stat",
      "size": "thin"
    },
    key: 15,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.randomizeChanges))
    }
  }, [api_text("Randomize")])]) : null : null, $cmp.showButtons ? api_element("span", {
    key: 16
  }, [api_custom_element("input-button", _inputButton, {
    props: {
      "variant": "stat",
      "size": "thin"
    },
    key: 17,
    on: {
      "click": _m2 || ($ctx._m2 = api_bind($cmp.resetChanges))
    }
  }, [api_text("Reset")])]) : null])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "combat-attributeControls_attributeControls"
