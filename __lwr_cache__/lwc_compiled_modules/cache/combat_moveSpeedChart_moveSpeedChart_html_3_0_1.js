import _implicitStylesheets from "./moveSpeedChart.css";

import _implicitScopedStylesheets from "./moveSpeedChart.scoped.css?scoped=true";

import _cChart from "c/chart";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element} = $api;
  return [api_custom_element("c-chart", _cChart, {
    props: {
      "info": $cmp.data
    },
    key: 0
  }, [])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "combat-moveSpeedChart_moveSpeedChart"
