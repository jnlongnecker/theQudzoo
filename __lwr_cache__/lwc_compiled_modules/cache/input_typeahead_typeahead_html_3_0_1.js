import _implicitStylesheets from "./typeahead.css";

import _implicitScopedStylesheets from "./typeahead.scoped.css?scoped=true";

import _inputTypeaheadOption from "input/typeaheadOption";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, h: api_element, k: api_key, c: api_custom_element, i: api_iterator} = $api;
  const {_m0, _m1, _m2, _m3} = $ctx;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, [api_element("input", {
    attrs: {
      "type": "text",
      "placeholder": $cmp.placeholder,
      "name": $cmp.name,
      "autocomplete": "off"
    },
    props: {
      "value": $cmp.value
    },
    key: 1,
    on: {
      "keydown": _m0 || ($ctx._m0 = api_bind($cmp.updateFilter)),
      "focus": _m1 || ($ctx._m1 = api_bind($cmp.handleFocus)),
      "blur": _m2 || ($ctx._m2 = api_bind($cmp.handleBlur))
    }
  }, []), $cmp.optionsAvailable ? api_element("div", {
    classMap: {
      "options": true
    },
    key: 2
  }, api_iterator($cmp.filteredOptions, function (itValue, itIndex, itFirst, itLast) {
    const it = {
      value: itValue,
      index: itIndex,
      first: itFirst,
      last: itLast
    };
    return api_custom_element("input-typeahead-option", _inputTypeaheadOption, {
      props: {
        "value": it.value.item
      },
      key: api_key(3, it.value.id),
      on: {
        "selected": _m3 || ($ctx._m3 = api_bind($cmp.handleSelection))
      }
    }, []);
  })) : null])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "input-typeahead_typeahead"
