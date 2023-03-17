import _implicitStylesheets from "./profile.css";

import _implicitScopedStylesheets from "./profile.scoped.css?scoped=true";

import _inputText from "input/text";
import _buildLibrary from "build/library";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, d: api_dynamic_text, t: api_text, h: api_element, c: api_custom_element} = $api;
  const {_m0, _m1, _m2} = $ctx;
  return [$cmp.userExists ? api_element("section", {
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.endEdit)),
      "keydown": _m1 || ($ctx._m1 = api_bind($cmp.confirmEdit))
    }
  }, [api_element("h1", {
    key: 1
  }, [api_element("span", {
    classMap: {
      "name": true
    },
    key: 2
  }, [api_text(api_dynamic_text($cmp.user.username))]), api_element("span", {
    key: 3
  }, [api_text("aka")]), api_element("span", {
    classMap: {
      "edit-name": true,
      "name": true
    },
    key: 4,
    on: {
      "click": _m2 || ($ctx._m2 = api_bind($cmp.allowEdit))
    }
  }, [!$cmp.editingName ? api_element("span", {
    key: 5
  }, [api_text(api_dynamic_text($cmp.user.name))]) : null, $cmp.editingName ? api_custom_element("input-text", _inputText, {
    props: {
      "variant": "skill",
      "value": $cmp.user.name
    },
    key: 6
  }, []) : null, api_element("svg", {
    attrs: {
      "clip-rule": "evenodd",
      "fill-rule": "evenodd",
      "stroke-linejoin": "round",
      "stroke-miterlimit": "2",
      "viewBox": "0 0 24 24",
      "xmlns": "http://www.w3.org/2000/svg"
    },
    key: 7,
    svg: true
  }, [api_element("path", {
    attrs: {
      "d": "m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z",
      "fill-rule": "nonzero"
    },
    key: 8,
    svg: true
  }, [])])])]), api_element("hr", {
    key: 9
  }, []), api_element("h2", {
    key: 10
  }, [api_text("My Library")]), api_custom_element("build-library", _buildLibrary, {
    props: {
      "mode": "delete",
      "filters": $cmp.libraryFilters
    },
    key: 11
  }, [])]) : null];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-profile_profile"
