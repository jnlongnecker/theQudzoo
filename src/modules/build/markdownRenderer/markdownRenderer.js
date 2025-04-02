import { LightningElement, api } from "lwc";
import { compileSugar } from "c/api";

export default class MarkdownRenderer extends LightningElement {

    @api singleLine = false;
    converter = new window['showdown'].Converter();
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
        this.markdownHtml = this.converter.makeHtml(value);
        compileSugar(value).then(result => {
            let text = result.compiled;
            if (this.singleLine) {
                this.containerRef.innerHTML = text;
                return;
            }
            text = text.replace(/\n\g/, '<br />');
            this.markdownHtml = this.converter.makeHtml(text);
            this.containerRef.innerHTML = this.markdownHtml;
        });
    }

    renderedCallback() {
        if (!this.containerRef) {
            this.containerRef = this.template.querySelector('div');
        }
    }
}