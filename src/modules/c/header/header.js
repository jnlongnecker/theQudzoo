import { LightningElement } from "lwc";

export default class Header extends LightningElement {
    links = [
        {
            label: "A-F-F-I-N-E's Advice",
            link: "/advice"
        },
        {
            label: "Build Maker",
            link: "/builds"
        }
    ]

    mobileSized = false;

    get useMobileLayout() {
        return this.mobileSized;
    }

    get useDesktopLayout() {
        return !this.mobileSized;
    }

    connectedCallback() {
        window.addEventListener("resize", () => {
            this.calculateHeaderLayout();
        });
        this.calculateHeaderLayout();
    }

    calculateHeaderLayout() {
        this.mobileSized = window.innerWidth <= 900;
    }

    activateHamburgerMenu(event) {
        let status = event.currentTarget.getAttribute("status");

        if (status === "open") {
            event.currentTarget.setAttribute("status", "closed");
            return;
        }

        event.currentTarget.setAttribute("status", "open");
    }
}