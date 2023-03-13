import _implicitStylesheets from "./truekinBuilder.css";

import _implicitScopedStylesheets from "./truekinBuilder.scoped.css?scoped=true";

import _buildCasteChooser from "build/casteChooser";
import _buildAttributeChooser from "build/attributeChooser";
import _buildCyberneticChooser from "build/cyberneticChooser";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, t: api_text, h: api_element, c: api_custom_element, s: api_slot} = $api;
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
    attrs: {
      "disabled": $cmp.noBacktrack ? "" : null
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
  }, [api_custom_element("build-caste-chooser", _buildCasteChooser, {
    props: {
      "caste": $cmp.caste
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
  }, [api_custom_element("build-attribute-chooser", _buildAttributeChooser, {
    props: {
      "truekin": true,
      "modifier": $cmp.callingModifiers,
      "attr": $cmp.attributes,
      "pts": $cmp.pointsUsed
    },
    key: 7,
    on: {
      "attributeschosen": _m2 || ($ctx._m2 = api_bind($cmp.handleAttributesChosen))
    }
  }, [])]), api_element("section", {
    classMap: {
      "attributes": true
    },
    key: 8
  }, [api_custom_element("build-cybernetic-chooser", _buildCyberneticChooser, {
    props: {
      "enabled": $cmp.allowedCybernetic,
      "cybs": $cmp.cybernetics
    },
    key: 9,
    on: {
      "mutationselected": _m3 || ($ctx._m3 = api_bind($cmp.handleCyberneticSelection))
    }
  }, [])]), api_element("section", {
    key: 10
  }, [api_slot("", {
    key: 11
  }, [], $slotset)])])]), api_element("button", {
    classMap: {
      "next": true
    },
    attrs: {
      "disabled": $cmp.noAdvance ? "" : null
    },
    key: 12,
    on: {
      "click": _m4 || ($ctx._m4 = api_bind($cmp.advance))
    }
  }, [api_text(">")])])];
}
export default registerTemplate(tmpl);
tmpl.slots = [""];
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-truekinBuilder_truekinBuilder"
