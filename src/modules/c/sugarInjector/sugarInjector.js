import { LightningElement, api } from "lwc";
import { getMutations, getAttributes, getSkills, getStats } from "c/api";

export default class SugarInjector extends LightningElement {
    skills;
    attributes;
    stats;
    mutations;
    paragraphs;

    @api
    infoReady = 0;
    documentReady = false;

    thumbUpSVG = '<svg xmlns="http://www.w3.org/2000/svg" class="thumb inline-icon" viewBox="0 0 24 24"><title>Thumbs Up</title><path d="M19.396 20.708c-.81-.062-.733-.812.031-.953 1.269-.234 1.827-.914 1.827-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.132-.09 1.688-.764 1.688-1.41 0-.565-.425-1.108-1.261-1.22-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.667-.198-4.979-.885.907-3.657.689-8.782-1.687-8.782-1.594 0-1.896 1.807-2.375 3.469-1.718 5.969-5.156 7.062-8.687 7.603v9.928c6.688 0 8.5 3 13.505 3 3.199 0 4.852-1.735 4.852-2.666-.001-.334-.273-.572-.961-.626z"/></svg>'
    thumbDownSVG = '<svg xmlns="http://www.w3.org/2000/svg" class="thumb inline-icon" viewBox="0 0 24 24"><title>Thumbs Down</title><path d="M19.396 3.292c-.811.062-.734.812.031.953 1.268.234 1.826.914 1.826 1.543 0 .529-.396 1.022-1.098 1.181-.837.189-.664.757.031.812 1.133.09 1.688.764 1.688 1.41 0 .565-.424 1.108-1.26 1.22-.857.115-.578.734.031.922.521.16 1.354.5 1.354 1.51 0 .672-.5 1.562-2.271 1.49-1.228-.05-3.666.198-4.979.885.907 3.657.689 8.782-1.687 8.782-1.594 0-1.896-1.807-2.375-3.469-1.718-5.969-5.156-7.062-8.687-7.603v-9.928c6.688 0 8.5-3 13.505-3 3.198 0 4.852 1.735 4.852 2.666-.001.334-.273.572-.961.626z"/></svg>'

    constructor() {
        super();

        getMutations()
            .then(data => {
                this.mutations = data;
                this.infoReady++;
                if (this.isReadyToHighlight()) this.highlightAll();
            });
        getAttributes()
            .then(data => {
                this.attributes = data;
                this.infoReady++;
                if (this.isReadyToHighlight()) this.highlightAll();
            });
        getSkills()
            .then(data => {
                this.skills = data;
                this.infoReady++;
                if (this.isReadyToHighlight()) this.highlightAll();
            });
        getStats()
            .then(data => {
                this.stats = data;
                this.infoReady++;
                if (this.isReadyToHighlight()) this.highlightAll();
            });
    }

    connectedCallback() {
        this.documentReady = true;
        this.injectThumbIcons();
        if (this.isReadyToHighlight()) this.highlightAll();
    }

    @api
    isReadyToHighlight() {
        return this.infoReady === 4 && this.documentReady;
    }

    highlightAll() {
        this.dataReady = 0;
        this.documentReady = false;
        let allParagraphs = document.querySelectorAll("p,li,td");

        for (let paragraph of allParagraphs) {
            let text = paragraph.innerHTML;
            if (text.indexOf("<img") !== -1) continue;

            let newText = this.highlightText(text);
            if (newText != text)
                paragraph.innerHTML = newText;
        }
    }

    @api
    highlightText(text) {
        if (!text) return text;
        text = this.highlightMutations(text);
        text = this.highlightAttributes(text);
        text = this.highlightSkills(text);
        text = this.highlightStats(text);
        return text;
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
            let prefix = `<span class="injected"><span class="attribute ${attribute.name.toLowerCase()}">`
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
                prefix += `<span class="injected"><span><img class="inline-icon" src="${stat.src}" /></span></span>`
            }

            prefix += `<span class="injected"><span class="stat${stat.name == "PV" ? " pv" : ""}">`;
            const regex = this.buildRegexFromName(stat.name);
            textDocument = textDocument.replace(regex, `${prefix}${stat.name}${suffix}`);
        }

        return textDocument;
    }

    // This is awful and needs refactor to get around stupid safari and no negataive lookbehind
    highlightMutations(textDocument) {
        let suffix = "</span></span>";
        for (let mutation of this.mutations.mutations) {
            if (!textDocument.includes(mutation.name)) continue;
            let prefix = `<span class="injected"><span><img class="inline-icon" src="${mutation.src}" /></span><span class="mutation">`;
            let tempSuffix = mutation.cost < 0 ? `</span><code>(<span class="defect">D</span>)</code></span>` : suffix;
            //const regex = this.buildRegexFromName(mutation.name);
            const parts = textDocument.split(mutation.name);
            let newDoc = '';
            for (let i = 0; i < parts.length; i++) {
                let part = parts[i];
                newDoc += part;
                if (i == parts.length - 1) continue;
                if (part.endsWith('<span class="mutation">')) {
                    newDoc += mutation.name;
                }
                else {
                    newDoc += `${prefix}${mutation.name}${tempSuffix}`
                }
            }
            textDocument = newDoc;
            //textDocument = textDocument.replace(regex, `${prefix}${mutation.name}${tempSuffix}`);
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

        let prefixes = "";
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

    injectThumbIcons() {
        let wantedThumbs = document.querySelectorAll(".thumb-up,.thumb-down");

        for (let thumbSpot of wantedThumbs) {
            if (thumbSpot.classList.contains("thumb-up")) {
                thumbSpot.innerHTML = this.thumbUpSVG;
                continue;
            }
            thumbSpot.innerHTML = this.thumbDownSVG;
        }
    }
}
