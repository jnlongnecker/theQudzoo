import _implicitStylesheets from "./nextArticle.css";

import _implicitScopedStylesheets from "./nextArticle.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {h: api_element, d: api_dynamic_text, t: api_text} = $api;
  return [api_element("section", {
    key: 0
  }, [api_element("div", {
    key: 1
  }, [$cmp.prevArticle ? api_element("a", {
    classMap: {
      "prev": true
    },
    attrs: {
      "href": $cmp.prevArticle.link
    },
    key: 2
  }, [api_element("svg", {
    attrs: {
      "clip-rule": "evenodd",
      "fill-rule": "evenodd",
      "stroke-linejoin": "round",
      "stroke-miterlimit": "2",
      "viewBox": "0 0 24 24",
      "xmlns": "http://www.w3.org/2000/svg"
    },
    key: 3,
    svg: true
  }, [api_element("path", {
    attrs: {
      "d": "m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z",
      "fill-rule": "nonzero"
    },
    key: 4,
    svg: true
  }, [])]), api_text(api_dynamic_text($cmp.prevArticle.label))]) : null]), api_element("div", {
    key: 5
  }, [$cmp.nextArticle ? api_element("a", {
    classMap: {
      "next": true
    },
    attrs: {
      "href": $cmp.nextArticle.link
    },
    key: 6
  }, [api_text(api_dynamic_text($cmp.nextArticle.label)), api_element("svg", {
    attrs: {
      "clip-rule": "evenodd",
      "fill-rule": "evenodd",
      "stroke-linejoin": "round",
      "stroke-miterlimit": "2",
      "viewBox": "0 0 24 24",
      "xmlns": "http://www.w3.org/2000/svg"
    },
    key: 7,
    svg: true
  }, [api_element("path", {
    attrs: {
      "d": "m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z",
      "fill-rule": "nonzero"
    },
    key: 8,
    svg: true
  }, [])])]) : null])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-nextArticle_nextArticle"
