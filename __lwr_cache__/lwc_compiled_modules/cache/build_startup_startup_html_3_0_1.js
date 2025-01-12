import _implicitStylesheets from "./startup.css";

import _implicitScopedStylesheets from "./startup.scoped.css?scoped=true";

import _inputButton from "input/button";
import _buildContainer from "build/container";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element, gid: api_scoped_id, b: api_bind, c: api_custom_element, d: api_dynamic_text} = $api;
  const {_m0, _m1} = $ctx;
  return [!$cmp.choiceConfirmed ? api_element("section", {
    classMap: {
      "choices": true
    },
    key: 0
  }, [api_element("h2", {
    key: 1
  }, [api_text(":qudzoo build editor:")]), api_element("div", {
    classMap: {
      "half": true
    },
    key: 2
  }, [api_element("div", {
    classMap: {
      "choices": true
    },
    key: 3
  }, [api_custom_element("input-button", _inputButton, {
    props: {
      "ariaLabelledBy": api_scoped_id("create-label"),
      "variant": "willpower",
      "animation": "flicker",
      "size": "large thin"
    },
    key: 4,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.createNew))
    }
  }, [api_text("Create New")]), api_element("label", {
    attrs: {
      "id": api_scoped_id("create-label")
    },
    key: 5
  }, [api_text("Craft your megamind builds here")])]), api_element("span", {
    key: 6
  }, [])]), api_element("hr", {
    key: 7
  }, []), api_element("div", {
    classMap: {
      "half": true
    },
    key: 8
  }, [api_element("span", {
    key: 9
  }, []), api_element("div", {
    classMap: {
      "choices": true
    },
    key: 10
  }, [api_custom_element("input-button", _inputButton, {
    props: {
      "ariaLabelledBy": api_scoped_id("load-label"),
      "variant": "intelligence",
      "animation": "flicker",
      "size": "large thin"
    },
    key: 11,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.loadCode))
    }
  }, [api_text("Load Build Code")]), api_element("input", {
    classMap: {
      "build-input": true
    },
    key: 12
  }, []), $cmp.error ? api_element("p", {
    classMap: {
      "error": true
    },
    key: 13
  }, [api_text(api_dynamic_text($cmp.error))]) : null, api_element("label", {
    attrs: {
      "id": api_scoped_id("load-label")
    },
    key: 14
  }, [api_text("Or adjust one that's already been made")])])])]) : null, $cmp.choiceConfirmed ? api_custom_element("build-container", _buildContainer, {
    props: {
      "idval": $cmp.startingId,
      "startingbuild": $cmp.startingBuild
    },
    key: 15
  }, []) : null];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-startup_startup"
