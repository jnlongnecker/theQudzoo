import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./adviceArticles.html";
class AdviceArticles extends LightningElement {
  constructor(...args) {
    super(...args);
    this.itemList = [];
    this.articles = [];
    this.quests = [];
  }
  connectedCallback() {
    let path = window.location.pathname;
    fetch("/api/articles").then(result => {
      result.json().then(payload => {
        this.articles = payload.articles;
        for (let article of this.articles) {
          if (article.link !== path) continue;
          article.class = "selected";
          break;
        }
        this.fetchQuests(path);
      });
    });
  }
  fetchQuests(path) {
    fetch("/api/quests").then(result => {
      result.json().then(payload => {
        this.quests = payload.quests;
        for (let quest of this.quests) {
          if (quest.link === path) quest.class = "selected indented";else quest.class = "indented";
        }
        this.buildItemList();
      });
    });
  }
  handleClick(event) {
    let articleLabelClicked = event.target.textContent;
    let articleClicked;
    for (let article of this.itemList) {
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
  buildItemList() {
    this.itemList = [];
    for (let article of this.articles) {
      this.itemList.push(article);
      if (article.link.indexOf("quest") != -1) {
        for (let quest of this.quests) {
          this.itemList.push(quest);
        }
      }
    }
  }
}
_registerDecorators(AdviceArticles, {
  track: {
    itemList: 1
  },
  fields: ["articles", "quests"]
});
export default _registerComponent(AdviceArticles, {
  tmpl: _tmpl
});