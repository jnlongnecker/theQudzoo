import _implicitStylesheets from "./footer.css";

import _implicitScopedStylesheets from "./footer.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element, k: api_key, d: api_dynamic_text, i: api_iterator, f: api_flatten} = $api;
  return [api_element("footer", {
    key: 0
  }, [api_element("section", {
    classMap: {
      "top-section": true
    },
    key: 1
  }, [api_element("section", {
    classMap: {
      "socials": true
    },
    key: 2
  }, [api_element("a", {
    attrs: {
      "href": "https://github.com/jnlongnecker",
      "target": "_blank"
    },
    key: 3
  }, [api_element("svg", {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 24 24"
    },
    key: 4,
    svg: true
  }, [api_element("title", {
    key: 5,
    svg: true
  }, [api_text("GitHub")]), api_element("path", {
    attrs: {
      "d": "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    },
    key: 6,
    svg: true
  }, [])])]), api_element("a", {
    attrs: {
      "href": "https://www.reddit.com/user/A-F-F-I-N-E",
      "target": "_blank"
    },
    key: 7
  }, [api_element("svg", {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 24 24"
    },
    key: 8,
    svg: true
  }, [api_element("title", {
    key: 9,
    svg: true
  }, [api_text("Reddit")]), api_element("path", {
    attrs: {
      "d": "M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.129c0-.851-.695-1.543-1.55-1.543-.417 0-.795.167-1.074.435-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724 2.343.549-.003.034c0 .696.569 1.262 1.268 1.262.699 0 1.267-.566 1.267-1.262s-.568-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592c-.11-.027-.223.037-.257.145l-.965 3.038c-1.656.02-3.155.466-4.258 1.181-.277-.255-.644-.415-1.05-.415-.854.001-1.549.693-1.549 1.544 0 .566.311 1.056.768 1.325-.03.164-.05.331-.05.5 0 2.281 2.805 4.137 6.253 4.137s6.253-1.856 6.253-4.137c0-.16-.017-.317-.044-.472.486-.261.82-.766.82-1.353zm-4.872.141c-.509 0-.922.412-.922.919 0 .506.414.918.922.918s.922-.412.922-.918c0-.507-.413-.919-.922-.919z"
    },
    key: 10,
    svg: true
  }, [])])]), api_element("a", {
    attrs: {
      "href": "https://steamcommunity.com/profiles/76561198041985657/",
      "target": "_blank"
    },
    key: 11
  }, [api_element("svg", {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "24",
      "height": "24",
      "viewBox": "0 0 24 24"
    },
    key: 12,
    svg: true
  }, [api_element("title", {
    key: 13,
    svg: true
  }, [api_text("Steam Profile")]), api_element("path", {
    attrs: {
      "d": "M24 12c0 6.627-5.373 12-12 12-5.782 0-10.608-4.091-11.744-9.537l4.764 2.003c.285 1.441 1.56 2.547 3.115 2.534 1.723-.017 3.105-1.414 3.116-3.129l.007-.003 3.602-2.684c2.304.024 4.14-1.833 4.14-4.091 0-2.26-1.834-4.093-4.093-4.093-2.234 0-4.048 1.791-4.09 4.015l-2.64 3.693c-.668-.014-1.269.169-1.791.51l-6.294-2.646c.708-5.953 5.765-10.572 11.908-10.572 6.627 0 12 5.373 12 12zm-16.577 5.477l-1.544-.649c.38.858 1.236 1.461 2.249 1.457 1.346-.012 2.422-1.11 2.41-2.455-.012-1.329-1.104-2.41-2.432-2.41-.287.001-.57.05-.86.16l1.542.648c.898.378 1.319 1.411.941 2.308-.376.896-1.409 1.318-2.306.941zm7.484-5.602c-1.533 0-2.781-1.249-2.781-2.782 0-1.534 1.248-2.782 2.781-2.782 1.534 0 2.781 1.248 2.781 2.782 0 1.533-1.247 2.782-2.781 2.782zm0-.682c1.159 0 2.1-.942 2.1-2.101 0-1.158-.94-2.102-2.1-2.102s-2.102.943-2.102 2.102c.001 1.159.943 2.101 2.102 2.101z"
    },
    key: 14,
    svg: true
  }, [])])])]), api_element("section", {
    key: 15
  }, [api_element("p", {
    key: 16
  }, [api_text("Qudzoo Site Created and Maintained by Jared Longnecker")]), api_element("p", {
    key: 17
  }, [api_text("Caves of Qud is a Freehold Games copyright")])])]), api_element("section", {
    classMap: {
      "links": true
    },
    key: 18
  }, api_flatten([api_element("h2", {
    key: 19
  }, [api_text("Caves of Qud Links")]), api_iterator($cmp.linkGrid, function (rowLinks) {
    return api_element("div", {
      classMap: {
        "row": true
      },
      key: api_key(20, rowLinks.id)
    }, api_iterator(rowLinks.links, function (link) {
      return api_element("button", {
        key: api_key(21, link.link)
      }, [api_element("a", {
        attrs: {
          "href": link.link
        },
        key: 22
      }, [api_text(api_dynamic_text(link.label))])]);
    }));
  })]))])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-footer_footer"
