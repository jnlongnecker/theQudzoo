import _implicitStylesheets from "./login.css";

import _implicitScopedStylesheets from "./login.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, t: api_text, h: api_element, d: api_dynamic_text, gid: api_scoped_id} = $api;
  const {_m0, _m1, _m2, _m3, _m4, _m5, _m6, _m7, _m8} = $ctx;
  return [api_element("div", {
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.componentClicked))
    }
  }, [$cmp.authenticated ? api_element("button", {
    classMap: {
      "logout-btn": true
    },
    key: 1,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.logout))
    }
  }, [api_text("Log Out")]) : null, api_element("a", {
    attrs: {
      "href": "/my-profile"
    },
    key: 2
  }, [$cmp.authenticated ? api_element("button", {
    classMap: {
      "login-btn": true
    },
    key: 3
  }, [api_text(api_dynamic_text($cmp.displayName))]) : null]), !$cmp.authenticated ? api_element("button", {
    classMap: {
      "login-btn": true
    },
    key: 4,
    on: {
      "click": _m2 || ($ctx._m2 = api_bind($cmp.loginDesired))
    }
  }, [api_text(api_dynamic_text($cmp.loginButtonText))]) : null, $cmp.showPopup ? api_element("div", {
    classMap: {
      "popup": true
    },
    key: 5
  }, [!$cmp.authenticated ? api_element("div", {
    classMap: {
      "container": true
    },
    key: 6
  }, [$cmp.useLogin ? api_element("form", {
    attrs: {
      "method": "post"
    },
    key: 7,
    on: {
      "submit": _m3 || ($ctx._m3 = api_bind($cmp.login))
    }
  }, [api_element("h2", {
    key: 8
  }, [api_text(api_dynamic_text($cmp.formTitle))]), api_element("div", {
    key: 9
  }, [api_element("label", {
    attrs: {
      "for": api_scoped_id("username")
    },
    key: 10
  }, [api_text("Username")]), api_element("input", {
    attrs: {
      "name": "username",
      "type": "text"
    },
    key: 11
  }, [])]), api_element("div", {
    key: 12
  }, [api_element("label", {
    attrs: {
      "for": api_scoped_id("password")
    },
    key: 13
  }, [api_text("Password")]), api_element("input", {
    attrs: {
      "type": "password",
      "name": "password"
    },
    key: 14
  }, [])]), api_element("div", {
    key: 15
  }, [api_element("button", {
    classMap: {
      "change-form": true
    },
    attrs: {
      "type": "button"
    },
    key: 16,
    on: {
      "click": _m4 || ($ctx._m4 = api_bind($cmp.changeForm))
    }
  }, [api_text("I don't have an account")]), api_element("button", {
    attrs: {
      "type": "submit"
    },
    key: 17
  }, [api_text("Submit")])]), $cmp.isError ? api_element("p", {
    classMap: {
      "error": true
    },
    key: 18
  }, [api_element("span", {
    key: 19
  }, [api_text(api_dynamic_text($cmp.errorMessage))]), api_element("button", {
    classMap: {
      "dismiss-error": true
    },
    key: 20,
    on: {
      "click": _m5 || ($ctx._m5 = api_bind($cmp.dismissError))
    }
  }, [api_text("OK")])]) : null]) : null, !$cmp.useLogin ? api_element("form", {
    attrs: {
      "method": "post"
    },
    key: 21,
    on: {
      "submit": _m6 || ($ctx._m6 = api_bind($cmp.register))
    }
  }, [api_element("h2", {
    key: 22
  }, [api_text(api_dynamic_text($cmp.formTitle))]), api_element("div", {
    key: 23
  }, [api_element("label", {
    attrs: {
      "for": api_scoped_id("username")
    },
    key: 24
  }, [api_text("Username")]), api_element("input", {
    attrs: {
      "name": "username",
      "type": "text"
    },
    key: 25
  }, [])]), api_element("div", {
    key: 26
  }, [api_element("label", {
    attrs: {
      "for": api_scoped_id("password")
    },
    key: 27
  }, [api_text("Password")]), api_element("input", {
    attrs: {
      "type": "password",
      "name": "password"
    },
    key: 28
  }, [])]), api_element("div", {
    key: 29
  }, [api_element("label", {
    attrs: {
      "for": api_scoped_id("password")
    },
    key: 30
  }, [api_text("Confirm Password")]), api_element("input", {
    attrs: {
      "type": "password",
      "name": "passwordConfirm"
    },
    key: 31
  }, [])]), api_element("div", {
    key: 32
  }, [api_element("button", {
    classMap: {
      "change-form": true
    },
    attrs: {
      "type": "button"
    },
    key: 33,
    on: {
      "click": _m7 || ($ctx._m7 = api_bind($cmp.changeForm))
    }
  }, [api_text("I have an account")]), api_element("button", {
    attrs: {
      "type": "submit"
    },
    key: 34
  }, [api_text("Submit")])]), $cmp.isError ? api_element("p", {
    classMap: {
      "error": true
    },
    key: 35
  }, [api_element("span", {
    key: 36
  }, [api_text(api_dynamic_text($cmp.errorMessage))]), api_element("button", {
    classMap: {
      "dismiss-error": true
    },
    key: 37,
    on: {
      "click": _m8 || ($ctx._m8 = api_bind($cmp.dismissError))
    }
  }, [api_text("OK")])]) : null]) : null]) : null]) : null])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-login_login"
