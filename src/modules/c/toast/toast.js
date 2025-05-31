import { api, LightningElement, createElement } from "lwc";

export default class Toast extends LightningElement {
    static show(config) {
        return new Promise((resolve, reject) => {
            let toast = createElement('c-toast', { is: Toast });
            let prevFirst = document.body.firstChild;
            toast.resolve = resolve;
            toast.reject = reject;
            toast.self = toast;

            for (let property in config) {
                toast[property] = config[property];
            }
            document.body.insertBefore(toast, prevFirst);
        });
    }

    @api resolve;
    @api reject;
    @api self;

    @api label;
    @api message;
    @api mode = 'dismissable';
    @api variant = 'info';
    closeClass = '';

    connectedCallback() {
        if (this.mode === 'dismissable') setTimeout(() => this.close('Timeout'), 5000);
    }

    get containerClass() { return `container ${this.variant} ${this.closeClass}` }

    get icon() {
        switch (this.variant) {
            case 'success': return 'check';
            case 'error': return 'dislike';
            case 'warning': return 'warning';
            default: return 'info';
        }
    }

    close(result, reject) {
        if (reject) {
            this.reject(reject);
        }
        else if (result) {
            this.resolve(result);
        }
        if (this.self) {
            this.closeClass = 'slide-out';
        }
    }

    handleAnimationEnd(event) {
        if (event.animationName === 'slideOut')
            document.body.removeChild(this.self);
    }

    handleClose() {
        this.close('Closed');
    }
}