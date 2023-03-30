import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./richText.html";
class RichText extends LightningElement {
  constructor(...args) {
    super(...args);
    this._text = void 0;
    this.actionStack = [];
    this.textContent = '';
  }
  get text() {
    if (!this._text) this._text = this.template.querySelector('.text');
    return this._text;
  }
  async trackChanges(event) {
    // if (!this.text) {
    //     this.text = event.currentTarget;
    // }
    // if (event.key.length > 1) return;
    // let value = event.key;
    // if (value === 'v' && event.ctrlKey) {
    //     value = await navigator.clipboard.readText();
    // }
    // event.preventDefault();
    // this.textContent += value;
    // this.text.innerHTML = this.textContent;
    // this.actionStack.push(value);
    this.setCursor();
  }
  setCursor() {
    console.log(window.getSelection());
    // let range = document.createRange();
    // let sel = window.getSelection();
    // let numNodes = this.text.childNodes.length;
    // let numChars = this.text.childNodes[numNodes - 1].length;
    // range.setStart(this.text.childNodes[numNodes - 1], numChars);
    // range.collapse(true);
    // sel.removeAllRanges();
    // sel.addRange(range);
    // this.text.focus();
  }

  setBold() {
    this.textContent += `<strong></strong>`;
    this.text.innerHTML = this.textContent;
  }
}
_registerDecorators(RichText, {
  fields: ["_text", "actionStack", "textContent"]
});
export default _registerComponent(RichText, {
  tmpl: _tmpl
});