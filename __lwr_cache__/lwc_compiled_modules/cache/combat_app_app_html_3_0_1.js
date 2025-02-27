import _implicitStylesheets from "./app.css";

import _implicitScopedStylesheets from "./app.scoped.css?scoped=true";

import _combatCharacterBuilder from "combat/characterBuilder";
import _combatControls from "combat/controls";
import _combatCreaturePicker from "combat/creaturePicker";
import _combatActionLog from "combat/actionLog";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, c: api_custom_element, h: api_element} = $api;
  const {_m0, _m1, _m2, _m3} = $ctx;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, [api_element("section", {
    classMap: {
      "app-container": true
    },
    key: 1
  }, [api_custom_element("combat-character-builder", _combatCharacterBuilder, {
    props: {
      "character": $cmp.creature
    },
    key: 2,
    on: {
      "charchange": _m0 || ($ctx._m0 = api_bind($cmp.updateCreature))
    }
  }, []), api_custom_element("combat-controls", _combatControls, {
    props: {
      "creature": $cmp.creature
    },
    key: 3,
    on: {
      "actionattributechange": _m1 || ($ctx._m1 = api_bind($cmp.handleActionAttributeChange))
    }
  }, []), api_custom_element("combat-creature-picker", _combatCreaturePicker, {
    key: 4
  }, [])]), api_element("section", {
    classMap: {
      "log-container": true
    },
    key: 5
  }, [api_custom_element("combat-action-log", _combatActionLog, {
    key: 6,
    on: {
      "undoaction": _m2 || ($ctx._m2 = api_bind($cmp.handleUndoAction)),
      "redoaction": _m3 || ($ctx._m3 = api_bind($cmp.handleRedoAction))
    }
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
tmpl.stylesheetToken = "combat-app_app"
