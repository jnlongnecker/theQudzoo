import _implicitStylesheets from "./library.css";

import _implicitScopedStylesheets from "./library.scoped.css?scoped=true";

import _inputSearch from "input/search";
import _inputIcon from "input/icon";
import _inputPicklist from "input/picklist";
import _inputSwitch from "input/switch";
import _buildTag from "build/tag";
import _buildCard from "build/card";
import _buildGhostBox from "build/ghostBox";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {d: api_dynamic_text, t: api_text, h: api_element, b: api_bind, c: api_custom_element, k: api_key, i: api_iterator, f: api_flatten} = $api;
  const {_m0, _m1, _m2, _m3, _m4, _m5, _m6} = $ctx;
  return [api_element("div", {
    classMap: {
      "shadow": true
    },
    key: 0
  }, [api_element("section", {
    classMap: {
      "settings": true
    },
    key: 1
  }, [api_element("div", {
    classMap: {
      "filters": true
    },
    key: 2
  }, [api_element("div", {
    classMap: {
      "search": true
    },
    key: 3
  }, [api_element("h2", {
    key: 4
  }, [api_text(api_dynamic_text($cmp.headerText))]), api_custom_element("input-search", _inputSearch, {
    props: {
      "placeholder": "Search by Build Name",
      "value": $cmp.buildNameFilter
    },
    key: 5,
    on: {
      "change": _m0 || ($ctx._m0 = api_bind($cmp.updateName))
    }
  }, [])]), api_element("div", {
    classMap: {
      "option": true
    },
    key: 6
  }, [api_element("a", {
    classMap: {
      "non-mobile-help": true
    },
    attrs: {
      "href": "/build-code"
    },
    key: 7
  }, [api_element("button", {
    classMap: {
      "setting-button": true
    },
    attrs: {
      "tabindex": "-1"
    },
    key: 8
  }, [api_element("p", {
    classMap: {
      "help-text": true
    },
    key: 9
  }, [api_text("How Do I Add A Build Code?")])])]), api_element("button", {
    className: $cmp.filterClass,
    key: 10,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.toggleFilters))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "filter",
      "size": "normal"
    },
    key: 11
  }, [])])])]), !$cmp.hideFilters ? api_element("div", {
    classMap: {
      "sort": true
    },
    key: 12
  }, [api_element("div", {
    classMap: {
      "horizontal-spread": true
    },
    key: 13
  }, [api_element("div", {
    classMap: {
      "option": true
    },
    key: 14
  }, [api_element("label", {
    key: 15
  }, [api_text("Genotype")]), api_custom_element("input-picklist", _inputPicklist, {
    props: {
      "options": "Any,Mutated Human,True Kin",
      "chosen": $cmp.genotypeFilter
    },
    key: 16,
    on: {
      "change": _m2 || ($ctx._m2 = api_bind($cmp.updateGenotype))
    }
  }, [])]), api_element("div", {
    classMap: {
      "option": true
    },
    key: 17
  }, [api_element("label", {
    key: 18
  }, [api_text("Sort Order")]), api_custom_element("input-switch", _inputSwitch, {
    props: {
      "left": "Ascending",
      "right": "Descending",
      "uncheckcolor": "cybernetic",
      "checkcolor": "mutant",
      "checked": $cmp.switchChecked
    },
    key: 19,
    on: {
      "switch": _m3 || ($ctx._m3 = api_bind($cmp.updateOrder))
    }
  }, [])]), api_element("div", {
    classMap: {
      "option": true
    },
    key: 20
  }, [api_element("label", {
    key: 21
  }, [api_text("Sort By")]), api_custom_element("input-picklist", _inputPicklist, {
    props: {
      "options": "Likes,Created Date,Last Updated",
      "chosen": $cmp.sortBy
    },
    key: 22,
    on: {
      "change": _m4 || ($ctx._m4 = api_bind($cmp.updateSort))
    }
  }, [])])]), api_element("div", {
    classMap: {
      "tags": true
    },
    key: 23
  }, api_flatten([api_element("label", {
    key: 24
  }, [api_text("Tags")]), api_iterator($cmp.tags, function (tag) {
    return api_custom_element("build-tag", _buildTag, {
      props: {
        "label": tag
      },
      key: api_key(25, tag),
      on: {
        "click": _m5 || ($ctx._m5 = api_bind($cmp.changeTag))
      }
    }, []);
  })]))]) : null])]), api_element("section", {
    classMap: {
      "container": true
    },
    key: 26
  }, api_flatten([api_element("div", {
    classMap: {
      "mobile-help-button": true
    },
    key: 27
  }, [api_element("a", {
    attrs: {
      "href": "/build-code"
    },
    key: 28
  }, [api_element("button", {
    classMap: {
      "setting-button": true
    },
    attrs: {
      "tabindex": "-1"
    },
    key: 29
  }, [api_element("p", {
    classMap: {
      "help-text": true
    },
    key: 30
  }, [api_text("How Do I Add A Build Code?")])])])]), api_iterator($cmp.builds, function (build) {
    return api_custom_element("build-card", _buildCard, {
      props: {
        "mode": $cmp.mode,
        "build": build,
        "contextid": $cmp.contextUserId
      },
      key: api_key(31, build._id),
      on: {
        "deletedbuild": _m6 || ($ctx._m6 = api_bind($cmp.fetchBuilds))
      }
    }, []);
  }), api_iterator($cmp.ghostBuilds, function (ghost) {
    return $cmp.working ? api_custom_element("build-ghost-box", _buildGhostBox, {
      key: api_key(32, ghost)
    }, []) : null;
  })]))];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-library_library"
