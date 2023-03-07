import _implicitStylesheets from "./profile.css";

import _implicitScopedStylesheets from "./profile.scoped.css?scoped=true";

import _cBuildLibrary from "c/buildLibrary";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {d: api_dynamic_text, t: api_text, h: api_element, c: api_custom_element} = $api;
  return [$cmp.userExists ? api_element("section", {
    key: 0
  }, [api_element("h1", {
    key: 1
  }, [api_text(api_dynamic_text($cmp.user.name))]), api_element("hr", {
    key: 2
  }, []), api_element("h2", {
    key: 3
  }, [api_text("My Library")]), api_custom_element("c-build-library", _cBuildLibrary, {
    props: {
      "mode": "delete",
      "filters": $cmp.libraryFilters
    },
    key: 4
  }, [])]) : null];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-profile_profile"
