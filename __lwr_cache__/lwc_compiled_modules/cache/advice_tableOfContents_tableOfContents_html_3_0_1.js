import _implicitStylesheets from "./tableOfContents.css";

import _implicitScopedStylesheets from "./tableOfContents.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, d: api_dynamic_text, t: api_text, h: api_element, k: api_key, i: api_iterator} = $api;
  const {_m0, _m1} = $ctx;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, [api_element("h1", {
    key: 1
  }, [api_element("a", {
    key: 2,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.scrollToTop))
    }
  }, [api_text(api_dynamic_text($cmp.pageTitle))])]), api_element("div", {
    classMap: {
      "sections": true
    },
    key: 3
  }, api_iterator($cmp.sections, function (section) {
    return api_element("p", {
      className: section.class,
      attrs: {
        "data-id": section.id
      },
      key: api_key(4, section.id),
      on: {
        "click": _m1 || ($ctx._m1 = api_bind($cmp.sectionClicked))
      }
    }, [api_element("a", {
      key: 5
    }, [api_text(api_dynamic_text(section.name))])]);
  }))])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "advice-tableOfContents_tableOfContents"
