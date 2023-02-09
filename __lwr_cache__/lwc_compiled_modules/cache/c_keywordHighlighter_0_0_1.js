import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./keywordHighlighter.html";
class KeywordHighlighter extends LightningElement {
  constructor() {
    super();
    this.skills = void 0;
    this.attributes = void 0;
    this.stats = void 0;
    this.mutations = void 0;
    this.paragraphs = void 0;
    this.dataReady = 0;
    this.documentReady = false;
    this.display = false;
    fetch("/api/mutations").then(result => result.json().then(data => {
      this.mutations = data;
      this.dataReady++;
      if (this.isReadyToHighlight()) this.highlightAll();
    }));
    fetch("/api/attributes").then(result => result.json().then(data => {
      this.attributes = data;
      this.dataReady++;
      if (this.isReadyToHighlight()) this.highlightAll();
    }));
    fetch("/api/skills").then(result => result.json().then(data => {
      this.skills = data;
      this.dataReady++;
      if (this.isReadyToHighlight()) this.highlightAll();
    }));
    fetch("/api/stats").then(result => result.json().then(data => {
      this.stats = data;
      this.dataReady++;
      if (this.isReadyToHighlight()) this.highlightAll();
    }));
  }
  connectedCallback() {
    this.documentReady = true;
    if (this.isReadyToHighlight()) this.highlightAll();
  }
  isReadyToHighlight() {
    return this.dataReady === 4 && this.documentReady;
  }
  highlightAll() {
    this.dataReady = 0;
    this.documentReady = false;
    let allParagraphs = document.querySelectorAll("p,ul,td");
    console.log(allParagraphs[5]);
    for (let paragraph of allParagraphs) {
      let text = paragraph.innerHTML;
      if (text.indexOf("<img") !== -1) continue;
      text = this.highlightAttributes(text);
      text = this.highlightMutations(text);
      text = this.highlightSkills(text);
      text = this.highlightStats(text);
      paragraph.innerHTML = text;
    }
  }
  highlightSkills(textDocument) {
    for (let category of this.skills.skillCategories) {
      let prefix = `<span class="injected"><span class="skill">`;
      let suffix = `</span></span>`;
      for (let skill of category.skills) {
        const regex = this.buildRegexFromName(skill.name);
        textDocument = textDocument.replace(regex, `${prefix}${skill.name}${suffix}`);
        if (skill.plural) {
          const pluralRegex = this.buildRegexFromName(skill.plural);
          textDocument = textDocument.replace(pluralRegex, `${prefix}${skill.plural}${suffix}`);
        }
      }
      const regex = this.buildRegexFromName(category.name);
      textDocument = textDocument.replace(regex, `${prefix}${category.name}${suffix}`);
      if (category.plural) {
        const pluralRegex = this.buildRegexFromName(category.plural);
        textDocument = textDocument.replace(pluralRegex, `${prefix}${category.plural}${suffix}`);
      }
    }
    return textDocument;
  }
  highlightAttributes(textDocument) {
    let suffix = "</span></span>";
    for (let attribute of this.attributes.attributes) {
      let prefix = `<span class="injected"><span class="attribute ${attribute.name.toLowerCase()}">`;
      const regex = this.buildRegexFromName(attribute.name);
      textDocument = textDocument.replace(regex, `${prefix}${attribute.name}${suffix}`);
    }
    return textDocument;
  }
  highlightStats(textDocument) {
    let suffix = "</span></span>";
    for (let stat of this.stats.stats) {
      let prefix = "";
      if (stat.src) {
        prefix += `<span class="injected"><span><img class="inline-icon" src="${stat.src}" /></span></span>`;
      }
      prefix += `<span class="injected"><span class="stat${stat.name == "PV" ? " pv" : ""}">`;
      const regex = this.buildRegexFromName(stat.name);
      textDocument = textDocument.replace(regex, `${prefix}${stat.name}${suffix}`);
    }
    return textDocument;
  }
  highlightMutations(textDocument) {
    let suffix = "</span></span>";
    for (let mutation of this.mutations.mutations) {
      let prefix = `<span class="injected"><span><img class="inline-icon" src="${mutation.src}" /></span><span class="mutation">`;
      const regex = this.buildRegexFromName(mutation.name);
      textDocument = textDocument.replace(regex, `${prefix}${mutation.name}${suffix}`);
    }
    return textDocument;
  }
  buildRegexFromName(name) {
    name = this.escapeParenthesis(name);
    let words = name.split(" ");
    let alternateWords;
    if (name.indexOf("-") !== -1) {
      alternateWords = name.split("-");
    }
    let prefixes = "(?<!(t|T)hrowing )(?<!(m|M)ental )(?<!(m|M)echanical )(?<!<span[^>]*)(?<!<span.*>)(?<!#.+)(?<![\\w])";
    let regexString = prefixes + "(";
    let alternateRegex = "";
    if (alternateWords) {
      for (let index = 0; index < alternateWords.length; index++) {
        let word = alternateWords[index];
        let stringToAdd = word;
        if (index + 1 < alternateWords.length) {
          stringToAdd += " ";
        }
        alternateRegex += stringToAdd;
      }
    }
    let normalRegex = "";
    for (let index = 0; index < words.length; index++) {
      let word = words[index];
      if (word.replace(/i/gm, "") === "") {
        word = word.toUpperCase();
      }
      let stringToAdd = word;
      if (index + 1 < words.length) {
        stringToAdd += " ";
      }
      normalRegex += stringToAdd;
    }
    if (alternateRegex) {
      regexString += "(" + alternateRegex + ")|";
    }
    regexString += "(" + normalRegex + ")";
    regexString += ")(?![\\w])";
    return new RegExp(regexString, "gm");
  }
  escapeParenthesis(word) {
    let returnString = "";
    for (let char of word) {
      if (char === "(" || char === ")") {
        returnString += "\\";
      }
      returnString += char;
    }
    return returnString;
  }
}
_registerDecorators(KeywordHighlighter, {
  fields: ["skills", "attributes", "stats", "mutations", "paragraphs", "dataReady", "documentReady", "display"]
});
export default _registerComponent(KeywordHighlighter, {
  tmpl: _tmpl
});