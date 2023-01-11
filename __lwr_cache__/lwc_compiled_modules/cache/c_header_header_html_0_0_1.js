import _implicitStylesheets from "./header.css";

import _implicitScopedStylesheets from "./header.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element, k: api_key, d: api_dynamic_text, i: api_iterator, b: api_bind} = $api;
  const {_m0} = $ctx;
  return [api_element("header", {
    key: 0
  }, [api_element("div", {
    classMap: {
      "logo": true
    },
    key: 1
  }, [api_element("p", {
    classMap: {
      "site-name": true
    },
    key: 2
  }, [api_element("a", {
    attrs: {
      "href": "/"
    },
    key: 3
  }, [api_text("qudzoo")])])]), $cmp.useDesktopLayout ? api_element("div", {
    classMap: {
      "links": true
    },
    key: 4
  }, api_iterator($cmp.links, function (itValue, itIndex, itFirst, itLast) {
    const it = {
      value: itValue,
      index: itIndex,
      first: itFirst,
      last: itLast
    };
    return [api_element("a", {
      attrs: {
        "href": it.value.link
      },
      key: api_key(5, it.value.link)
    }, [api_text(api_dynamic_text(it.value.label))]), api_element("div", {
      classMap: {
        "dot-divider": true
      },
      key: api_key(6, it.value.link)
    }, []), it.last ? api_element("p", {
      key: api_key(7, it.value.link)
    }, [api_text("More Coming Soon!")]) : null];
  })) : null, $cmp.useMobileLayout ? api_element("button", {
    classMap: {
      "hamburger-menu": true
    },
    key: 8,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.activateHamburgerMenu))
    }
  }, [api_element("div", {
    classMap: {
      "line1": true
    },
    key: 9
  }, []), api_element("div", {
    classMap: {
      "line2": true
    },
    key: 10
  }, []), api_element("div", {
    classMap: {
      "line3": true
    },
    key: 11
  }, [])]) : null, $cmp.useMobileLayout ? api_element("div", {
    classMap: {
      "hamburger-items": true
    },
    key: 12
  }, [api_element("div", {
    classMap: {
      "hamburger-item-container": true
    },
    key: 13
  }, api_iterator($cmp.links, function (itValue, itIndex, itFirst, itLast) {
    const it = {
      value: itValue,
      index: itIndex,
      first: itFirst,
      last: itLast
    };
    return [api_element("li", {
      key: api_key(14, it.value.link)
    }, [api_element("a", {
      attrs: {
        "href": it.value.link
      },
      key: 15
    }, [api_text(api_dynamic_text(it.value.label))])]), api_element("hr", {
      key: api_key(16, it.value.link)
    }, []), it.last ? api_element("li", {
      key: api_key(17, it.value.link)
    }, [api_element("p", {
      key: 18
    }, [api_text("More Coming Soon!")])]) : null];
  }))]) : null])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-header_header"
