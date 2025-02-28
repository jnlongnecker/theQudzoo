import _implicitStylesheets from "./characterBuilder.css";

import _implicitScopedStylesheets from "./characterBuilder.scoped.css?scoped=true";

import _combatStatSpread from "combat/statSpread";
import _inputSwitch from "input/switch";
import _inputIcon from "input/icon";
import _inputButton from "input/button";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, t: api_text, h: api_element, b: api_bind} = $api;
  const {_m0, _m1, _m2} = $ctx;
  return [$cmp.character ? api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, [api_custom_element("combat-stat-spread", _combatStatSpread, {
    props: {
      "isPlayer": "true",
      "creature": $cmp.character
    },
    key: 1
  }, []), api_element("div", {
    classMap: {
      "buttons": true
    },
    key: 2
  }, [api_element("div", {
    classMap: {
      "button-collection": true
    },
    key: 3
  }, [api_element("label", {
    key: 4
  }, [api_text("Mode")]), api_custom_element("input-switch", _inputSwitch, {
    props: {
      "left": "Leveled",
      "right": "Free",
      "uncheckcolor": "agility",
      "checkcolor": "ego"
    },
    key: 5,
    on: {
      "switch": _m0 || ($ctx._m0 = api_bind($cmp.toggleMode))
    }
  }, [])]), api_element("div", {
    classMap: {
      "button-collection": true
    },
    key: 6
  }, [api_custom_element("input-button", _inputButton, {
    props: {
      "size": "small",
      "variant": "thin willpower"
    },
    key: 7,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.sendActionLevelUp))
    }
  }, [api_element("span", {
    classMap: {
      "button-details": true
    },
    key: 8
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "up",
      "size": "normal"
    },
    key: 9
  }, []), api_text("Level Up")])]), api_custom_element("input-button", _inputButton, {
    props: {
      "size": "small",
      "variant": "thin toughness"
    },
    key: 10,
    on: {
      "click": _m2 || ($ctx._m2 = api_bind($cmp.sendActionLevelReset))
    }
  }, [api_element("span", {
    classMap: {
      "button-details": true
    },
    key: 11
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "refresh",
      "size": "normal"
    },
    key: 12
  }, []), api_text("Reset Level")])])])])]) : null];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "combat-characterBuilder_characterBuilder"
