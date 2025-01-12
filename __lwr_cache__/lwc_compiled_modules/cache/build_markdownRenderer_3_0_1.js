import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./markdownRenderer.html";
class MarkdownRenderer extends LightningElement {
  constructor(...args) {
    super(...args);
    this.converter = new window['showdown'].Converter();
    this._rawText = void 0;
    this.markdownHtml = void 0;
    this.containerRef = void 0;
  }
  get rawText() {
    return this._rawText;
  }
  set rawText(value) {
    if (value.includes('<script')) {
      value = 'Looks like this description tried to inject a script. Not allowed >:(';
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
  renderedCallback() {
    if (!this.containerRef) {
      this.containerRef = this.template.querySelector('div');
      this.sugarInjector = this.template.querySelector('c-sugar-injector');
      if (this.sugarInjector.infoReady === 4) {
        let text = this.markdownHtml;
        text = this.sugarInjector.highlightText(text);
        text = text.replace(/\n/g, "<br />");
        this.containerRef.innerHTML = text;
      } else {
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
_registerDecorators(MarkdownRenderer, {
  publicProps: {
    rawText: {
      config: 3
    }
  },
  fields: ["converter", "_rawText", "markdownHtml", "containerRef"]
});
export default _registerComponent(MarkdownRenderer, {
  tmpl: _tmpl
});