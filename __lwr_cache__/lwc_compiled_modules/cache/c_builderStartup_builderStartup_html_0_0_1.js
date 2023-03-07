import _implicitStylesheets from "./builderStartup.css";

import _implicitScopedStylesheets from "./builderStartup.scoped.css?scoped=true";

import _cBuilderContainer from "c/builderContainer";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, t: api_text, h: api_element, c: api_custom_element} = $api;
  const {_m0, _m1} = $ctx;
  return [!$cmp.choiceConfirmed ? api_element("section", {
    classMap: {
      "choices": true
    },
    key: 0
  }, [api_element("button", {
    key: 1,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.createNew))
    }
  }, [api_text("Create New")]), api_element("button", {
    key: 2,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.loadCode))
    }
  }, [api_text("Load Build Code")]), api_element("input", {
    key: 3
  }, [])]) : null, $cmp.choiceConfirmed ? api_custom_element("c-builder-container", _cBuilderContainer, {
    props: {
      "idval": $cmp.startingId,
      "code": $cmp.startingCode
    },
    key: 4
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
tmpl.stylesheetToken = "c-builderStartup_builderStartup"
