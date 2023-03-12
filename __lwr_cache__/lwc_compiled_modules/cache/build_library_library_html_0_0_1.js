import _implicitStylesheets from "./library.css";

import _implicitScopedStylesheets from "./library.scoped.css?scoped=true";

import _buildCard from "build/card";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {k: api_key, c: api_custom_element, i: api_iterator, h: api_element} = $api;
  return [api_element("section", {
    key: 0
  }, api_iterator($cmp.builds, function (build) {
    return api_custom_element("build-card", _buildCard, {
      props: {
        "mode": $cmp.mode,
        "build": build
      },
      key: api_key(1, build.code)
    }, []);
  }))];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-library_library"
