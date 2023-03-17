import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./icon.html";
class Icon extends LightningElement {
  constructor(...args) {
    super(...args);
    this.variant = void 0;
    this.flipvariant = void 0;
    this.size = '';
    this.padding = '';
    this.title = void 0;
    this.animationClass = '';
    this.useFlip = false;
    this.paths = {
      cross: "m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z",
      save: "M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z",
      clipboard: "M16 10c3.469 0 2 4 2 4s4-1.594 4 2v6h-10v-12h4zm.827-2h-6.827v16h14v-8.842c0-2.392-4.011-7.158-7.173-7.158zm-8.827 12h-6v-16h4l2.102 2h3.898l2-2h4v2.145c.656.143 1.327.391 2 .754v-4.899h-3c-1.229 0-2.18-1.084-3-2h-8c-.82.916-1.771 2-3 2h-3v20h8v-2zm2-18c.553 0 1 .448 1 1s-.447 1-1 1-1-.448-1-1 .447-1 1-1zm4 18h6v-1h-6v1zm0-2h6v-1h-6v1zm0-2h6v-1h-6v1z",
      check: "M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z",
      delete: "M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z",
      edit: "m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
    };
  }
  get pathToUse() {
    return this.useFlip ? this.paths[this.flipvariant] : this.paths[this.variant];
  }
  get svgClass() {
    return `${this.size} ${this.animationClass}`.trim();
  }
  get containerClass() {
    return `${this.padding}`.trim();
  }
  flip(event) {
    if (!this.flipvariant) return;
    this.animationClass = 'shrink';
    let funcA = ev => {
      if (this.animationClass == 'shrink') {
        this.animationClass = 'grow';
        this.useFlip = true;
        return;
      }
      ev.currentTarget.removeEventListener("animationend", funcA);
      var lastElem = ev.currentTarget;
      setTimeout(() => {
        this.animationClass = 'shrink';
        let funcB = evnt => {
          this.animationClass = 'grow';
          this.useFlip = false;
          evnt.currentTarget.removeEventListener("animationend", funcB);
        };
        let el = lastElem.addEventListener("animationend", funcB);
      }, 1000);
    };
    event.currentTarget.firstChild.addEventListener("animationend", funcA);
  }
}
_registerDecorators(Icon, {
  publicProps: {
    variant: {
      config: 0
    },
    flipvariant: {
      config: 0
    },
    size: {
      config: 0
    },
    padding: {
      config: 0
    },
    title: {
      config: 0
    }
  },
  fields: ["animationClass", "useFlip", "paths"]
});
export default _registerComponent(Icon, {
  tmpl: _tmpl
});