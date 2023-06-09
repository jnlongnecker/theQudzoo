import _implicitStylesheets from "./mutantBuilder.css";

import _implicitScopedStylesheets from "./mutantBuilder.scoped.css?scoped=true";

import _cCallingChooser from "c/callingChooser";
import _cMutationChooser from "c/mutationChooser";
import _cAttributeChooser from "c/attributeChooser";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, t: api_text, h: api_element, c: api_custom_element} = $api;
  const {_m0, _m1, _m2, _m3, _m4} = $ctx;
  return [api_element("div", {
    classMap: {
      "builder-container": true
    },
    key: 0
  }, [api_element("button", {
    classMap: {
      "previous": true
    },
    key: 1,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.backtrack))
    }
  }, [api_text("<")]), api_element("div", {
    classMap: {
      "scroll-container": true
    },
    key: 2
  }, [api_element("div", {
    classMap: {
      "scrolling-banner": true
    },
    key: 3
  }, [api_element("section", {
    classMap: {
      "calling": true
    },
    key: 4
  }, [api_custom_element("c-calling-chooser", _cCallingChooser, {
    props: {
      "calling": $cmp.calling
    },
    key: 5,
    on: {
      "callingselected": _m1 || ($ctx._m1 = api_bind($cmp.handleCallingSelection))
    }
  }, [])]), api_element("section", {
    classMap: {
      "mutations": true
    },
    key: 6
  }, [api_custom_element("c-mutation-chooser", _cMutationChooser, {
    props: {
      "muts": $cmp.mutations,
      "mp": $cmp.mpRemaining
    },
    key: 7,
    on: {
      "mutationselected": _m2 || ($ctx._m2 = api_bind($cmp.handleMutationSelection))
    }
  }, [])]), api_element("section", {
    classMap: {
      "attributes": true
    },
    key: 8
  }, [api_custom_element("c-attribute-chooser", _cAttributeChooser, {
    props: {
      "modifier": $cmp.callingModifiers,
      "attr": $cmp.attributes,
      "pts": $cmp.pointsUsed
    },
    key: 9,
    on: {
      "attributeschosen": _m3 || ($ctx._m3 = api_bind($cmp.handleAttributesChosen))
    }
  }, [])])])]), api_element("button", {
    classMap: {
      "next": true
    },
    key: 10,
    on: {
      "click": _m4 || ($ctx._m4 = api_bind($cmp.advance))
    }
  }, [api_text(">")])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-mutantBuilder_mutantBuilder"
