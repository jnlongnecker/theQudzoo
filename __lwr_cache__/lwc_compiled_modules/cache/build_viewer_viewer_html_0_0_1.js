import _implicitStylesheets from "./viewer.css";

import _implicitScopedStylesheets from "./viewer.scoped.css?scoped=true";

import _buildCard from "build/card";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, d: api_dynamic_text, t: api_text, h: api_element} = $api;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, [api_element("div", {
    classMap: {
      "card-wrapper": true
    },
    key: 1
  }, [api_custom_element("build-card", _buildCard, {
    props: {
      "build": $cmp.buildInfo,
      "mode": "static copy"
    },
    key: 2
  }, []), api_element("p", {
    key: 3
  }, [api_text(api_dynamic_text($cmp.tagBlurb))])])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-viewer_viewer"
