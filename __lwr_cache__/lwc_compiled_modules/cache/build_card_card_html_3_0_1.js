import _implicitStylesheets from "./card.css";

import _implicitScopedStylesheets from "./card.scoped.css?scoped=true";

import _cSugarInjector from "c/sugarInjector";
import _inputButton from "input/button";
import _cPopup from "c/popup";
import _buildTag from "build/tag";
import _inputIcon from "input/icon";
import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, b: api_bind, d: api_dynamic_text, t: api_text, h: api_element, k: api_key, i: api_iterator} = $api;
  const {_m0, _m1, _m2, _m3, _m4, _m5, _m6, _m7, _m8, _m9} = $ctx;
  return [api_custom_element("c-sugar-injector", _cSugarInjector, {
    key: 0
  }, []), $cmp.buildInfo ? api_custom_element("c-popup", _cPopup, {
    props: {
      "show": $cmp.deleting
    },
    key: 1,
    on: {
      "close": _m0 || ($ctx._m0 = api_bind($cmp.cancelDelete))
    }
  }, [api_element("span", {
    attrs: {
      "slot": "header"
    },
    key: 2
  }, [api_text("Deleting " + api_dynamic_text($cmp.buildName))]), api_element("p", {
    key: 3
  }, [api_element("img", {
    attrs: {
      "src": $cmp.subtypeImg
    },
    key: 4
  }, [])]), api_element("p", {
    key: 5
  }, [api_text("You are about to delete this build. It's going to be gone forever if you do this.")]), api_custom_element("input-button", _inputButton, {
    attrs: {
      "slot": "input"
    },
    props: {
      "size": "thin large",
      "variant": "intelligence"
    },
    key: 6,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.cancelDelete))
    }
  }, [api_text("Cancel")]), api_custom_element("input-button", _inputButton, {
    attrs: {
      "slot": "input"
    },
    props: {
      "size": "thin large",
      "variant": "toughness"
    },
    key: 7,
    on: {
      "click": _m2 || ($ctx._m2 = api_bind($cmp.confirmDelete))
    }
  }, [api_text("Delete")])]) : null, $cmp.buildInfo ? api_element("a", {
    attrs: {
      "href": $cmp.staticLink
    },
    key: 8
  }, [api_element("div", {
    className: $cmp.cardClass,
    key: 9
  }, [api_element("div", {
    classMap: {
      "header": true
    },
    key: 10
  }, [api_element("div", {
    classMap: {
      "top-section": true
    },
    key: 11
  }, [api_element("div", {
    classMap: {
      "tags": true
    },
    key: 12
  }, api_iterator($cmp.combatTags, function (tag) {
    return api_custom_element("build-tag", _buildTag, {
      props: {
        "label": tag,
        "static": "true",
        "activated": "true"
      },
      key: api_key(13, tag)
    }, []);
  })), $cmp.copyable ? api_element("div", {
    classMap: {
      "header-buttons": true
    },
    key: 14
  }, [api_element("button", {
    classMap: {
      "btn": true
    },
    key: 15,
    on: {
      "click": _m3 || ($ctx._m3 = api_bind($cmp.copyCode))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "clipboard",
      "flipvariant": "check",
      "title": "Copy Build Code",
      "padding": "medium",
      "size": "big"
    },
    key: 16
  }, [])]), $cmp.deletable ? api_element("button", {
    classMap: {
      "btn": true
    },
    key: 17,
    on: {
      "click": _m4 || ($ctx._m4 = api_bind($cmp.editBuild))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "edit",
      "title": "Edit Build",
      "padding": "medium",
      "size": "big"
    },
    key: 18
  }, [])]) : null, api_element("button", {
    classMap: {
      "btn": true
    },
    key: 19,
    on: {
      "click": _m5 || ($ctx._m5 = api_bind($cmp.copyShareLink))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "share",
      "flipvariant": "check",
      "title": "Share Build",
      "padding": "medium",
      "size": "big"
    },
    key: 20
  }, [])]), $cmp.copyable ? api_element("button", {
    classMap: {
      "btn": true
    },
    key: 21,
    on: {
      "click": _m6 || ($ctx._m6 = api_bind($cmp.sendToBuilder))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "puzzle",
      "title": "Remix Build",
      "padding": "medium",
      "size": "big"
    },
    key: 22
  }, [])]) : null, $cmp.deletable ? api_element("button", {
    classMap: {
      "btn": true
    },
    key: 23,
    on: {
      "click": _m7 || ($ctx._m7 = api_bind($cmp.promptDelete))
    }
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "delete",
      "title": "Delete Build",
      "padding": "medium",
      "size": "big"
    },
    key: 24
  }, [])]) : null]) : null, api_element("div", {
    classMap: {
      "tags": true
    },
    key: 25
  }, api_iterator($cmp.difficultyTags, function (tag) {
    return api_custom_element("build-tag", _buildTag, {
      props: {
        "label": tag,
        "static": "true",
        "activated": "true"
      },
      key: api_key(26, tag)
    }, []);
  }))]), $cmp.isOutdated ? api_element("div", {
    classMap: {
      "outdated-section": true
    },
    key: 27
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "warning",
      "size": "big"
    },
    key: 28
  }, []), api_element("span", {
    key: 29
  }, [api_text("This build seems to be invalid. It likely won't work in-game.")]), api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "warning",
      "size": "big"
    },
    key: 30
  }, [])]) : null, api_element("h1", {
    key: 31
  }, [api_text(api_dynamic_text($cmp.buildName)), $cmp.hasOwner ? api_element("span", {
    key: 32
  }, [api_text(" by "), api_element("span", {
    classMap: {
      "name": true
    },
    key: 33
  }, [api_text(api_dynamic_text($cmp.displayName))])]) : null])]), api_element("div", {
    classMap: {
      "grid": true
    },
    key: 34
  }, [api_element("div", {
    classMap: {
      "attributes": true
    },
    key: 35
  }, [api_element("fieldset", {
    key: 36
  }, [api_element("legend", {
    key: 37
  }, [api_text("Attributes")]), api_element("ul", {
    key: 38
  }, api_iterator($cmp.attributes, function (attribute) {
    return api_element("li", {
      className: attribute.class,
      key: api_key(39, attribute.class)
    }, [api_element("span", {
      key: 40
    }, [api_text(api_dynamic_text(attribute.name))]), api_element("span", {
      key: 41
    }, [api_text(api_dynamic_text(attribute.value))])]);
  }))])]), api_element("div", {
    classMap: {
      "char-info": true
    },
    key: 42
  }, [api_element("img", {
    attrs: {
      "src": $cmp.subtypeImg
    },
    key: 43
  }, []), api_element("p", {
    key: 44
  }, [api_text(api_dynamic_text($cmp.subtypeName))]), api_element("p", {
    classMap: {
      "char-name": true
    },
    key: 45
  }, [api_text(api_dynamic_text($cmp.characterName))])]), api_element("div", {
    classMap: {
      "mutations": true
    },
    key: 46
  }, [api_element("fieldset", {
    key: 47
  }, [api_element("legend", {
    key: 48
  }, [api_text(api_dynamic_text($cmp.bonus))]), api_element("ul", {
    classMap: {
      "mutation-list": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 49
  }, [])])])]), $cmp.copyable ? api_element("div", {
    classMap: {
      "footer": true
    },
    key: 50,
    on: {
      "click": _m8 || ($ctx._m8 = api_bind($cmp.stopBubble))
    }
  }, [api_element("div", {
    classMap: {
      "footer-item": true,
      "updated": true
    },
    attrs: {
      "title": "Last Updated"
    },
    key: 51
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "refresh",
      "size": "big"
    },
    key: 52
  }, []), api_element("span", {
    key: 53
  }, [api_text(api_dynamic_text($cmp.lastUpdated))])]), api_element("div", {
    classMap: {
      "footer-item": true,
      "likes": true
    },
    attrs: {
      "title": "Likes"
    },
    key: 54
  }, [api_element("span", {
    className: $cmp.likeClass,
    key: 55
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "like",
      "size": "big"
    },
    key: 56,
    on: {
      "click": _m9 || ($ctx._m9 = api_bind($cmp.likeMyBuild))
    }
  }, [])]), api_element("span", {
    key: 57
  }, [api_text(api_dynamic_text($cmp.likes))])]), api_element("div", {
    classMap: {
      "footer-item": true,
      "created": true
    },
    attrs: {
      "title": "Created Date"
    },
    key: 58
  }, [api_custom_element("input-icon", _inputIcon, {
    props: {
      "variant": "save",
      "size": "big"
    },
    key: 59
  }, []), api_element("span", {
    key: 60
  }, [api_text(api_dynamic_text($cmp.created))])])]) : null])]) : null];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "build-card_card"
