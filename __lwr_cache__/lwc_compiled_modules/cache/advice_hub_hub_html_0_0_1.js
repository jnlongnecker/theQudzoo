import _implicitStylesheets from "./hub.css";

import _implicitScopedStylesheets from "./hub.scoped.css?scoped=true";

import _adviceCard from "advice/card";
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
      return api_custom_element("advice-card", _adviceCard, {
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
tmpl.stylesheetToken = "advice-hub_hub"
