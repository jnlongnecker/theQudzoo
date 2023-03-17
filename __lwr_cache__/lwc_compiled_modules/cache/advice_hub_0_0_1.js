import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./hub.html";
class Hub extends LightningElement {
  constructor(...args) {
    super(...args);
    this.linkGrid = void 0;
    this.allLinks = [];
    this.mode = void 0;
    this.validModes = ["articles", "quests"];
  }
  connectedCallback() {
    if (!this.validModes.find(elem => elem === this.mode)) {
      this.mode = this.validModes[0];
    }
    fetch("/api/" + this.mode).then(result => {
      result.json().then(payload => {
        this.allLinks = payload[this.mode];
        this.calculateRowContents();
      });
    });
    window.addEventListener("resize", () => {
      this.calculateRowContents();
    });
  }
  calculateRowContents() {
    if (!this.allLinks) return;
    this.linkGrid = [];
    let rowSize;
    if (this.template.firstChild.getBoundingClientRect().width > 1600) {
      rowSize = 5;
    } else if (this.template.firstChild.getBoundingClientRect().width > 1000) {
      rowSize = 3;
    } else if (this.template.firstChild.getBoundingClientRect().width > 850) {
      rowSize = 2;
    } else {
      rowSize = 1;
    }
    let i = 0;
    let currentRow = [];
    while (i < this.allLinks.length) {
      if (i % rowSize === 0 && i !== 0) {
        this.linkGrid.push({
          links: currentRow,
          id: i
        });
        currentRow = [];
      }
      currentRow.push(this.allLinks[i]);
      i++;
    }
    this.linkGrid.push({
      links: currentRow,
      id: this.allLinks.length
    });
  }
}
_registerDecorators(Hub, {
  publicProps: {
    mode: {
      config: 0
    }
  },
  track: {
    linkGrid: 1,
    allLinks: 1
  },
  fields: ["validModes"]
});
export default _registerComponent(Hub, {
  tmpl: _tmpl
});