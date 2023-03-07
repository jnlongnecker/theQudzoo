import _implicitStylesheets from "./buildLibrary.css";

import _implicitScopedStylesheets from "./buildLibrary.scoped.css?scoped=true";

import _cBuildCard from "c/buildCard";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {k: api_key, c: api_custom_element, i: api_iterator, h: api_element} = $api;
  return [api_element("section", {
    key: 0
  }, api_iterator($cmp.builds, function (build) {
    return api_custom_element("c-build-card", _cBuildCard, {
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
tmpl.stylesheetToken = "c-buildLibrary_buildLibrary"
