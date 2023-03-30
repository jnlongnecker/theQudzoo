import _implicitStylesheets from "./container.css";

import _implicitScopedStylesheets from "./container.scoped.css?scoped=true";

import _buildCard from "build/card";
import _inputSwitch from "input/switch";
import _inputButton from "input/button";
import _buildMutantBuilder from "build/mutantBuilder";
import _buildTag from "build/tag";
import _buildTruekinBuilder from "build/truekinBuilder";
import _inputIcon from "input/icon";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, t: api_text, h: api_element, c: api_custom_element} = $api;
  const {_m0, _m1, _m2, _m3, _m4, _m5, _m6, _m7, _m8, _m9, _m10, _m11, _m12, _m13, _m14, _m15, _m16, _m17, _m18, _m19, _m20, _m21, _m22, _m23, _m24, _m25} = $ctx;
  return [api_element("section", {
    classMap: {
      "container": true
    },
    key: 0
  }, [api_element("div", {
    classMap: {
      "builder-app": true
    },
    key: 1
  }, [api_element("div", {
    classMap: {
      "tabs": true
    },
    key: 2
  }, [api_element("button", {
    attrs: {
      "selected": ""
    },
    key: 3,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.tabSwitch))
    }
  }, [api_text("Mutants")]), api_element("button", {
    key: 4,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.tabSwitch))
    }
  }, [api_text("True Kin")])]), api_element("section", {
    classMap: {
      "builder": true
    },
    key: 5
  }, [$cmp.mutantSelected ? api_custom_element("build-mutant-builder", _buildMutantBuilder, {
    props: {
      "build": $cmp.sanitisedBuild
    },
    key: 6,
    on: {
      "buildupdated": _m2 || ($ctx._m2 = api_bind($cmp.calculateBuildCode))
    }
  }, [api_element("section", {
    className: $cmp.popupClass,
    key: 7,
    on: {
      "click": _m3 || ($ctx._m3 = api_bind($cmp.saveCancel))
    }
  }, [api_element("div", {
    classMap: {
      "save-customization": true
    },
    key: 8,
    on: {
      "click": _m4 || ($ctx._m4 = api_bind($cmp.stopProp))
    }
  }, [api_element("h2", {
    key: 9
  }, [api_text(":finalize build details:")]), api_custom_element("build-card", _buildCard, {
    props: {
      "mode": "static",
      "build": $cmp.currBuild
    },
    key: 10
  }, []), api_element("form", {
    key: 11
  }, [api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 12
  }, [api_text(":build name:")]), api_element("input", {
    classMap: {
      "name-input": true
    },
    props: {
      "value": $cmp.buildName
    },
    key: 13,
    on: {
      "change": _m5 || ($ctx._m5 = api_bind($cmp.updateBuildName))
    }
  }, []), api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 14
  }, [api_text(":build accessibility:")]), api_custom_element("input-switch", _inputSwitch, {
    props: {
      "left": "private",
      "right": "public",
      "uncheckcolor": "strength",
      "checkcolor": "intelligence",
      "checked": $cmp.isPublic
    },
    key: 15,
    on: {
      "switch": _m6 || ($ctx._m6 = api_bind($cmp.updateAccessibility))
    }
  }, []), api_element("div", {
    classMap: {
      "btns": true
    },
    key: 16
  }, [$cmp.saveRequested ? api_custom_element("input-button", _inputButton, {
    props: {
      "size": "large",
      "variant": "toughness"
    },
    key: 17,
    on: {
      "click": _m7 || ($ctx._m7 = api_bind($cmp.saveCancel))
    }
  }, [api_text("Cancel")]) : null, $cmp.isSaveable ? api_custom_element("input-button", _inputButton, {
    props: {
      "size": "large",
      "variant": "willpower"
    },
    key: 18,
    on: {
      "click": _m8 || ($ctx._m8 = api_bind($cmp.saveBuild))
    }
  }, [api_text("Save")]) : null])])])])]) : null, $cmp.truekinSelected ? api_custom_element("build-truekin-builder", _buildTruekinBuilder, {
    props: {
      "build": $cmp.sanitisedBuild
    },
    key: 19,
    on: {
      "buildupdated": _m9 || ($ctx._m9 = api_bind($cmp.calculateBuildCode))
    }
  }, [api_element("section", {
    className: $cmp.popupClass,
    key: 20,
    on: {
      "click": _m10 || ($ctx._m10 = api_bind($cmp.saveCancel))
    }
  }, [api_element("div", {
    classMap: {
      "save-customization": true
    },
    key: 21,
    on: {
      "click": _m11 || ($ctx._m11 = api_bind($cmp.stopProp))
    }
  }, [api_element("h2", {
    key: 22
  }, [api_text(":finalize build details:")]), api_custom_element("build-card", _buildCard, {
    props: {
      "mode": "static",
      "build": $cmp.currBuild
    },
    key: 23
  }, []), api_element("form", {
    key: 24
  }, [api_element("div", {
    classMap: {
      "build-details": true
    },
    key: 25
  }, [api_element("div", {
    classMap: {
      "tags": true
    },
    key: 26
  }, [api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 27
  }, [api_text(":style:")]), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Melee",
      "variant": "strength",
      "activated": $cmp.isMelee
    },
    key: 28,
    on: {
      "click": _m12 || ($ctx._m12 = api_bind($cmp.handleTagSelect))
    }
  }, []), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Ranged",
      "variant": "skill",
      "activated": $cmp.isRanged
    },
    key: 29,
    on: {
      "click": _m13 || ($ctx._m13 = api_bind($cmp.handleTagSelect))
    }
  }, []), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Esper",
      "variant": "ego",
      "activated": $cmp.isEsper
    },
    key: 30,
    on: {
      "click": _m14 || ($ctx._m14 = api_bind($cmp.handleTagSelect))
    }
  }, [])]), api_element("div", {
    classMap: {
      "form-inputs": true
    },
    key: 31
  }, [api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 32
  }, [api_text(":build name:")]), api_element("input", {
    classMap: {
      "name-input": true
    },
    props: {
      "value": $cmp.buildName
    },
    key: 33,
    on: {
      "change": _m15 || ($ctx._m15 = api_bind($cmp.updateBuildName))
    }
  }, []), api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 34
  }, [api_text(":build accessibility:")]), api_custom_element("input-switch", _inputSwitch, {
    props: {
      "left": "private",
      "right": "public",
      "uncheckcolor": "strength",
      "checkcolor": "intelligence",
      "checked": $cmp.isPublic
    },
    key: 35,
    on: {
      "switch": _m16 || ($ctx._m16 = api_bind($cmp.updateAccessibility))
    }
  }, [])]), api_element("div", {
    classMap: {
      "tags": true
    },
    key: 36
  }, [api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 37
  }, [api_text(":difficulty:")]), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Beginner",
      "variant": "willpower",
      "activated": $cmp.isBeginner
    },
    key: 38,
    on: {
      "click": _m17 || ($ctx._m17 = api_bind($cmp.handleTagSelect))
    }
  }, []), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Intermediate",
      "variant": "stat",
      "activated": $cmp.isIntermediate
    },
    key: 39,
    on: {
      "click": _m18 || ($ctx._m18 = api_bind($cmp.handleTagSelect))
    }
  }, []), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Advanced",
      "variant": "toughness",
      "activated": $cmp.isAdvanced
    },
    key: 40,
    on: {
      "click": _m19 || ($ctx._m19 = api_bind($cmp.handleTagSelect))
    }
  }, [])])]), api_element("div", {
    classMap: {
      "btns": true
    },
    key: 41
  }, [$cmp.saveRequested ? api_custom_element("input-button", _inputButton, {
    props: {
      "size": "large",
      "variant": "toughness"
    },
    key: 42,
    on: {
      "click": _m20 || ($ctx._m20 = api_bind($cmp.saveCancel))
    }
  }, [api_text("Cancel")]) : null, $cmp.isSaveable ? api_custom_element("input-button", _inputButton, {
    props: {
      "size": "large",
      "variant": "willpower"
    },
    key: 43,
    on: {
      "click": _m21 || ($ctx._m21 = api_bind($cmp.saveBuild))
    }
  }, [api_text("Save")]) : null])])])])]) : null])]), api_element("section", {
    classMap: {
      "code": true
    },
    key: 44
  }, [api_element("div", {
    classMap: {
      "build-action": true
    },
    key: 45
  }, [api_element("h2", {
    classMap: {
      "no-mobile": true
    },
    key: 46
  }, [api_text(":copy build code:")]), !$cmp.codeAvailable ? api_element("button", {
    classMap: {
      "x-btn": true
    },
    key: 47,
    on: {
      "click": _m22 || ($ctx._m22 = api_bind($cmp.copyCode))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "cross",
      "padding": "x-large",
      "title": $cmp.btnTitle
    },
    key: 48
  }, [])]) : null, $cmp.codeAvailable ? api_element("button", {
    key: 49,
    on: {
      "click": _m23 || ($ctx._m23 = api_bind($cmp.copyCode))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "clipboard",
      "flipvariant": "check",
      "padding": "x-large"
    },
    key: 50
  }, [])]) : null]), api_element("div", {
    classMap: {
      "build-action": true
    },
    key: 51
  }, [api_element("h2", {
    classMap: {
      "no-mobile": true
    },
    key: 52
  }, [api_text(":save build:")]), !$cmp.isSaveable ? api_element("button", {
    classMap: {
      "x-btn": true
    },
    key: 53
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "cross",
      "padding": "x-large",
      "title": $cmp.btnTitle
    },
    key: 54
  }, [])]) : null, $cmp.isSaveable ? api_element("button", {
    key: 55,
    on: {
      "click": _m24 || ($ctx._m24 = api_bind($cmp.saveClick))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "save",
      "padding": "x-large"
    },
    key: 56
  }, [])]) : null]), api_element("div", {
    classMap: {
      "build-action": true
    },
    key: 57
  }, [api_element("h2", {
    key: 58
  }, [api_text(":character name:")]), api_element("input", {
    classMap: {
      "name-input": true
    },
    key: 59,
    on: {
      "change": _m25 || ($ctx._m25 = api_bind($cmp.updateName))
    }
  }, [])])])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-container_container"
