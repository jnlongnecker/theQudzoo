import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./nextArticle.html";
class NextArticle extends LightningElement {
  constructor(...args) {
    super(...args);
    this.nextArticle = void 0;
    this.prevArticle = void 0;
  }
  connectedCallback() {
    let path = window.location.pathname;
    let getPath = "/api/articles";
    let objectName = "articles";
    if (path.indexOf("quests/") > 0) {
      getPath = "/api/quests";
      objectName = "quests";
    }
    fetch(getPath).then(result => {
      result.json().then(payload => {
        let articleList = payload[objectName];
        for (let index = 0; index < articleList.length; index++) {
          let item = articleList[index];
          console.log(item);
          if (item.link === path) {
            if (index < articleList.length - 1) {
              this.nextArticle = articleList[index + 1];
            }
            if (index > 0) {
              this.prevArticle = articleList[index - 1];
            }
          }
        }
      });
    });
  }
}
_registerDecorators(NextArticle, {
  fields: ["nextArticle", "prevArticle"]
});
export default _registerComponent(NextArticle, {
  tmpl: _tmpl
});