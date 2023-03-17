import _implicitStylesheets from "./cyberneticChooser.css";

import _implicitScopedStylesheets from "./cyberneticChooser.scoped.css?scoped=true";

import _cSugarInjector from "c/sugarInjector";
import _inputButton from "input/button";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, t: api_text, h: api_element, k: api_key, b: api_bind, d: api_dynamic_text, i: api_iterator} = $api;
  const {_m0, _m1, _m2, _m3, _m4, _m5} = $ctx;
  return [api_custom_element("c-sugar-injector", _cSugarInjector, {
    key: 0
  }, []), api_element("h2", {
    key: 1
  }, [api_text(":choose starting cybernetic:")]), api_element("section", {
    key: 2
  }, [api_element("div", {
    classMap: {
      "mutations": true
    },
    key: 3
  }, [api_element("fieldset", {
    key: 4
  }, [api_element("legend", {
    classMap: {
      "morphotype": true
    },
    key: 5
  }, [api_text("Cybernetics")]), api_element("ul", {
    key: 6
  }, api_iterator($cmp.cybernetics, function (cyb) {
    return api_element("div", {
      className: cyb.class,
      attrs: {
        "name": cyb.name,
        "variant": cyb.variant
      },
      key: api_key(7, cyb.key),
      on: {
        "mouseenter": _m0 || ($ctx._m0 = api_bind($cmp.mutHover)),
        "click": _m1 || ($ctx._m1 = api_bind($cmp.mutClick))
      }
    }, [api_element("div", {
      key: 8
    }, [api_text("["), api_element("span", {
      classMap: {
        "marker": true
      },
      key: 9
    }, [api_text(api_dynamic_text(cyb.marker))]), api_text("] " + api_dynamic_text(cyb.name)), cyb.variant ? api_element("span", {
      classMap: {
        "variant": true
      },
      key: 10
    }, [api_text("(" + api_dynamic_text(cyb.variant) + ")")]) : null]), api_element("div", {
      classMap: {
        "info-btn": true
      },
      key: 11
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": cyb.name,
        "variant": cyb.variant
      },
      key: 12,
      on: {
        "click": _m2 || ($ctx._m2 = api_bind($cmp.showInfo))
      }
    }, [api_text("Info")])])]);
  }))])]), api_element("hr", {
    key: 13
  }, []), api_element("div", {
    className: $cmp.blurbClass,
    key: 14,
    on: {
      "click": _m3 || ($ctx._m3 = api_bind($cmp.hideBlurb))
    }
  }, [api_element("fieldset", {
    key: 15
  }, [api_element("legend", {
    key: 16
  }, [api_text(api_dynamic_text($cmp.selectedCybText))]), api_element("div", {
    classMap: {
      "blurb-format": true
    },
    key: 17
  }, [api_element("div", {
    key: 18
  }, [$cmp.selectedSrc ? api_element("img", {
    classMap: {
      "mut-img": true
    },
    attrs: {
      "src": $cmp.selectedSrc
    },
    key: 19
  }, []) : null]), api_element("div", {
    key: 20
  }, [api_element("p", {
    classMap: {
      "blurbText": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 21
  }, []), api_element("p", {
    classMap: {
      "levelBlurb": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 22
  }, [])])])])])]), api_element("div", {
    classMap: {
      "options": true
    },
    key: 23
  }, [api_element("span", {
    key: 24
  }, [api_custom_element("input-button", _inputButton, {
    props: {
      "size": "thin",
      "variant": "stat"
    },
    key: 25,
    on: {
      "click": _m4 || ($ctx._m4 = api_bind($cmp.randomizeChanges))
    }
  }, [api_text("Randomize")])]), api_element("span", {
    key: 26
  }, [api_custom_element("input-button", _inputButton, {
    props: {
      "size": "thin",
      "variant": "stat"
    },
    key: 27,
    on: {
      "click": _m5 || ($ctx._m5 = api_bind($cmp.resetChanges))
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
tmpl.stylesheetToken = "build-cyberneticChooser_cyberneticChooser"
