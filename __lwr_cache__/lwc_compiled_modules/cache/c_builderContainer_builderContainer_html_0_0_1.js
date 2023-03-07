import _implicitStylesheets from "./builderContainer.css";

import _implicitScopedStylesheets from "./builderContainer.scoped.css?scoped=true";

import _cMutantBuilder from "c/mutantBuilder";
import _cTruekinBuilder from "c/truekinBuilder";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, t: api_text, h: api_element, c: api_custom_element} = $api;
  const {_m0, _m1, _m2, _m3, _m4, _m5, _m6, _m7} = $ctx;
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
  }, [$cmp.mutantSelected ? api_custom_element("c-mutant-builder", _cMutantBuilder, {
    props: {
      "build": $cmp.sanitisedBuild
    },
    key: 6,
    on: {
      "buildupdated": _m2 || ($ctx._m2 = api_bind($cmp.calculateBuildCode))
    }
  }, []) : null, $cmp.truekinSelected ? api_custom_element("c-truekin-builder", _cTruekinBuilder, {
    props: {
      "build": $cmp.sanitisedBuild
    },
    key: 7,
    on: {
      "buildupdated": _m3 || ($ctx._m3 = api_bind($cmp.calculateBuildCode))
    }
  }, []) : null])]), api_element("section", {
    classMap: {
      "code": true
    },
    key: 8
  }, [api_element("div", {
    classMap: {
      "build-action": true
    },
    key: 9
  }, [api_element("h2", {
    classMap: {
      "no-mobile": true
    },
    key: 10
  }, [api_text(":copy build code:")]), !$cmp.codeAvailable ? api_element("button", {
    classMap: {
      "x-btn": true
    },
    key: 11,
    on: {
      "click": _m4 || ($ctx._m4 = api_bind($cmp.copyCode))
    }
  }, [!$cmp.codeAvailable ? api_element("svg", {
    attrs: {
      "clip-rule": "evenodd",
      "fill-rule": "evenodd",
      "stroke-linejoin": "round",
      "stroke-miterlimit": "2",
      "viewBox": "0 0 24 24",
      "xmlns": "http://www.w3.org/2000/svg"
    },
    key: 12,
    svg: true
  }, [api_element("path", {
    attrs: {
      "d": "m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
    },
    key: 13,
    svg: true
  }, [])]) : null]) : null, $cmp.codeAvailable ? api_element("button", {
    key: 14,
    on: {
      "click": _m5 || ($ctx._m5 = api_bind($cmp.copyCode))
    }
  }, [api_element("svg", {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 24 24"
    },
    key: 15,
    svg: true
  }, [api_element("path", {
    attrs: {
      "d": $cmp.usePath
    },
    key: 16,
    svg: true
  }, [])])]) : null]), api_element("div", {
    classMap: {
      "build-action": true
    },
    key: 17
  }, [api_element("h2", {
    classMap: {
      "no-mobile": true
    },
    key: 18
  }, [api_text(":save build:")]), api_element("button", {
    key: 19,
    on: {
      "click": _m6 || ($ctx._m6 = api_bind($cmp.saveBuild))
    }
  }, [api_element("svg", {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 24 24"
    },
    key: 20,
    svg: true
  }, [api_element("path", {
    attrs: {
      "d": "M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"
    },
    key: 21,
    svg: true
  }, [])])])]), api_element("div", {
    classMap: {
      "build-action": true
    },
    key: 22
  }, [api_element("h2", {
    key: 23
  }, [api_text(":character name:")]), api_element("input", {
    classMap: {
      "name-input": true
    },
    key: 24,
    on: {
      "change": _m7 || ($ctx._m7 = api_bind($cmp.updateName))
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
tmpl.stylesheetToken = "c-builderContainer_builderContainer"
