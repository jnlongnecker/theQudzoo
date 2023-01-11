import _implicitStylesheets from "./adviceBanner.css";

import _implicitScopedStylesheets from "./adviceBanner.scoped.css?scoped=true";

import _cArticleHub from "c/articleHub";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element, c: api_custom_element} = $api;
  return [api_element("section", {
    key: 0
  }, [api_element("h2", {
    key: 1
  }, [api_element("a", {
    attrs: {
      "href": "/advice"
    },
    key: 2
  }, [api_text("Advice Articles")])]), api_element("p", {
    key: 3
  }, [api_text("Breakdowns of the most relevant layers of Qud by A-F-F-I-N-E")]), api_element("div", {
    key: 4
  }, [api_custom_element("c-article-hub", _cArticleHub, {
    key: 5
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
tmpl.stylesheetToken = "c-adviceBanner_adviceBanner"
