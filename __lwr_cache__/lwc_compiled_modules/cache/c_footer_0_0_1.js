import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./footer.html";
class Footer extends LightningElement {
  constructor(...args) {
    super(...args);
    this.linkGrid = void 0;
    this.allLinks = [{
      label: "Official Website",
      link: "https://www.cavesofqud.com/"
    }, {
      label: "Facebook",
      link: "https://www.facebook.com/freeholdgames"
    }, {
      label: "Twitter",
      link: "https://twitter.com/FreeholdGames"
    }, {
      label: "Steam",
      link: "https://store.steampowered.com/app/333640/Caves_of_Qud/"
    }, {
      label: "itch.io",
      link: "https://freeholdgames.itch.io/cavesofqud"
    }, {
      label: "Discord",
      link: "https://discord.com/invite/cavesofqud"
    }, {
      label: "Reddit",
      link: "https://www.reddit.com/r/cavesofqud/"
    }, {
      label: "Wiki",
      link: "https://wiki.cavesofqud.com/wiki/Caves_of_Qud_Wiki"
    }, {
      label: "Patreon",
      link: "https://www.patreon.com/freeholdgames"
    }];
  }
  get rowOneLinks() {
    let linkList = [];
    let maxItems = window.innerWidth > 900 ? 5 : 2;
    for (let i = 0; i < maxItems && i < this.allLinks.length; i++) {
      linkList.push(this.allLinks[i]);
    }
    return linkList;
  }
  get rowTwoLinks() {
    let linkList = [];
    let maxItems = window.innerWidth > 900 ? 5 : 2;
    for (let i = 0; i < maxItems && i + maxItems < this.allLinks.length; i++) {
      linkList.push(this.allLinks[i + maxItems]);
    }
    return linkList;
  }
  get rowThreeLinks() {
    let linkList = [];
    let maxItems = window.innerWidth > 900 ? 5 : 2;
    for (let i = 0; i < maxItems && i + maxItems * 2 < this.allLinks.length; i++) {
      linkList.push(this.allLinks[i + maxItems * 2]);
    }
    return linkList;
  }
  get rowFourLinks() {
    let linkList = [];
    let maxItems = window.innerWidth > 900 ? 5 : 2;
    for (let i = 0; i < maxItems && i + maxItems * 3 < this.allLinks.length; i++) {
      linkList.push(this.allLinks[i + maxItems * 3]);
    }
    return linkList;
  }
  get rowFiveLinks() {
    let linkList = [];
    let maxItems = window.innerWidth > 900 ? 5 : 2;
    for (let i = 0; i < maxItems && i + maxItems * 4 < this.allLinks.length; i++) {
      linkList.push(this.allLinks[i + maxItems * 4]);
    }
    return linkList;
  }
  connectedCallback() {
    window.addEventListener("resize", () => {
      this.calculateRowContents();
    });
    this.calculateRowContents();
  }
  calculateRowContents() {
    this.linkGrid = [];
    let rowSize;
    if (window.innerWidth > 1300) {
      rowSize = 5;
    } else if (window.innerWidth > 900) {
      rowSize = 3;
    } else {
      rowSize = 2;
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
_registerDecorators(Footer, {
  track: {
    linkGrid: 1,
    allLinks: 1
  }
});
export default _registerComponent(Footer, {
  tmpl: _tmpl
});