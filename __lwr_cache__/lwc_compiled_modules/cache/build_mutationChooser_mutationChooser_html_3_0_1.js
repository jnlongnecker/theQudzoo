import _implicitStylesheets from "./mutationChooser.css";

import _implicitScopedStylesheets from "./mutationChooser.scoped.css?scoped=true";

import _cSugarInjector from "c/sugarInjector";
import _cPopup from "c/popup";
import _inputButton from "input/button";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, b: api_bind, t: api_text, h: api_element, k: api_key, d: api_dynamic_text, i: api_iterator} = $api;
  const {_m0, _m1, _m2, _m3, _m4, _m5, _m6, _m7, _m8, _m9, _m10, _m11, _m12, _m13, _m14, _m15, _m16, _m17, _m18, _m19, _m20} = $ctx;
  return [api_custom_element("c-sugar-injector", _cSugarInjector, {
    key: 0
  }, []), api_custom_element("c-popup", _cPopup, {
    props: {
      "show": $cmp.selectingVariant
    },
    key: 1,
    on: {
      "close": _m0 || ($ctx._m0 = api_bind($cmp.cancelChoice))
    }
  }, [api_element("span", {
    attrs: {
      "slot": "header"
    },
    key: 2
  }, [api_text(":choose variant:")]), api_element("ul", {
    classMap: {
      "insert-variant": true
    },
    key: 3
  }, api_iterator($cmp.variantChoices, function (variant, i) {
    return api_element("li", {
      key: api_key(4, variant)
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "i": i
      },
      key: 5,
      on: {
        "click": _m1 || ($ctx._m1 = api_bind($cmp.variantChosen))
      }
    }, [api_text(api_dynamic_text(variant))])]);
  }))]), api_element("h2", {
    key: 6
  }, [api_text(":choose mutations:")]), api_element("section", {
    key: 7
  }, [api_element("div", {
    classMap: {
      "mutations": true
    },
    key: 8
  }, [api_element("fieldset", {
    key: 9
  }, [api_element("legend", {
    classMap: {
      "morphotype": true
    },
    key: 10
  }, [api_text("Morphotypes")]), api_element("ul", {
    key: 11
  }, api_iterator($cmp.morphotypes, function (mut) {
    return api_element("div", {
      className: mut.class,
      attrs: {
        "name": mut.name
      },
      key: api_key(12, mut.code),
      on: {
        "mouseenter": _m2 || ($ctx._m2 = api_bind($cmp.mutHover)),
        "click": _m3 || ($ctx._m3 = api_bind($cmp.mutClick))
      }
    }, [api_element("div", {
      key: 13
    }, [api_text("["), api_element("span", {
      classMap: {
        "marker": true
      },
      key: 14
    }, [api_text(api_dynamic_text(mut.marker))]), api_text("]["), api_element("span", {
      classMap: {
        "positive": true
      },
      key: 15
    }, [api_text(api_dynamic_text(mut.cost))]), api_text("] " + api_dynamic_text(mut.displayName))]), api_element("div", {
      classMap: {
        "info-btn": true
      },
      key: 16
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": mut.name
      },
      key: 17,
      on: {
        "click": _m4 || ($ctx._m4 = api_bind($cmp.showInfo))
      }
    }, [api_text("Info")])])]);
  }))]), api_element("fieldset", {
    key: 18
  }, [api_element("legend", {
    classMap: {
      "positive": true
    },
    key: 19
  }, [api_text("Physical Mutations")]), api_element("ul", {
    key: 20
  }, api_iterator($cmp.physicalMutations, function (mut) {
    return api_element("div", {
      className: mut.class,
      attrs: {
        "name": mut.name
      },
      key: api_key(21, mut.code),
      on: {
        "mouseenter": _m5 || ($ctx._m5 = api_bind($cmp.mutHover)),
        "click": _m6 || ($ctx._m6 = api_bind($cmp.mutClick))
      }
    }, [api_element("div", {
      key: 22
    }, [api_text("["), api_element("span", {
      classMap: {
        "marker": true
      },
      key: 23
    }, [api_text(api_dynamic_text(mut.marker))]), api_text("]["), api_element("span", {
      classMap: {
        "positive": true
      },
      key: 24
    }, [api_text(api_dynamic_text(mut.cost))]), api_text("] " + api_dynamic_text(mut.displayName))]), api_element("div", {
      classMap: {
        "multi-btn": true
      },
      key: 25
    }, [mut.hasVariants ? api_element("div", {
      classMap: {
        "variations": true
      },
      key: 26
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": mut.name
      },
      key: 27,
      on: {
        "click": _m7 || ($ctx._m7 = api_bind($cmp.chooseVariant))
      }
    }, [api_text("Variant")])]) : null, api_element("div", {
      classMap: {
        "info-btn": true
      },
      key: 28
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": mut.name
      },
      key: 29,
      on: {
        "click": _m8 || ($ctx._m8 = api_bind($cmp.showInfo))
      }
    }, [api_text("Info")])])])]);
  }))]), api_element("fieldset", {
    key: 30
  }, [api_element("legend", {
    classMap: {
      "negative": true
    },
    key: 31
  }, [api_text("Physical Defects")]), api_element("ul", {
    key: 32
  }, api_iterator($cmp.physicalDefects, function (mut) {
    return api_element("div", {
      className: mut.class,
      attrs: {
        "name": mut.name
      },
      key: api_key(33, mut.code),
      on: {
        "mouseenter": _m9 || ($ctx._m9 = api_bind($cmp.mutHover)),
        "click": _m10 || ($ctx._m10 = api_bind($cmp.mutClick))
      }
    }, [api_element("div", {
      key: 34
    }, [api_text("["), api_element("span", {
      classMap: {
        "marker": true
      },
      key: 35
    }, [api_text(api_dynamic_text(mut.marker))]), api_text("]["), api_element("span", {
      classMap: {
        "negative": true
      },
      key: 36
    }, [api_text(api_dynamic_text(mut.cost))]), api_text("] " + api_dynamic_text(mut.displayName))]), api_element("div", {
      classMap: {
        "info-btn": true
      },
      key: 37
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": mut.name
      },
      key: 38,
      on: {
        "click": _m11 || ($ctx._m11 = api_bind($cmp.showInfo))
      }
    }, [api_text("Info")])])]);
  }))]), api_element("fieldset", {
    key: 39
  }, [api_element("legend", {
    classMap: {
      "positive": true
    },
    key: 40
  }, [api_text("Mental Mutations")]), api_element("ul", {
    key: 41
  }, api_iterator($cmp.mentalMutations, function (mut) {
    return api_element("div", {
      className: mut.class,
      attrs: {
        "name": mut.name
      },
      key: api_key(42, mut.code),
      on: {
        "mouseenter": _m12 || ($ctx._m12 = api_bind($cmp.mutHover)),
        "click": _m13 || ($ctx._m13 = api_bind($cmp.mutClick))
      }
    }, [api_element("div", {
      key: 43
    }, [api_text("["), api_element("span", {
      classMap: {
        "marker": true
      },
      key: 44
    }, [api_text(api_dynamic_text(mut.marker))]), api_text("]["), api_element("span", {
      classMap: {
        "positive": true
      },
      key: 45
    }, [api_text(api_dynamic_text(mut.cost))]), api_text("] " + api_dynamic_text(mut.displayName))]), api_element("div", {
      classMap: {
        "info-btn": true
      },
      key: 46
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": mut.name
      },
      key: 47,
      on: {
        "click": _m14 || ($ctx._m14 = api_bind($cmp.showInfo))
      }
    }, [api_text("Info")])])]);
  }))]), api_element("fieldset", {
    key: 48
  }, [api_element("legend", {
    classMap: {
      "negative": true
    },
    key: 49
  }, [api_text("Mental Defects")]), api_element("ul", {
    key: 50
  }, api_iterator($cmp.mentalDefects, function (mut) {
    return api_element("div", {
      className: mut.class,
      attrs: {
        "name": mut.name
      },
      key: api_key(51, mut.code),
      on: {
        "mouseenter": _m15 || ($ctx._m15 = api_bind($cmp.mutHover)),
        "click": _m16 || ($ctx._m16 = api_bind($cmp.mutClick))
      }
    }, [api_element("div", {
      key: 52
    }, [api_text("["), api_element("span", {
      classMap: {
        "marker": true
      },
      key: 53
    }, [api_text(api_dynamic_text(mut.marker))]), api_text("]["), api_element("span", {
      classMap: {
        "negative": true
      },
      key: 54
    }, [api_text(api_dynamic_text(mut.cost))]), api_text("] " + api_dynamic_text(mut.displayName))]), api_element("div", {
      classMap: {
        "info-btn": true
      },
      key: 55
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": mut.name
      },
      key: 56,
      on: {
        "click": _m17 || ($ctx._m17 = api_bind($cmp.showInfo))
      }
    }, [api_text("Info")])])]);
  }))])]), api_element("hr", {
    key: 57
  }, []), api_element("div", {
    className: $cmp.blurbClass,
    key: 58,
    on: {
      "click": _m18 || ($ctx._m18 = api_bind($cmp.hideBlurb))
    }
  }, [api_element("fieldset", {
    key: 59
  }, [api_element("legend", {
    key: 60
  }, [api_text(api_dynamic_text($cmp.selectedMutation))]), api_element("div", {
    classMap: {
      "blurb-format": true
    },
    key: 61
  }, [$cmp.selectedSrc ? api_element("img", {
    classMap: {
      "mut-img": true
    },
    attrs: {
      "src": $cmp.selectedSrc
    },
    key: 62
  }, []) : null, api_element("div", {
    key: 63
  }, [api_element("p", {
    classMap: {
      "blurbText": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 64
  }, []), api_element("p", {
    classMap: {
      "levelBlurb": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 65
  }, [])])])])])]), api_element("div", {
    classMap: {
      "options": true
    },
    key: 66
  }, [api_element("span", {
    key: 67
  }, [api_text("Points Remaining: " + api_dynamic_text($cmp.points))]), api_element("span", {
    key: 68
  }, [api_custom_element("input-button", _inputButton, {
    props: {
      "size": "thin",
      "variant": "stat"
    },
    key: 69,
    on: {
      "click": _m19 || ($ctx._m19 = api_bind($cmp.randomizeChanges))
    }
  }, [api_text("Randomize")])]), api_element("span", {
    key: 70
  }, [api_custom_element("input-button", _inputButton, {
    props: {
      "size": "thin",
      "variant": "stat"
    },
    key: 71,
    on: {
      "click": _m20 || ($ctx._m20 = api_bind($cmp.resetChanges))
    }
  }, [api_text("Reset")])])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-mutationChooser_mutationChooser"
