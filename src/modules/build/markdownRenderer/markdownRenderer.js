import { LightningElement, api } from "lwc";

export default class MarkdownRenderer extends LightningElement {

    converter = new window['showdown'].Converter();

    _rawText;

    @api
    get rawText() {
        return this._rawText;
    }

    set rawText(value) {
        if (value.includes('<script')) {
            value = 'Looks like this description tried to inject a script. Not allowed >:('
        }
        this._rawText = value;
        this.markdownHtml = this.converter.makeHtml(value);
        if (this.containerRef) {
            let text = this.markdownHtml;
            text = this.sugarInjector.highlightText(text);
            text = text.replace(/\n/g, "<br />");
            this.containerRef.innerHTML = text;
        }
    }

    markdownHtml;

    containerRef;

    renderedCallback() {
        if (!this.containerRef) {
            this.containerRef = this.template.querySelector('div');
            this.sugarInjector = this.template.querySelector('c-sugar-injector');

            if (this.sugarInjector.infoReady === 4) {
                let text = this.markdownHtml;
                text = this.sugarInjector.highlightText(text);
                text = text.replace(/\n/g, "<br />");
                this.containerRef.innerHTML = text;
            }
            else {
                this.highlightWhenReady();
            }
        }
    }

    async highlightWhenReady() {
        while (this.sugarInjector.infoReady !== 4) {
            await new Promise(r => setTimeout(r, 100));
        }

        let text = this.markdownHtml;
        text = this.sugarInjector.highlightText(text);
        text = text.replace(/\n/g, "<br />");
        this.containerRef.innerHTML = text;
    }
}