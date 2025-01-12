import _implicitStylesheets from "./callingChooser.css";

import _implicitScopedStylesheets from "./callingChooser.scoped.css?scoped=true";

import _cSugarInjector from "c/sugarInjector";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, t: api_text, h: api_element, k: api_key, b: api_bind, d: api_dynamic_text, i: api_iterator} = $api;
  const {_m0, _m1} = $ctx;
  return [api_custom_element("c-sugar-injector", _cSugarInjector, {
    key: 0
  }, []), api_element("h2", {
    key: 1
  }, [api_text(":choose your calling:")]), api_element("div", {
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
      "calling-grid": true
    },
    key: 7
  }, api_iterator($cmp.callings, function (calling) {
    return api_element("figure", {
      classMap: {
        "calling-card": true
      },
      attrs: {
        "calling": calling.name
      },
      key: api_key(8, calling.name),
      on: {
        "mouseover": _m0 || ($ctx._m0 = api_bind($cmp.callingHovered)),
        "click": _m1 || ($ctx._m1 = api_bind($cmp.callingSelected))
      }
    }, [api_element("img", {
      className: calling.class,
      attrs: {
        "src": calling.src
      },
      key: 9
    }, []), api_element("figcaption", {
      key: 10
    }, [api_text(api_dynamic_text(calling.name))])]);
  }))])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-callingChooser_callingChooser"
