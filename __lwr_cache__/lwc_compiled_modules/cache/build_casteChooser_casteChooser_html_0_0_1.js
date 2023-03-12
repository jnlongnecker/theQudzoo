import _implicitStylesheets from "./casteChooser.css";

import _implicitScopedStylesheets from "./casteChooser.scoped.css?scoped=true";

import _cSugarInjector from "c/sugarInjector";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, t: api_text, h: api_element, k: api_key, d: api_dynamic_text, b: api_bind, i: api_iterator} = $api;
  const {_m0, _m1, _m2, _m3} = $ctx;
  return [api_custom_element("c-sugar-injector", _cSugarInjector, {
    key: 0
  }, []), api_element("h2", {
    key: 1
  }, [api_text(":choose your caste:")]), api_element("div", {
    classMap: {
      "container": true
    },
    key: 2
  }, [api_element("div", {
    classMap: {
      "starters": true
    },
    key: 3
  }, [api_element("div", {
    key: 4
  }, []), api_element("ul", {
    classMap: {
      "starter-list": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 5
  }, []), api_element("div", {
    key: 6
  }, [])]), api_element("div", {
    classMap: {
      "arc-name-grid": true
    },
    key: 7
  }, api_iterator($cmp.castes, function (arcology) {
    return [api_element("h2", {
      className: arcology.shortName,
      key: api_key(8, arcology.shortName)
    }, [api_text(api_dynamic_text(arcology.arcologyName))]), $cmp.mobileLayout ? api_element("div", {
      classMap: {
        "mobile-castes": true
      },
      key: api_key(9, arcology.arcologyName)
    }, api_iterator(arcology.castes, function (caste) {
      return api_element("figure", {
        classMap: {
          "calling-card": true
        },
        attrs: {
          "calling": caste.name
        },
        key: api_key(10, caste.name),
        on: {
          "mouseover": _m0 || ($ctx._m0 = api_bind($cmp.callingHovered)),
          "click": _m1 || ($ctx._m1 = api_bind($cmp.callingSelected))
        }
      }, [api_element("img", {
        className: caste.class,
        attrs: {
          "src": caste.src
        },
        key: 11
      }, []), api_element("figcaption", {
        key: 12
      }, [api_text(api_dynamic_text(caste.name))])]);
    })) : null];
  })), $cmp.desktopLayout ? api_element("div", {
    classMap: {
      "calling-grid": true
    },
    key: 13
  }, api_iterator($cmp.casteDisplay, function (caste) {
    return api_element("figure", {
      classMap: {
        "calling-card": true
      },
      attrs: {
        "calling": caste.name
      },
      key: api_key(14, caste.name),
      on: {
        "mouseover": _m2 || ($ctx._m2 = api_bind($cmp.callingHovered)),
        "click": _m3 || ($ctx._m3 = api_bind($cmp.callingSelected))
      }
    }, [api_element("img", {
      className: caste.class,
      attrs: {
        "src": caste.src
      },
      key: 15
    }, []), api_element("figcaption", {
      key: 16
    }, [api_text(api_dynamic_text(caste.name))])]);
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
tmpl.stylesheetToken = "build-casteChooser_casteChooser"
