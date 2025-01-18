import _implicitStylesheets from "./icon.css";

import _implicitScopedStylesheets from "./icon.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, h: api_element} = $api;
  const {_m0} = $ctx;
  return [api_element("div", {
    className: $cmp.containerClass,
    attrs: {
      "title": $cmp.title
    },
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.flip))
    }
  }, [api_element("svg", {
    className: $cmp.svgClass,
    attrs: {
      "clip-rule": "evenodd",
      "fill-rule": "evenodd",
      "stroke-linejoin": "round",
      "stroke-miterlimit": "2",
      "viewBox": "0 0 24 24",
      "xmlns": "http://www.w3.org/2000/svg"
    },
    key: 1,
    svg: true
  }, [api_element("path", {
    attrs: {
      "d": $cmp.pathToUse
    },
    key: 2,
    svg: true
  }, [])])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "input-icon_icon"
