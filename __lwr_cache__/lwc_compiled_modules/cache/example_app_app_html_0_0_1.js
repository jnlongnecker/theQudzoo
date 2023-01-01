import _implicitStylesheets from "./app.css";

import _implicitScopedStylesheets from "./app.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {h: api_element, t: api_text} = $api;
  return [api_element("main", {
    key: 0
  }, [api_element("img", {
    attrs: {
      "src": "/public/assets/recipes-logo.png",
      "alt": "logo"
    },
    key: 1
  }, []), api_element("h1", {
    key: 2
  }, [api_text("Hello World!")])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "example-app_app"
