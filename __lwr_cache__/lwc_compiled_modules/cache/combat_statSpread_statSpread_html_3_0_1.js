import _implicitStylesheets from "./statSpread.css";

import _implicitScopedStylesheets from "./statSpread.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {h: api_element, k: api_key, d: api_dynamic_text, t: api_text, i: api_iterator} = $api;
  return [api_element("div", {
    classMap: {
      "container": true
    },
    key: 0
  }, [api_element("div", {
    classMap: {
      "left": true
    },
    key: 1
  }, [api_element("div", {
    classMap: {
      "top-section": true
    },
    key: 2
  }, [api_element("img", {
    attrs: {
      "src": $cmp.creature.token
    },
    key: 3
  }, []), api_element("div", {
    classMap: {
      "combat-stat-container": true
    },
    key: 4
  }, api_iterator($cmp.stats, function (itValue, itIndex, itFirst, itLast) {
    const it = {
      value: itValue,
      index: itIndex,
      first: itFirst,
      last: itLast
    };
    return api_element("div", {
      className: it.value.class,
      key: api_key(5, it.value.id)
    }, [api_element("span", {
      classMap: {
        "value": true
      },
      key: 6
    }, [api_text(api_dynamic_text(it.value.total))]), api_element("hr", {
      classMap: {
        "stat-hr": true
      },
      key: 7
    }, []), api_element("span", {
      classMap: {
        "name": true
      },
      key: 8
    }, [api_text(api_dynamic_text(it.value.name))])]);
  }))]), api_element("div", {
    classMap: {
      "level-hp-info": true
    },
    key: 9
  }, [api_element("span", {
    key: 10
  }, [api_text("Level " + api_dynamic_text($cmp.creature.level))]), api_element("div", {
    classMap: {
      "dot-divider": true
    },
    key: 11
  }, []), api_element("span", {
    key: 12
  }, [api_element("img", {
    classMap: {
      "inline-icon": true
    },
    attrs: {
      "src": "/1/asset/s/latest/public/assets/images/statImages/hitpoints.png"
    },
    key: 13
  }, []), api_text(api_dynamic_text($cmp.creature.hp))])]), api_element("hr", {
    classMap: {
      "section-hr": true
    },
    key: 14
  }, []), api_element("div", {
    classMap: {
      "resistances": true
    },
    key: 15
  }, [api_element("div", {
    classMap: {
      "attribute-container": true,
      "willpower": true
    },
    key: 16
  }, [api_element("span", {
    classMap: {
      "value": true
    },
    key: 17
  }, [api_text(api_dynamic_text($cmp.creature.resistances.acid))]), api_element("hr", {
    classMap: {
      "stat-hr": true
    },
    key: 18
  }, []), api_element("span", {
    classMap: {
      "name": true
    },
    key: 19
  }, [api_text("acid res")])]), api_element("div", {
    classMap: {
      "attribute-container": true,
      "agility": true
    },
    key: 20
  }, [api_element("span", {
    classMap: {
      "value": true
    },
    key: 21
  }, [api_text(api_dynamic_text($cmp.creature.resistances.electric))]), api_element("hr", {
    classMap: {
      "stat-hr": true
    },
    key: 22
  }, []), api_element("span", {
    classMap: {
      "name": true
    },
    key: 23
  }, [api_text("elec res")])]), api_element("div", {
    classMap: {
      "attribute-container": true,
      "toughness": true
    },
    key: 24
  }, [api_element("span", {
    classMap: {
      "value": true
    },
    key: 25
  }, [api_text(api_dynamic_text($cmp.creature.resistances.heat))]), api_element("hr", {
    classMap: {
      "stat-hr": true
    },
    key: 26
  }, []), api_element("span", {
    classMap: {
      "name": true
    },
    key: 27
  }, [api_text("heat res")])]), api_element("div", {
    classMap: {
      "attribute-container": true,
      "intelligence": true
    },
    key: 28
  }, [api_element("span", {
    classMap: {
      "value": true
    },
    key: 29
  }, [api_text(api_dynamic_text($cmp.creature.resistances.cold))]), api_element("hr", {
    classMap: {
      "stat-hr": true
    },
    key: 30
  }, []), api_element("span", {
    classMap: {
      "name": true
    },
    key: 31
  }, [api_text("cold res")])])])]), api_element("div", {
    classMap: {
      "attributes": true
    },
    key: 32
  }, api_iterator($cmp.attributes, function (itValue, itIndex, itFirst, itLast) {
    const it = {
      value: itValue,
      index: itIndex,
      first: itFirst,
      last: itLast
    };
    return api_element("div", {
      className: it.value.class,
      key: api_key(33, it.value.id)
    }, [api_element("span", {
      classMap: {
        "value": true
      },
      key: 34
    }, [api_text(api_dynamic_text(it.value.total))]), api_element("hr", {
      classMap: {
        "stat-hr": true
      },
      key: 35
    }, []), api_element("span", {
      classMap: {
        "name": true
      },
      key: 36
    }, [api_text(api_dynamic_text(it.value.name))])]);
  }))])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "combat-statSpread_statSpread"
