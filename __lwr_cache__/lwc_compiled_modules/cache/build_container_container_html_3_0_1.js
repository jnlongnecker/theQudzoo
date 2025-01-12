import _implicitStylesheets from "./container.css";

import _implicitScopedStylesheets from "./container.scoped.css?scoped=true";

import _buildCard from "build/card";
import _buildTag from "build/tag";
import _inputSwitch from "input/switch";
import _inputButton from "input/button";
import _buildMutantBuilder from "build/mutantBuilder";
import _buildTruekinBuilder from "build/truekinBuilder";
import _inputIcon from "input/icon";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, t: api_text, h: api_element, c: api_custom_element} = $api;
  const {_m0, _m1, _m2, _m3, _m4, _m5, _m6, _m7, _m8, _m9, _m10, _m11, _m12, _m13, _m14, _m15, _m16, _m17, _m18, _m19, _m20, _m21, _m22, _m23, _m24, _m25, _m26, _m27, _m28, _m29, _m30, _m31, _m32, _m33} = $ctx;
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
      "buildupdated": _m2 || ($ctx._m2 = api_bind($cmp.calculateBuildCode)),
      "descriptionupdated": _m3 || ($ctx._m3 = api_bind($cmp.handleDescriptionUpdate))
    }
  }, [api_element("section", {
    className: $cmp.popupClass,
    key: 7,
    on: {
      "click": _m4 || ($ctx._m4 = api_bind($cmp.saveCancel))
    }
  }, [api_element("div", {
    classMap: {
      "save-customization": true
    },
    key: 8,
    on: {
      "click": _m5 || ($ctx._m5 = api_bind($cmp.stopProp))
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
  }, [api_element("div", {
    classMap: {
      "build-details": true
    },
    key: 12
  }, [api_element("div", {
    classMap: {
      "tags": true
    },
    key: 13
  }, [api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 14
  }, [api_text(":style:")]), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Melee",
      "variant": "strength",
      "activated": $cmp.isMelee
    },
    key: 15,
    on: {
      "click": _m6 || ($ctx._m6 = api_bind($cmp.handleTagSelect))
    }
  }, []), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Ranged",
      "variant": "skill",
      "activated": $cmp.isRanged
    },
    key: 16,
    on: {
      "click": _m7 || ($ctx._m7 = api_bind($cmp.handleTagSelect))
    }
  }, []), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Esper",
      "variant": "ego",
      "activated": $cmp.isEsper
    },
    key: 17,
    on: {
      "click": _m8 || ($ctx._m8 = api_bind($cmp.handleTagSelect))
    }
  }, [])]), api_element("div", {
    classMap: {
      "form-inputs": true
    },
    key: 18
  }, [api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 19
  }, [api_text(":build name:")]), api_element("input", {
    classMap: {
      "name-input": true
    },
    attrs: {
      "maxlength": "30"
    },
    props: {
      "value": $cmp.buildName
    },
    key: 20,
    on: {
      "change": _m9 || ($ctx._m9 = api_bind($cmp.updateBuildName))
    }
  }, []), api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 21
  }, [api_text(":build accessibility:")]), api_custom_element("input-switch", _inputSwitch, {
    props: {
      "left": "private",
      "right": "public",
      "uncheckcolor": "strength",
      "checkcolor": "intelligence",
      "checked": $cmp.isPublic
    },
    key: 22,
    on: {
      "switch": _m10 || ($ctx._m10 = api_bind($cmp.updateAccessibility))
    }
  }, [])]), api_element("div", {
    classMap: {
      "tags": true
    },
    key: 23
  }, [api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 24
  }, [api_text(":difficulty:")]), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Beginner",
      "variant": "willpower",
      "activated": $cmp.isBeginner
    },
    key: 25,
    on: {
      "click": _m11 || ($ctx._m11 = api_bind($cmp.handleTagSelect))
    }
  }, []), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Intermediate",
      "variant": "stat",
      "activated": $cmp.isIntermediate
    },
    key: 26,
    on: {
      "click": _m12 || ($ctx._m12 = api_bind($cmp.handleTagSelect))
    }
  }, []), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Advanced",
      "variant": "toughness",
      "activated": $cmp.isAdvanced
    },
    key: 27,
    on: {
      "click": _m13 || ($ctx._m13 = api_bind($cmp.handleTagSelect))
    }
  }, [])])]), api_element("div", {
    classMap: {
      "btns": true
    },
    key: 28
  }, [$cmp.saveRequested ? api_custom_element("input-button", _inputButton, {
    props: {
      "size": "large",
      "variant": "toughness"
    },
    key: 29,
    on: {
      "click": _m14 || ($ctx._m14 = api_bind($cmp.saveCancel))
    }
  }, [api_text("Cancel")]) : null, $cmp.isSaveable ? api_custom_element("input-button", _inputButton, {
    props: {
      "size": "large",
      "variant": "willpower"
    },
    key: 30,
    on: {
      "click": _m15 || ($ctx._m15 = api_bind($cmp.saveBuild))
    }
  }, [api_text("Save")]) : null])])])])]) : null, $cmp.truekinSelected ? api_custom_element("build-truekin-builder", _buildTruekinBuilder, {
    props: {
      "build": $cmp.sanitisedBuild
    },
    key: 31,
    on: {
      "buildupdated": _m16 || ($ctx._m16 = api_bind($cmp.calculateBuildCode)),
      "descriptionupdated": _m17 || ($ctx._m17 = api_bind($cmp.handleDescriptionUpdate))
    }
  }, [api_element("section", {
    className: $cmp.popupClass,
    key: 32,
    on: {
      "click": _m18 || ($ctx._m18 = api_bind($cmp.saveCancel))
    }
  }, [api_element("div", {
    classMap: {
      "save-customization": true
    },
    key: 33,
    on: {
      "click": _m19 || ($ctx._m19 = api_bind($cmp.stopProp))
    }
  }, [api_element("h2", {
    key: 34
  }, [api_text(":finalize build details:")]), api_custom_element("build-card", _buildCard, {
    props: {
      "mode": "static",
      "build": $cmp.currBuild
    },
    key: 35
  }, []), api_element("form", {
    key: 36
  }, [api_element("div", {
    classMap: {
      "build-details": true
    },
    key: 37
  }, [api_element("div", {
    classMap: {
      "tags": true
    },
    key: 38
  }, [api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 39
  }, [api_text(":style:")]), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Melee",
      "variant": "strength",
      "activated": $cmp.isMelee
    },
    key: 40,
    on: {
      "click": _m20 || ($ctx._m20 = api_bind($cmp.handleTagSelect))
    }
  }, []), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Ranged",
      "variant": "skill",
      "activated": $cmp.isRanged
    },
    key: 41,
    on: {
      "click": _m21 || ($ctx._m21 = api_bind($cmp.handleTagSelect))
    }
  }, []), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Esper",
      "variant": "ego",
      "activated": $cmp.isEsper
    },
    key: 42,
    on: {
      "click": _m22 || ($ctx._m22 = api_bind($cmp.handleTagSelect))
    }
  }, [])]), api_element("div", {
    classMap: {
      "form-inputs": true
    },
    key: 43
  }, [api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 44
  }, [api_text(":build name:")]), api_element("input", {
    classMap: {
      "name-input": true
    },
    attrs: {
      "maxlength": "30"
    },
    props: {
      "value": $cmp.buildName
    },
    key: 45,
    on: {
      "change": _m23 || ($ctx._m23 = api_bind($cmp.updateBuildName))
    }
  }, []), api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 46
  }, [api_text(":build accessibility:")]), api_custom_element("input-switch", _inputSwitch, {
    props: {
      "left": "private",
      "right": "public",
      "uncheckcolor": "strength",
      "checkcolor": "intelligence",
      "checked": $cmp.isPublic
    },
    key: 47,
    on: {
      "switch": _m24 || ($ctx._m24 = api_bind($cmp.updateAccessibility))
    }
  }, [])]), api_element("div", {
    classMap: {
      "tags": true
    },
    key: 48
  }, [api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 49
  }, [api_text(":difficulty:")]), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Beginner",
      "variant": "willpower",
      "activated": $cmp.isBeginner
    },
    key: 50,
    on: {
      "click": _m25 || ($ctx._m25 = api_bind($cmp.handleTagSelect))
    }
  }, []), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Intermediate",
      "variant": "stat",
      "activated": $cmp.isIntermediate
    },
    key: 51,
    on: {
      "click": _m26 || ($ctx._m26 = api_bind($cmp.handleTagSelect))
    }
  }, []), api_custom_element("build-tag", _buildTag, {
    props: {
      "label": "Advanced",
      "variant": "toughness",
      "activated": $cmp.isAdvanced
    },
    key: 52,
    on: {
      "click": _m27 || ($ctx._m27 = api_bind($cmp.handleTagSelect))
    }
  }, [])])]), api_element("div", {
    classMap: {
      "btns": true
    },
    key: 53
  }, [$cmp.saveRequested ? api_custom_element("input-button", _inputButton, {
    props: {
      "size": "large",
      "variant": "toughness"
    },
    key: 54,
    on: {
      "click": _m28 || ($ctx._m28 = api_bind($cmp.saveCancel))
    }
  }, [api_text("Cancel")]) : null, $cmp.isSaveable ? api_custom_element("input-button", _inputButton, {
    props: {
      "size": "large",
      "variant": "willpower"
    },
    key: 55,
    on: {
      "click": _m29 || ($ctx._m29 = api_bind($cmp.saveBuild))
    }
  }, [api_text("Save")]) : null])])])])]) : null])]), api_element("section", {
    classMap: {
      "code": true
    },
    key: 56
  }, [api_element("div", {
    classMap: {
      "build-action": true
    },
    key: 57
  }, [api_element("h2", {
    classMap: {
      "no-mobile": true
    },
    key: 58
  }, [api_text(":copy build code:")]), !$cmp.codeAvailable ? api_element("button", {
    classMap: {
      "x-btn": true
    },
    key: 59,
    on: {
      "click": _m30 || ($ctx._m30 = api_bind($cmp.copyCode))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "cross",
      "padding": "x-large",
      "title": $cmp.btnTitle
    },
    key: 60
  }, [])]) : null, $cmp.codeAvailable ? api_element("button", {
    key: 61,
    on: {
      "click": _m31 || ($ctx._m31 = api_bind($cmp.copyCode))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "clipboard",
      "flipvariant": "check",
      "padding": "x-large"
    },
    key: 62
  }, [])]) : null]), api_element("div", {
    classMap: {
      "build-action": true
    },
    key: 63
  }, [api_element("h2", {
    classMap: {
      "no-mobile": true
    },
    key: 64
  }, [api_text(":save build:")]), !$cmp.isSaveable ? api_element("button", {
    classMap: {
      "x-btn": true
    },
    key: 65
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "cross",
      "padding": "x-large",
      "title": $cmp.btnTitle
    },
    key: 66
  }, [])]) : null, $cmp.isSaveable ? api_element("button", {
    key: 67,
    on: {
      "click": _m32 || ($ctx._m32 = api_bind($cmp.saveClick))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "save",
      "padding": "x-large"
    },
    key: 68
  }, [])]) : null]), api_element("div", {
    classMap: {
      "build-action": true
    },
    key: 69
  }, [api_element("h2", {
    key: 70
  }, [api_text(":character name:")]), api_element("input", {
    classMap: {
      "name-input": true
    },
    attrs: {
      "maxlength": "20"
    },
    key: 71,
    on: {
      "change": _m33 || ($ctx._m33 = api_bind($cmp.updateName))
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
