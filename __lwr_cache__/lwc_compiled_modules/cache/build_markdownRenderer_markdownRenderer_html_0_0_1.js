import _implicitStylesheets from "./markdownRenderer.css";

import _implicitScopedStylesheets from "./markdownRenderer.scoped.css?scoped=true";

import _cSugarInjector from "c/sugarInjector";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, h: api_element} = $api;
  return [api_custom_element("c-sugar-injector", _cSugarInjector, {
    key: 0
  }, []), api_element("div", {
    attrs: {
      "lwc:ref": "container"
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 1
  }, [])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-markdownRenderer_markdownRenderer"
