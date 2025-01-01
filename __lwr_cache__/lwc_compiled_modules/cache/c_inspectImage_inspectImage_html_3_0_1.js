import _implicitStylesheets from "./inspectImage.css";

import _implicitScopedStylesheets from "./inspectImage.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, h: api_element} = $api;
  const {_m0} = $ctx;
  return [$cmp.activated ? api_element("div", {
    classMap: {
      "conatiner": true
    },
    key: 0
  }, [api_element("div", {
    classMap: {
      "bg-darken": true
    },
    key: 1,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.deactivate))
    }
  }, [api_element("img", {
    attrs: {
      "src": $cmp.imageLink
    },
    key: 2
  }, [])])]) : null];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-inspectImage_inspectImage"
