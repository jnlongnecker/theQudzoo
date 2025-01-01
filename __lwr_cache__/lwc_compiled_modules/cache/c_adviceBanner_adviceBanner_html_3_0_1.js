import _implicitStylesheets from "./adviceBanner.css";

import _implicitScopedStylesheets from "./adviceBanner.scoped.css?scoped=true";

import _inputButton from "input/button";
import _adviceHub from "advice/hub";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element, c: api_custom_element} = $api;
  return [api_element("section", {
    key: 0
  }, [api_element("h2", {
    key: 1
  }, [api_element("a", {
    attrs: {
      "href": "/builds"
    },
    key: 2
  }, [api_text("Build Maker")])]), api_element("p", {
    key: 3
  }, [api_text("Make your own builds for Qud and import them into your game, or pick one made by someone else.")]), api_element("a", {
    attrs: {
      "href": "/builds"
    },
    key: 4
  }, [api_custom_element("input-button", _inputButton, {
    props: {
      "size": "large thin"
    },
    key: 5
  }, [api_text("Take Me There")])]), api_element("a", {
    attrs: {
      "href": "/library"
    },
    key: 6
  }, [api_custom_element("input-button", _inputButton, {
    props: {
      "size": "large thin"
    },
    key: 7
  }, [api_text("Browse Builds")])])]), api_element("section", {
    key: 8
  }, [api_element("h2", {
    key: 9
  }, [api_element("a", {
    attrs: {
      "href": "/advice"
    },
    key: 10
  }, [api_text("Advice Articles")])]), api_element("p", {
    key: 11
  }, [api_text("Breakdowns of the most relevant layers of Qud by "), api_element("span", {
    classMap: {
      "name": true
    },
    key: 12
  }, [api_text("A-F-F-I-N-E")])]), api_element("div", {
    key: 13
  }, [api_custom_element("advice-hub", _adviceHub, {
    key: 14
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
