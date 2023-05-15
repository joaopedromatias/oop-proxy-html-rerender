export class Component {
    constructor(elementType, htmlProps) {
        this.elementType = elementType;
        this.dataId = String(Math.round(Math.random() * 1000)) + String(new Date().getTime());
        if (htmlProps) {
            this.htmlProps = new Proxy(htmlProps, {
                set: (target, property, newValue) => {
                    target[property] = newValue;
                    this.rerender();
                    return true;
                }
            });
        }
    }
    createElement() {
        const element = document.createElement(this.elementType);
        element.dataset.id = String(this.dataId);
        if (this.htmlProps) {
            for (const key in this.htmlProps) {
                element[key] = this.htmlProps[key];
            }
        }
        return element;
    }
    getElement() {
        return document.querySelector(`[data-id="${this.dataId}"]`);
    }
    render() {
        const element = this.createElement();
        window.document.body.appendChild(element);
    }
    rerender() {
        const element = this.getElement();
        if (element && this.htmlProps) {
            for (const key in this.htmlProps) {
                element[key] = this.htmlProps[key];
            }
        }
    }
    unrender() {
        const element = this.getElement();
        window.document.body.removeChild(element);
    }
}
