import _implicitStylesheets from "./descriptionEditor.css";

import _implicitScopedStylesheets from "./descriptionEditor.scoped.css?scoped=true";

import _buildMarkdownRenderer from "build/markdownRenderer";
import _inputButton from "input/button";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element, b: api_bind, d: api_dynamic_text, c: api_custom_element} = $api;
  const {_m0, _m1} = $ctx;
  return [api_element("h2", {
    key: 0
  }, [api_text(":describe your build:")]), api_element("div", {
    classMap: {
      "container": true
    },
    key: 1
  }, [api_element("p", {
    key: 2
  }, [api_text("If you know Markdown, the Qudzoo supports Markdown in your build descriptions. If you want to learn, check out the "), api_element("a", {
    attrs: {
      "target": "_blank",
      "href": "https://www.markdownguide.org/basic-syntax/"
    },
    key: 3
  }, [api_text("Markdown documentation here")]), api_text("!")]), api_element("div", {
    classMap: {
      "build-container": true
    },
    key: 4
  }, [$cmp.editBuild ? api_element("textarea", {
    attrs: {
      "placeholder": "Enter your build description here"
    },
    key: 5,
    on: {
      "keyup": _m0 || ($ctx._m0 = api_bind($cmp.handleChange))
    }
  }, [api_text(api_dynamic_text($cmp.description))]) : null, !$cmp.editBuild ? api_custom_element("build-markdown-renderer", _buildMarkdownRenderer, {
    props: {
      "rawText": $cmp.description
    },
    key: 6
  }, []) : null]), api_custom_element("input-button", _inputButton, {
    props: {
      "size": "large",
      "variant": "willpower"
    },
    key: 7,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.toggleEdit))
    }
  }, [api_text(api_dynamic_text($cmp.buttonLabel))])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-descriptionEditor_descriptionEditor"
