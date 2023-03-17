import { LightningElement } from "lwc";

export default class Next extends LightningElement {

    nextArticle;

    prevArticle;

    connectedCallback() {
        let path = window.location.pathname;

        let getPath = "/api/articles";
        let objectName = "articles";

        if (path.indexOf("quests/") > 0) {
            getPath = "/api/quests";
            objectName = "quests"
        }

        fetch(getPath)
            .then(result => {
                result.json()
                    .then(payload => {
                        let articleList = payload[objectName];
                        for (let index = 0; index < articleList.length; index++) {
                            let item = articleList[index];
                            if (item.link === path) {
                                if (index < articleList.length - 1) {
                                    this.nextArticle = articleList[index + 1];
                                }
                                if (index > 0) {
                                    this.prevArticle = articleList[index - 1];
                                }
                            }
                        }
                    })
            });
    }
}