import _implicitStylesheets from "./mutationChooser.css";

import _implicitScopedStylesheets from "./mutationChooser.scoped.css?scoped=true";

import _cSugarInjector from "c/sugarInjector";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, t: api_text, h: api_element, k: api_key, b: api_bind, d: api_dynamic_text, i: api_iterator} = $api;
  const {_m0, _m1, _m2, _m3, _m4, _m5, _m6, _m7, _m8, _m9, _m10, _m11, _m12, _m13, _m14, _m15, _m16, _m17, _m18, _m19} = $ctx;
  return [api_custom_element("c-sugar-injector", _cSugarInjector, {
    key: 0
  }, []), $cmp.selectingVariant ? api_element("div", {
    classMap: {
      "variant-selector": true
    },
    key: 1
  }, [api_element("fieldset", {
    key: 2
  }, [api_element("legend", {
    key: 3
  }, [api_text(":choose variant:")]), api_element("ul", {
    classMap: {
      "insert-variant": true
    },
    key: 4
  }, api_iterator($cmp.variantChoices, function (variant, i) {
    return api_element("li", {
      key: api_key(5, variant)
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "i": i
      },
      key: 6,
      on: {
        "click": _m0 || ($ctx._m0 = api_bind($cmp.variantChosen))
      }
    }, [api_text(api_dynamic_text(variant))])]);
  }))])]) : null, api_element("h2", {
    key: 7
  }, [api_text(":choose mutations:")]), api_element("section", {
    key: 8
  }, [api_element("div", {
    classMap: {
      "mutations": true
    },
    key: 9
  }, [api_element("fieldset", {
    key: 10
  }, [api_element("legend", {
    classMap: {
      "morphotype": true
    },
    key: 11
  }, [api_text("Morphotypes")]), api_element("ul", {
    key: 12
  }, api_iterator($cmp.morphotypes, function (mut) {
    return api_element("div", {
      className: mut.class,
      attrs: {
        "name": mut.name
      },
      key: api_key(13, mut.code),
      on: {
        "mouseenter": _m1 || ($ctx._m1 = api_bind($cmp.mutHover)),
        "click": _m2 || ($ctx._m2 = api_bind($cmp.mutClick))
      }
    }, [api_element("div", {
      key: 14
    }, [api_text("["), api_element("span", {
      classMap: {
        "marker": true
      },
      key: 15
    }, [api_text(api_dynamic_text(mut.marker))]), api_text("]["), api_element("span", {
      classMap: {
        "positive": true
      },
      key: 16
    }, [api_text(api_dynamic_text(mut.cost))]), api_text("] " + api_dynamic_text(mut.displayName))]), api_element("div", {
      classMap: {
        "info-btn": true
      },
      key: 17
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": mut.name
      },
      key: 18,
      on: {
        "click": _m3 || ($ctx._m3 = api_bind($cmp.showInfo))
      }
    }, [api_text("Info")])])]);
  }))]), api_element("fieldset", {
    key: 19
  }, [api_element("legend", {
    classMap: {
      "positive": true
    },
    key: 20
  }, [api_text("Physical Mutations")]), api_element("ul", {
    key: 21
  }, api_iterator($cmp.physicalMutations, function (mut) {
    return api_element("div", {
      className: mut.class,
      attrs: {
        "name": mut.name
      },
      key: api_key(22, mut.code),
      on: {
        "mouseenter": _m4 || ($ctx._m4 = api_bind($cmp.mutHover)),
        "click": _m5 || ($ctx._m5 = api_bind($cmp.mutClick))
      }
    }, [api_element("div", {
      key: 23
    }, [api_text("["), api_element("span", {
      classMap: {
        "marker": true
      },
      key: 24
    }, [api_text(api_dynamic_text(mut.marker))]), api_text("]["), api_element("span", {
      classMap: {
        "positive": true
      },
      key: 25
    }, [api_text(api_dynamic_text(mut.cost))]), api_text("] " + api_dynamic_text(mut.displayName))]), api_element("div", {
      classMap: {
        "multi-btn": true
      },
      key: 26
    }, [mut.variant ? api_element("div", {
      classMap: {
        "variations": true
      },
      key: 27
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": mut.name
      },
      key: 28,
      on: {
        "click": _m6 || ($ctx._m6 = api_bind($cmp.chooseVariant))
      }
    }, [api_text("Variant")])]) : null, api_element("div", {
      classMap: {
        "info-btn": true
      },
      key: 29
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": mut.name
      },
      key: 30,
      on: {
        "click": _m7 || ($ctx._m7 = api_bind($cmp.showInfo))
      }
    }, [api_text("Info")])])])]);
  }))]), api_element("fieldset", {
    key: 31
  }, [api_element("legend", {
    classMap: {
      "negative": true
    },
    key: 32
  }, [api_text("Physical Defects")]), api_element("ul", {
    key: 33
  }, api_iterator($cmp.physicalDefects, function (mut) {
    return api_element("div", {
      className: mut.class,
      attrs: {
        "name": mut.name
      },
      key: api_key(34, mut.code),
      on: {
        "mouseenter": _m8 || ($ctx._m8 = api_bind($cmp.mutHover)),
        "click": _m9 || ($ctx._m9 = api_bind($cmp.mutClick))
      }
    }, [api_element("div", {
      key: 35
    }, [api_text("["), api_element("span", {
      classMap: {
        "marker": true
      },
      key: 36
    }, [api_text(api_dynamic_text(mut.marker))]), api_text("]["), api_element("span", {
      classMap: {
        "negative": true
      },
      key: 37
    }, [api_text(api_dynamic_text(mut.cost))]), api_text("] " + api_dynamic_text(mut.displayName))]), api_element("div", {
      classMap: {
        "info-btn": true
      },
      key: 38
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": mut.name
      },
      key: 39,
      on: {
        "click": _m10 || ($ctx._m10 = api_bind($cmp.showInfo))
      }
    }, [api_text("Info")])])]);
  }))]), api_element("fieldset", {
    key: 40
  }, [api_element("legend", {
    classMap: {
      "positive": true
    },
    key: 41
  }, [api_text("Mental Mutations")]), api_element("ul", {
    key: 42
  }, api_iterator($cmp.mentalMutations, function (mut) {
    return api_element("div", {
      className: mut.class,
      attrs: {
        "name": mut.name
      },
      key: api_key(43, mut.code),
      on: {
        "mouseenter": _m11 || ($ctx._m11 = api_bind($cmp.mutHover)),
        "click": _m12 || ($ctx._m12 = api_bind($cmp.mutClick))
      }
    }, [api_element("div", {
      key: 44
    }, [api_text("["), api_element("span", {
      classMap: {
        "marker": true
      },
      key: 45
    }, [api_text(api_dynamic_text(mut.marker))]), api_text("]["), api_element("span", {
      classMap: {
        "positive": true
      },
      key: 46
    }, [api_text(api_dynamic_text(mut.cost))]), api_text("] " + api_dynamic_text(mut.displayName))]), api_element("div", {
      classMap: {
        "info-btn": true
      },
      key: 47
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": mut.name
      },
      key: 48,
      on: {
        "click": _m13 || ($ctx._m13 = api_bind($cmp.showInfo))
      }
    }, [api_text("Info")])])]);
  }))]), api_element("fieldset", {
    key: 49
  }, [api_element("legend", {
    classMap: {
      "negative": true
    },
    key: 50
  }, [api_text("Mental Defects")]), api_element("ul", {
    key: 51
  }, api_iterator($cmp.mentalDefects, function (mut) {
    return api_element("div", {
      className: mut.class,
      attrs: {
        "name": mut.name
      },
      key: api_key(52, mut.code),
      on: {
        "mouseenter": _m14 || ($ctx._m14 = api_bind($cmp.mutHover)),
        "click": _m15 || ($ctx._m15 = api_bind($cmp.mutClick))
      }
    }, [api_element("div", {
      key: 53
    }, [api_text("["), api_element("span", {
      classMap: {
        "marker": true
      },
      key: 54
    }, [api_text(api_dynamic_text(mut.marker))]), api_text("]["), api_element("span", {
      classMap: {
        "negative": true
      },
      key: 55
    }, [api_text(api_dynamic_text(mut.cost))]), api_text("] " + api_dynamic_text(mut.displayName))]), api_element("div", {
      classMap: {
        "info-btn": true
      },
      key: 56
    }, [api_element("button", {
      classMap: {
        "v-button": true
      },
      attrs: {
        "name": mut.name
      },
      key: 57,
      on: {
        "click": _m16 || ($ctx._m16 = api_bind($cmp.showInfo))
      }
    }, [api_text("Info")])])]);
  }))])]), api_element("hr", {
    key: 58
  }, []), api_element("div", {
    className: $cmp.blurbClass,
    key: 59,
    on: {
      "click": _m17 || ($ctx._m17 = api_bind($cmp.hideBlurb))
    }
  }, [api_element("fieldset", {
    key: 60
  }, [api_element("legend", {
    key: 61
  }, [api_text(api_dynamic_text($cmp.selectedMutation))]), api_element("div", {
    classMap: {
      "blurb-format": true
    },
    key: 62
  }, [$cmp.selectedSrc ? api_element("img", {
    classMap: {
      "mut-img": true
    },
    attrs: {
      "src": $cmp.selectedSrc
    },
    key: 63
  }, []) : null, api_element("div", {
    key: 64
  }, [api_element("p", {
    classMap: {
      "blurbText": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 65
  }, []), api_element("p", {
    classMap: {
      "levelBlurb": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 66
  }, [])])])])])]), api_element("div", {
    classMap: {
      "options": true
    },
    key: 67
  }, [api_element("span", {
    key: 68
  }, [api_text("Points Remaining: " + api_dynamic_text($cmp.points))]), api_element("span", {
    key: 69
  }, [api_element("button", {
    key: 70,
    on: {
      "click": _m18 || ($ctx._m18 = api_bind($cmp.randomizeChanges))
    }
  }, [api_text("Randomize")])]), api_element("span", {
    key: 71
  }, [api_element("button", {
    key: 72,
    on: {
      "click": _m19 || ($ctx._m19 = api_bind($cmp.resetChanges))
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
tmpl.stylesheetToken = "c-mutationChooser_mutationChooser"
