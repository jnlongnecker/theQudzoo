import _implicitStylesheets from "./qudzooBanner.css";

import _implicitScopedStylesheets from "./qudzooBanner.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element, d: api_dynamic_text} = $api;
  return [api_element("section", {
    classMap: {
      "banner": true
    },
    key: 0
  }, [api_element("div", {
    classMap: {
      "title": true
    },
    key: 1
  }, [api_element("h1", {
    key: 2
  }, [api_text("qudzoo >")]), api_element("p", {
    key: 3
  }, [api_text(api_dynamic_text($cmp.pathText)), api_element("span", {
    classMap: {
      "blinker": true
    },
    key: 4
  }, [api_text("|")])])]), api_element("div", {
    key: 5
  }, [api_element("img", {
    attrs: {
      "src": "/1/asset/s/latest/public/assets/images/pyramids.png"
    },
    key: 6
  }, [])])]), api_element("section", {
    key: 7
  }, [api_element("p", {
    classMap: {
      "blurb": true
    },
    key: 8
  }, [api_text("Your one-stop shop for improving in Caves of Qud.")])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-qudzooBanner_qudzooBanner"
