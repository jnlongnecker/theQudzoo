import _implicitStylesheets from "./library.css";

import _implicitScopedStylesheets from "./library.scoped.css?scoped=true";

import _buildGhostBox from "build/ghostBox";
import _buildCard from "build/card";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {k: api_key, c: api_custom_element, i: api_iterator, f: api_flatten, h: api_element} = $api;
  return [api_element("section", {
    key: 0
  }, api_flatten([api_iterator($cmp.ghostBuilds, function (ghost) {
    return $cmp.noBuilds ? api_custom_element("build-ghost-box", _buildGhostBox, {
      key: api_key(1, ghost)
    }, []) : null;
  }), api_iterator($cmp.builds, function (build) {
    return api_custom_element("build-card", _buildCard, {
      props: {
        "mode": $cmp.mode,
        "build": build
      },
      key: api_key(2, build.code)
    }, []);
  })]))];
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
