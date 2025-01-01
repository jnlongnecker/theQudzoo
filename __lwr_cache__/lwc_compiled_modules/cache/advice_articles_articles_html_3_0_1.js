import _implicitStylesheets from "./articles.css";

import _implicitScopedStylesheets from "./articles.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element, k: api_key, b: api_bind, d: api_dynamic_text, i: api_iterator, f: api_flatten} = $api;
  const {_m0, _m1, _m2} = $ctx;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, api_flatten([api_element("h1", {
    key: 1
  }, [api_text("Advice Articles")]), api_iterator($cmp.containerList, function (container) {
    return api_element("details", {
      attrs: {
        "open": container.defaultOpen ? "" : null
      },
      key: api_key(2, container.link)
    }, api_flatten([api_element("summary", {
      key: 3
    }, [api_element("a", {
      className: container.class,
      attrs: {
        "href": container.link
      },
      key: 4,
      on: {
        "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClick))
      }
    }, [api_text(api_dynamic_text(container.label))])]), api_iterator(container.articles, function (article) {
      return api_element("p", {
        key: api_key(5, article.link)
      }, [api_element("a", {
        className: article.class,
        attrs: {
          "href": article.link
        },
        key: 6,
        on: {
          "click": _m1 || ($ctx._m1 = api_bind($cmp.handleClick))
        }
      }, [api_text(api_dynamic_text(article.label))])]);
    })]));
  }), api_iterator($cmp.itemList, function (article) {
    return api_element("p", {
      key: api_key(7, article.link)
    }, [api_element("a", {
      className: article.class,
      attrs: {
        "href": article.link
      },
      key: 8,
      on: {
        "click": _m2 || ($ctx._m2 = api_bind($cmp.handleClick))
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
tmpl.stylesheetToken = "advice-articles_articles"
