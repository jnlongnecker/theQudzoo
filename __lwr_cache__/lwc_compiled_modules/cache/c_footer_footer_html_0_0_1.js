import _implicitStylesheets from "./footer.css";

import _implicitScopedStylesheets from "./footer.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element} = $api;
  return [api_element("footer", {
    key: 0
  }, [api_element("section", {
    key: 1
  }, [api_element("section", {
    key: 2
  }, [api_element("p", {
    key: 3
  }, [api_text("Site Created and Maintained by Jared Longnecker")])]), api_element("section", {
    key: 4
  }, [api_text("Caves of Qud is a Freehold Games copyright")])]), api_element("section", {
    classMap: {
      "links": true
    },
    key: 5
  }, [api_element("h2", {
    key: 6
  }, [api_text("Caves of Qud Links")]), api_element("p", {
    key: 7
  }, [api_element("a", {
    attrs: {
      "href": "https://www.cavesofqud.com/"
    },
    key: 8
  }, [api_text("Official Website")])]), api_element("p", {
    key: 9
  }, [api_element("a", {
    attrs: {
      "href": "https://www.facebook.com/freeholdgames"
    },
    key: 10
  }, [api_text("Facebook")])]), api_element("p", {
    key: 11
  }, [api_element("a", {
    attrs: {
      "href": "https://twitter.com/FreeholdGames"
    },
    key: 12
  }, [api_text("Twitter")])]), api_element("p", {
    key: 13
  }, [api_element("a", {
    attrs: {
      "href": "https://store.steampowered.com/app/333640/Caves_of_Qud/"
    },
    key: 14
  }, [api_text("Steam")])]), api_element("p", {
    key: 15
  }, [api_element("a", {
    attrs: {
      "href": "https://freeholdgames.itch.io/cavesofqud"
    },
    key: 16
  }, [api_text("itch.io")])]), api_element("p", {
    key: 17
  }, [api_element("a", {
    attrs: {
      "href": "https://discord.com/invite/cavesofqud"
    },
    key: 18
  }, [api_text("Discord")])]), api_element("p", {
    key: 19
  }, [api_element("a", {
    attrs: {
      "href": "https://www.reddit.com/r/cavesofqud/"
    },
    key: 20
  }, [api_text("Reddit")])]), api_element("p", {
    key: 21
  }, [api_element("a", {
    attrs: {
      "href": "https://wiki.cavesofqud.com/wiki/Caves_of_Qud_Wiki"
    },
    key: 22
  }, [api_text("Wiki")])]), api_element("p", {
    key: 23
  }, [api_element("a", {
    attrs: {
      "href": "https://www.patreon.com/freeholdgames"
    },
    key: 24
  }, [api_text("Patreon")])])])])];
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
