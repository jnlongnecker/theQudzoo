import _implicitStylesheets from "./controls.css";

import _implicitScopedStylesheets from "./controls.scoped.css?scoped=true";

import _combatAttributeControls from "combat/attributeControls";
import _combatEquipmentControls from "combat/equipmentControls";
import _combatSkillControls from "combat/skillControls";
import _combatCombatControls from "combat/combatControls";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, t: api_text, h: api_element, c: api_custom_element} = $api;
  const {_m0} = $ctx;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, [api_element("div", {
    classMap: {
      "tabs": true
    },
    key: 1,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.changeTab))
    }
  }, [api_element("button", {
    classMap: {
      "tab": true,
      "selected": true
    },
    key: 2
  }, [api_text("Attributes")]), api_element("button", {
    classMap: {
      "tab": true
    },
    key: 3
  }, [api_text("Equipment")]), api_element("button", {
    classMap: {
      "tab": true
    },
    key: 4
  }, [api_text("Skills")]), api_element("button", {
    classMap: {
      "tab": true
    },
    key: 5
  }, [api_text("Combat")])]), api_element("div", {
    classMap: {
      "panel": true
    },
    key: 6
  }, [$cmp.showAttributes ? api_custom_element("combat-attribute-controls", _combatAttributeControls, {
    props: {
      "creature": $cmp.creature,
      "mode": $cmp.mode
    },
    key: 7
  }, []) : null, $cmp.showEquipment ? api_custom_element("combat-equipment-controls", _combatEquipmentControls, {
    key: 8
  }, []) : null, $cmp.showSkills ? api_custom_element("combat-skill-controls", _combatSkillControls, {
    key: 9
  }, []) : null, $cmp.showCombat ? api_custom_element("combat-combat-controls", _combatCombatControls, {
    props: {
      "character": $cmp.creature,
      "enemy": $cmp.enemy
    },
    key: 10
  }, []) : null])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "combat-controls_controls"
