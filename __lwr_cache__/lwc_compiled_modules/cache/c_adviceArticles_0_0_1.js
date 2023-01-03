import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./adviceArticles.html";
class AdviceArticles extends LightningElement {
  constructor(...args) {
    super(...args);
    this.articles = [{
      label: "Breaking Down a Run",
      link: "/advice/breakdown",
      class: "normal"
    }, {
      label: "Mutations",
      link: "/advice/mutations",
      class: "normal"
    }, {
      label: "Tinkering",
      link: "/advice/tinkering",
      class: "normal"
    }];
  }
  connectedCallback() {
    let path = window.location.pathname;
    for (let article of this.articles) {
      if (article.link !== path) continue;
      article.class = "selected";
      break;
    }
  }
  handleClick(event) {
    let articleLabelClicked = event.target.textContent;
    let articleClicked;
    for (let article of this.articles) {
      if (article.label === articleLabelClicked) {
        articleClicked = article;
        break;
      }
    }
    if (!articleClicked || articleClicked.class === "selected") {
      event.preventDefault();
      return;
    }
  }
}
_registerDecorators(AdviceArticles, {
  fields: ["articles"]
});
export default _registerComponent(AdviceArticles, {
  tmpl: _tmpl
});