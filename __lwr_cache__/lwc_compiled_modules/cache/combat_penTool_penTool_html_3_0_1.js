import _implicitStylesheets from "./penTool.css";

import _implicitScopedStylesheets from "./penTool.scoped.css?scoped=true";

import _inputNumber from "input/number";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element, b: api_bind, c: api_custom_element, d: api_dynamic_text} = $api;
  const {_m0, _m1} = $ctx;
  return [api_element("section", {
    key: 0
  }, [api_element("form", {
    key: 1
  }, [api_element("div", {
    classMap: {
      "form-section": true
    },
    key: 2
  }, [api_element("label", {
    key: 3
  }, [api_element("span", {
    classMap: {
      "stat": true,
      "pv": true
    },
    key: 4
  }, [api_text("PV")]), api_text(" (displayed)")]), api_custom_element("input-number", _inputNumber, {
    props: {
      "value": $cmp.pv
    },
    key: 5,
    on: {
      "change": _m0 || ($ctx._m0 = api_bind($cmp.updatePV))
    }
  }, [])]), api_element("div", {
    classMap: {
      "form-section": true
    },
    key: 6
  }, [api_element("label", {
    key: 7
  }, [api_element("img", {
    classMap: {
      "inline-icon": true
    },
    attrs: {
      "src": "/1/asset/s/latest/public/assets/images/statImages/armorValue.png"
    },
    key: 8
  }, []), api_element("span", {
    classMap: {
      "stat": true
    },
    key: 9
  }, [api_text("AV")]), api_text(" (displayed)")]), api_custom_element("input-number", _inputNumber, {
    props: {
      "value": $cmp.av
    },
    key: 10,
    on: {
      "change": _m1 || ($ctx._m1 = api_bind($cmp.updateAV))
    }
  }, [])])]), api_element("div", {
    classMap: {
      "result-section": true
    },
    key: 11
  }, [api_element("h2", {
    key: 12
  }, [api_text(": expected penetrations :")]), api_element("p", {
    classMap: {
      "result": true
    },
    key: 13
  }, [api_text(api_dynamic_text($cmp.result))])])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "combat-penTool_penTool"
