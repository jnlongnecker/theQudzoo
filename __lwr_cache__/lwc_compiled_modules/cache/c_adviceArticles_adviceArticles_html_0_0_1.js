import _implicitStylesheets from "./adviceArticles.css";

import _implicitScopedStylesheets from "./adviceArticles.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element, k: api_key, b: api_bind, d: api_dynamic_text, i: api_iterator, f: api_flatten} = $api;
  const {_m0} = $ctx;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, api_flatten([api_element("h1", {
    key: 1
  }, [api_text("Advice Articles")]), api_iterator($cmp.itemList, function (article) {
    return api_element("p", {
      key: api_key(2, article.link)
    }, [api_element("a", {
      className: article.class,
      attrs: {
        "href": article.link
      },
      key: 3,
      on: {
        "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClick))
      }
    }, [api_text(api_dynamic_text(article.label))])]);
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
tmpl.stylesheetToken = "c-adviceArticles_adviceArticles"
