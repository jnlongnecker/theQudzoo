import { LightningElement, api } from "lwc";
import { compileSugar, compileShaders } from "c/api";

export default class MarkdownRenderer extends LightningElement {

    @api singleLine = false;
    @api slowLoad = false;
    @api modes = '';
    static converter;
    markdownHtml;
    containerRef;

    _rawText;

    @api
    get rawText() {
        return this._rawText;
    }

    set rawText(value) {
        if (!value) value = '';
        if (value.includes('<script')) {
            value = 'Looks like this description tried to inject a script. Not allowed >:('
        }
        this._rawText = value;
        if (this.containerRef && !this.slowLoad) {
            this.containerRef.innerHTML = value;
        }

        if (this.singleLine) {
            compileShaders(value).then(result => {
                if (!MarkdownRenderer.converter) {
                    MarkdownRenderer.converter = new window['showdown'].Converter();
                }

                let text = result.compiled;
                this.containerRef.innerHTML = text;
            });
        } else {
            compileSugar(value).then(result => {
                if (!MarkdownRenderer.converter) {
                    MarkdownRenderer.converter = new window['showdown'].Converter();
                }

                let text = result.compiled;
                text = text.replace(/\n\g/, '<br />');
                this.markdownHtml = MarkdownRenderer.converter.makeHtml(text);
                this.containerRef.innerHTML = this.markdownHtml;
            });
        }
    }

    renderedCallback() {
        if (!this.containerRef) {
            this.containerRef = this.template.querySelector('div');
            if (!this.slowLoad) this.containerRef.innerHTML = this._rawText;
        }
        if (window['showdown'] && !MarkdownRenderer.converter) {
            MarkdownRenderer.converter = new window['showdown'].Converter();
        }
    }
}