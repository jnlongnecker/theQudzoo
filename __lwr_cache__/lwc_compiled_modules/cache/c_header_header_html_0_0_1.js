import _implicitStylesheets from "./header.css";

import _implicitScopedStylesheets from "./header.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element} = $api;
  return [api_element("header", {
    key: 0
  }, [api_element("div", {
    classMap: {
      "logo": true
    },
    key: 1
  }, [api_element("p", {
    classMap: {
      "site-name": true
    },
    key: 2
  }, [api_text("qudzoo"), api_element("span", {
    classMap: {
      "blinker": true
    },
    key: 3
  }, [api_text("|")])])]), api_element("div", {
    classMap: {
      "links": true
    },
    key: 4
  }, [api_element("a", {
    key: 5
  }, [api_text("A-F-F-I-N-E's Advice")]), api_element("div", {
    classMap: {
      "dot-divider": true
    },
    key: 6
  }, []), api_element("a", {
    key: 7
  }, [api_text("More Coming Soon!")])])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-header_header"
