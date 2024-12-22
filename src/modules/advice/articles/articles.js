import { LightningElement, track } from "lwc";

export default class Articles extends LightningElement {

    @track
    itemList = [];

    @track
    containerList = [];

    masterList = [];

    async connectedCallback() {
        let path = window.location.pathname;

        let payload = await (await fetch("/api/articles")).json();
        for (let article of payload.articles) {
            if (article.link === path) {
                article.class += " selected";
                article.defaultOpen = true;
            }

            this.masterList.push(article);
            if (!article.articles) {
                this.itemList.push(article);
                continue;
            }

            this.containerList.push(article);
            for (let subArticle of article.articles) {
                if (subArticle.link === path) {
                    subArticle.class += " selected";
                    article.defaultOpen = true;
                }

                this.masterList.push(subArticle);
            }
        }
    }

    handleClick(event) {
        let articleLabelClicked = event.target.textContent;
        let articleClicked;

        for (let article of this.masterList) {
            if (article.label === articleLabelClicked) {
                articleClicked = article;
                break;
            }
        }

        if (!articleClicked || articleClicked.class.includes("selected")) {
            event.preventDefault();
            return;
        }
    }
}