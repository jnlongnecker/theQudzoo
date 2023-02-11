import _implicitStylesheets from "./articleHub.css";

import _implicitScopedStylesheets from "./articleHub.scoped.css?scoped=true";

import _cArticleCard from "c/articleCard";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {k: api_key, c: api_custom_element, i: api_iterator, h: api_element} = $api;
  return [api_element("section", {
    key: 0
  }, $cmp.linkGrid ? api_iterator($cmp.linkGrid, function (rowLinks) {
    return rowLinks ? api_element("div", {
      classMap: {
        "row": true
      },
      key: api_key(1, rowLinks.id)
    }, api_iterator(rowLinks.links, function (link) {
      return api_custom_element("c-article-card", _cArticleCard, {
        props: {
          "info": link
        },
        key: api_key(2, link.link)
      }, []);
    })) : null;
  }) : [])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-articleHub_articleHub"
