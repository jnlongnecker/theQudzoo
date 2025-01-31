import { LightningElement, api, track } from "lwc";

export default class TableOfContents extends LightningElement {
    titleElement;
    containerElement;

    @track
    sections;

    @api
    isMobile;

    scrolling = false;
    lastHighlightedSectionIndex = -1;

    newSectionMarginPixels;

    get topId() {
        return this.sectionNameToId(this.pageTitle);
    }

    connectedCallback() {
        this.containerElement = this.template.querySelector(".sections");

        let remText = getComputedStyle(document.documentElement).getPropertyValue('--heading-height');
        this.newSectionMarginPixels = this.convertRemToPixels(remText.substring(0, remText.indexOf("rem"))) + 10;

        this.gatherPageSections();
        window.addEventListener("scroll", (event) => this.handleScroll(event));
    }

    gatherPageSections() {
        this.sections = [];
        let allHeadings = document.querySelectorAll("h2,h3");
        for (let heading of allHeadings) {
            let sectionObject = {
                name: heading.textContent,
                id: `#${heading.id}`,
                class: heading.tagName === "H2" ? "" : "indented",
                element: heading,
                scrollHeight: heading.getBoundingClientRect().y
            }
            this.sections.push(sectionObject);
        }
    }

    sectionClicked(event) {
        let sectionName = event.target.textContent;
        let sectionObject;
        for (let section of this.sections) {
            if (section.name !== sectionName) continue;
            sectionObject = section;
            break;
        }

        sectionObject.element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        history.pushState(undefined, undefined, sectionObject.id);
    }

    scrollToTop(event) {
        this.titleElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
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