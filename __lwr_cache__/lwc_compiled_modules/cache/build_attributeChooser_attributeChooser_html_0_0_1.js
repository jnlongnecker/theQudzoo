import _implicitStylesheets from "./attributeChooser.css";

import _implicitScopedStylesheets from "./attributeChooser.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element, k: api_key, b: api_bind, d: api_dynamic_text, i: api_iterator} = $api;
  const {_m0, _m1, _m2, _m3, _m4} = $ctx;
  return [api_element("h2", {
    key: 0
  }, [api_text(":choose attributes:")]), api_element("div", {
    classMap: {
      "container": true
    },
    key: 1
  }, [api_element("p", {
    classMap: {
      "blurb": true
    },
    key: 2
  }, [api_element("span", {
    key: 3
  }, []), api_element("span", {
    classMap: {
      "blurb-injection": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 4
  }, []), api_element("span", {
    key: 5
  }, [])]), api_element("div", {
    classMap: {
      "attribute-grid": true
    },
    key: 6
  }, api_iterator($cmp.attributes, function (attribute, num) {
    return api_element("div", {
      className: attribute.class,
      attrs: {
        "index": num
      },
      key: api_key(7, attribute.name),
      on: {
        "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClick)),
        "mouseenter": _m1 || ($ctx._m1 = api_bind($cmp.changeBlurb))
      }
    }, [api_element("div", {
      classMap: {
        "attribute-input": true
      },
      key: 8
    }, [api_element("div", {
      classMap: {
        "stat-container": true
      },
      attrs: {
        "index": num
      },
      key: 9,
      on: {
        "click": _m2 || ($ctx._m2 = api_bind($cmp.changeBlurb))
      }
    }, [api_element("h3", {
      key: 10
    }, [api_text(api_dynamic_text(attribute.abbreviation))]), api_element("h3", {
      className: attribute.classModifier,
      key: 11
    }, [api_text(api_dynamic_text(attribute.displayTotal))]), api_element("p", {
      classMap: {
        "modifier": true
      },
      key: 12
    }, [api_text("[" + api_dynamic_text(attribute.modifier) + "]")])]), api_element("div", {
      classMap: {
        "buttons": true
      },
      key: 13
    }, [api_element("button", {
      key: 14
    }, [api_text("+")]), api_element("button", {
      key: 15
    }, [api_text("-")])])]), api_element("p", {
      classMap: {
        "point-cost": true
      },
      key: api_key(16, attribute.name)
    }, [api_text("[" + api_dynamic_text(attribute.cost) + "pts]")])]);
  }))]), api_element("div", {
    classMap: {
      "options": true
    },
    key: 17
  }, [api_element("span", {
    key: 18
  }, [api_text("Points Remaining: " + api_dynamic_text($cmp.points))]), api_element("span", {
    key: 19
  }, [api_element("button", {
    key: 20,
    on: {
      "click": _m3 || ($ctx._m3 = api_bind($cmp.randomizeChanges))
    }
  }, [api_text("Randomize")])]), api_element("span", {
    key: 21
  }, [api_element("button", {
    key: 22,
    on: {
      "click": _m4 || ($ctx._m4 = api_bind($cmp.resetChanges))
    }
  }, [api_text("Reset")])])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-attributeChooser_attributeChooser"
