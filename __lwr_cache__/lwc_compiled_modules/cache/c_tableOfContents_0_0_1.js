import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./tableOfContents.html";
class TableOfContents extends LightningElement {
  constructor(...args) {
    super(...args);
    this.pageTitle = void 0;
    this.titleElement = void 0;
    this.containerElement = void 0;
    this.sections = void 0;
    this.isMobile = void 0;
    this.scrolling = false;
    this.lastHighlightedSectionIndex = -1;
    this.newSectionMarginPixels = void 0;
  }
  get topId() {
    return this.sectionNameToId(this.pageTitle);
  }
  connectedCallback() {
    this.titleElement = document.querySelector("h1");
    this.containerElement = this.template.querySelector(".sections");
    let remText = getComputedStyle(document.documentElement).getPropertyValue('--heading-height');
    this.newSectionMarginPixels = this.convertRemToPixels(remText.substring(0, remText.indexOf("rem"))) + 10;
    this.pageTitle = this.titleElement.textContent;
    document.title = this.pageTitle;
    this.gatherPageSections();
    window.addEventListener("scroll", event => this.handleScroll(event));
  }
  gatherPageSections() {
    this.sections = [];
    let allHeadings = document.querySelectorAll("h2,h3");
    for (let heading of allHeadings) {
      let sectionObject = {
        name: heading.textContent,
        id: this.sectionNameToId(heading.textContent),
        class: heading.tagName === "H2" ? "" : "indented",
        element: heading,
        scrollHeight: heading.getBoundingClientRect().y
      };
      this.sections.push(sectionObject);
    }
  }
  sectionNameToId(sectionName) {
    sectionName = "#" + sectionName.toLowerCase();
    return sectionName.replace(" ", "-");
  }
  sectionClicked(event) {
    let sectionName = event.target.textContent;
    let sectionObject;
    for (let section of this.sections) {
      if (section.name !== sectionName) continue;
      sectionObject = section;
      break;
    }
    sectionObject.element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
    history.pushState(undefined, undefined, sectionObject.id);
  }
  scrollToTop(event) {
    this.titleElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
    history.pushState(undefined, undefined, "");
  }
  handleScroll(event) {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.highlightCurrentSection();
        this.ticking = false;
      });
    }
    this.ticking = true;
  }
  highlightCurrentSection() {
    let newHighlightedSectionIndex = -1;
    for (let section of this.sections) {
      let otherSectionSize = section.element.getBoundingClientRect().top;
      if (otherSectionSize > this.newSectionMarginPixels) break;
      newHighlightedSectionIndex++;
    }
    if (newHighlightedSectionIndex === this.lastHighlightedSectionIndex) return;
    let newSection;
    if (this.containerElement === null) {
      this.containerElement = this.template.querySelector(".sections");
    }
    if (newHighlightedSectionIndex !== -1) {
      newSection = this.sections[newHighlightedSectionIndex];
      newSection.class += " selected";

      //this.containerElement.scrollTop = (this.convertRemToPixels(2.25)) * (newHighlightedSectionIndex);
    }

    if (this.lastHighlightedSectionIndex === -1) {
      this.lastHighlightedSectionIndex = newHighlightedSectionIndex;
      return;
    }
    let lastSection = this.sections[this.lastHighlightedSectionIndex];
    lastSection.class = lastSection.class.split(" ")[0];
    this.lastHighlightedSectionIndex = newHighlightedSectionIndex;
  }
  convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }
}
_registerDecorators(TableOfContents, {
  publicProps: {
    isMobile: {
      config: 0
    }
  },
  track: {
    sections: 1
  },
  fields: ["pageTitle", "titleElement", "containerElement", "scrolling", "lastHighlightedSectionIndex", "newSectionMarginPixels"]
});
export default _registerComponent(TableOfContents, {
  tmpl: _tmpl
});