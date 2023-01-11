import _implicitStylesheets from "./articleCard.css";

import _implicitScopedStylesheets from "./articleCard.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {h: api_element, d: api_dynamic_text, t: api_text} = $api;
  return [api_element("a", {
    classMap: {
      "card": true
    },
    attrs: {
      "href": $cmp.info.link
    },
    key: 0
  }, [api_element("div", {
    classMap: {
      "overlay-container": true
    },
    key: 1
  }, [api_element("div", {
    classMap: {
      "spacing-container": true
    },
    key: 2
  }, []), api_element("p", {
    classMap: {
      "card-label": true
    },
    key: 3
  }, [api_text(api_dynamic_text($cmp.info.label))])]), api_element("img", {
    attrs: {
      "src": $cmp.info.preview
    },
    key: 4
  }, [])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-articleCard_articleCard"
