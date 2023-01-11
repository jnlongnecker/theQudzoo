import { LightningElement, api } from "lwc";

export default class InspectImage extends LightningElement {

    imageLink;

    activated = false;

    connectedCallback() {
        let contentImages = document.querySelectorAll("img");

        for (let image of contentImages) {
            image.addEventListener("click", (event) => {
                this.imageLink = event.currentTarget.getAttribute("src");
                this.activated = true;
            });
        }
    }

    deactivate() {
        this.imageLink = "";
        this.activated = false;
    }
}