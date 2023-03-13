import _implicitStylesheets from "./container.css";

import _implicitScopedStylesheets from "./container.scoped.css?scoped=true";

import _buildCard from "build/card";
import _buildMutantBuilder from "build/mutantBuilder";
import _buildTruekinBuilder from "build/truekinBuilder";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, t: api_text, h: api_element, c: api_custom_element} = $api;
  const {_m0, _m1, _m2, _m3, _m4, _m5, _m6, _m7, _m8, _m9, _m10, _m11, _m12, _m13, _m14, _m15, _m16, _m17, _m18, _m19} = $ctx;
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
  }, [api_text(":build accessibility:")]), api_element("div", {
    classMap: {
      "privacy": true
    },
    key: 15
  }, [api_element("label", {
    key: 16
  }, [api_text("private")]), api_element("span", {
    classMap: {
      "switch": true
    },
    key: 17
  }, [api_element("input", {
    attrs: {
      "type": "checkbox"
    },
    props: {
      "checked": $cmp.isPublic
    },
    key: 18,
    on: {
      "click": _m6 || ($ctx._m6 = api_bind($cmp.updateAccessibility))
    }
  }, []), api_element("span", {
    classMap: {
      "slider-dot": true
    },
    key: 19
  }, [])]), api_element("label", {
    key: 20
  }, [api_text("public")])]), api_element("div", {
    classMap: {
      "btns": true
    },
    key: 21
  }, [$cmp.saveRequested ? api_element("button", {
    key: 22,
    on: {
      "click": _m7 || ($ctx._m7 = api_bind($cmp.saveCancel))
    }
  }, [api_text("Cancel")]) : null, $cmp.isSaveable ? api_element("button", {
    key: 23,
    on: {
      "click": _m8 || ($ctx._m8 = api_bind($cmp.saveBuild))
    }
  }, [api_text("Save")]) : null])])])])]) : null, $cmp.truekinSelected ? api_custom_element("build-truekin-builder", _buildTruekinBuilder, {
    props: {
      "build": $cmp.sanitisedBuild
    },
    key: 24,
    on: {
      "buildupdated": _m9 || ($ctx._m9 = api_bind($cmp.calculateBuildCode))
    }
  }, [api_element("section", {
    className: $cmp.popupClass,
    key: 25,
    on: {
      "click": _m10 || ($ctx._m10 = api_bind($cmp.saveCancel))
    }
  }, [api_element("div", {
    classMap: {
      "save-customization": true
    },
    key: 26,
    on: {
      "click": _m11 || ($ctx._m11 = api_bind($cmp.stopProp))
    }
  }, [api_element("h2", {
    key: 27
  }, [api_text(":finalize build details:")]), api_custom_element("build-card", _buildCard, {
    props: {
      "mode": "static",
      "build": $cmp.currBuild
    },
    key: 28
  }, []), api_element("form", {
    key: 29
  }, [api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 30
  }, [api_text(":build name:")]), api_element("input", {
    classMap: {
      "name-input": true
    },
    props: {
      "value": $cmp.buildName
    },
    key: 31,
    on: {
      "change": _m12 || ($ctx._m12 = api_bind($cmp.updateBuildName))
    }
  }, []), api_element("label", {
    classMap: {
      "major-label": true
    },
    key: 32
  }, [api_text(":build accessibility:")]), api_element("div", {
    classMap: {
      "privacy": true
    },
    key: 33
  }, [api_element("label", {
    key: 34
  }, [api_text("private")]), api_element("span", {
    classMap: {
      "switch": true
    },
    key: 35
  }, [api_element("input", {
    attrs: {
      "type": "checkbox"
    },
    props: {
      "checked": $cmp.isPublic
    },
    key: 36,
    on: {
      "click": _m13 || ($ctx._m13 = api_bind($cmp.updateAccessibility))
    }
  }, []), api_element("span", {
    classMap: {
      "slider-dot": true
    },
    key: 37
  }, [])]), api_element("label", {
    key: 38
  }, [api_text("public")])]), api_element("div", {
    classMap: {
      "btns": true
    },
    key: 39
  }, [$cmp.saveRequested ? api_element("button", {
    key: 40,
    on: {
      "click": _m14 || ($ctx._m14 = api_bind($cmp.saveCancel))
    }
  }, [api_text("Cancel")]) : null, $cmp.isSaveable ? api_element("button", {
    key: 41,
    on: {
      "click": _m15 || ($ctx._m15 = api_bind($cmp.saveBuild))
    }
  }, [api_text("Save")]) : null])])])])]) : null])]), api_element("section", {
    classMap: {
      "code": true
    },
    key: 42
  }, [api_element("div", {
    classMap: {
      "build-action": true
    },
    key: 43
  }, [api_element("h2", {
    classMap: {
      "no-mobile": true
    },
    key: 44
  }, [api_text(":copy build code:")]), !$cmp.codeAvailable ? api_element("button", {
    classMap: {
      "x-btn": true
    },
    key: 45,
    on: {
      "click": _m16 || ($ctx._m16 = api_bind($cmp.copyCode))
    }
  }, [api_element("svg", {
    attrs: {
      "clip-rule": "evenodd",
      "fill-rule": "evenodd",
      "stroke-linejoin": "round",
      "stroke-miterlimit": "2",
      "viewBox": "0 0 24 24",
      "xmlns": "http://www.w3.org/2000/svg"
    },
    key: 46,
    svg: true
  }, [!$cmp.codeAvailable ? api_element("title", {
    key: 47,
    svg: true
  }, [api_text("You must have a build to save first.")]) : null, api_element("path", {
    attrs: {
      "d": "m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
    },
    key: 48,
    svg: true
  }, [])])]) : null, $cmp.codeAvailable ? api_element("button", {
    key: 49,
    on: {
      "click": _m17 || ($ctx._m17 = api_bind($cmp.copyCode))
    }
  }, [api_element("svg", {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 24 24"
    },
    key: 50,
    svg: true
  }, [api_element("path", {
    attrs: {
      "d": $cmp.usePath
    },
    key: 51,
    svg: true
  }, [])])]) : null]), api_element("div", {
    classMap: {
      "build-action": true
    },
    key: 52
  }, [api_element("h2", {
    classMap: {
      "no-mobile": true
    },
    key: 53
  }, [api_text(":save build:")]), !$cmp.isSaveable ? api_element("button", {
    classMap: {
      "x-btn": true
    },
    key: 54
  }, [api_element("svg", {
    attrs: {
      "clip-rule": "evenodd",
      "fill-rule": "evenodd",
      "stroke-linejoin": "round",
      "stroke-miterlimit": "2",
      "viewBox": "0 0 24 24",
      "xmlns": "http://www.w3.org/2000/svg"
    },
    key: 55,
    svg: true
  }, [!$cmp.codeAvailable ? api_element("title", {
    key: 56,
    svg: true
  }, [api_text("You must have a build to save first.")]) : null, !$cmp.isSaveable ? api_element("title", {
    key: 57,
    svg: true
  }, [api_text("You must be logged in to save a build.")]) : null, api_element("path", {
    attrs: {
      "d": "m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
    },
    key: 58,
    svg: true
  }, [])])]) : null, $cmp.isSaveable ? api_element("button", {
    key: 59,
    on: {
      "click": _m18 || ($ctx._m18 = api_bind($cmp.saveClick))
    }
  }, [api_element("svg", {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 24 24"
    },
    key: 60,
    svg: true
  }, [api_element("path", {
    attrs: {
      "d": "M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"
    },
    key: 61,
    svg: true
  }, [])])]) : null]), api_element("div", {
    classMap: {
      "build-action": true
    },
    key: 62
  }, [api_element("h2", {
    key: 63
  }, [api_text(":character name:")]), api_element("input", {
    classMap: {
      "name-input": true
    },
    key: 64,
    on: {
      "change": _m19 || ($ctx._m19 = api_bind($cmp.updateName))
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
