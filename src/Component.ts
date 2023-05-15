type IfEquals<OriginalType, ModifiedType, KeyEvaluated, B=never> = 
  (<T>() => T extends OriginalType ? 1 : 2) extends
  (<T>() => T extends ModifiedType ? 1 : 2) ? KeyEvaluated : B;

type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T];

type HTMLElementProps = { 
    [key in keyof HTMLElement]?: unknown
}

export type WritableHTMLElementProps = Pick<HTMLElementProps, WritableKeys<HTMLElementProps>>; 

export class Component {
    private elementType: keyof HTMLElementTagNameMap
    public dataId: string
    public htmlProps?: WritableHTMLElementProps
    
    constructor(elementType: keyof HTMLElementTagNameMap, htmlProps?: WritableHTMLElementProps) {
        this.elementType = elementType
        this.dataId = String(Math.round(Math.random() * 1000)) + String(new Date().getTime())
        if (htmlProps) {
            this.htmlProps = new Proxy(htmlProps, {
                set: (target, property, newValue) => {
                    target[property as keyof WritableHTMLElementProps] = newValue
                    this.rerender()
                    return true
                }
            })
        }
    }

    private assignProperties(element: HTMLElement, htmlProps: WritableHTMLElementProps) {
        for (const key in htmlProps) { 
                (element[key as keyof WritableHTMLElementProps] as unknown) = htmlProps[key as keyof WritableHTMLElementProps]
            }
    }

    private createElement() {
        const element = document.createElement(this.elementType)
        element.dataset.id = String(this.dataId)        
        if(this.htmlProps){
            this.assignProperties(element, this.htmlProps)
        }
        return element
    }

    public getElement() {
        return document.querySelector(`[data-id="${this.dataId}"]`) as HTMLElement
    }

    public render() {
        const element = this.createElement()
        window.document.body.appendChild(element)
    }

    private rerender() {
        const element = this.getElement()
        if (element && this.htmlProps) { 
            this.assignProperties(element, this.htmlProps)
        }
    }

    public unrender() {
        const element = this.getElement()
        window.document.body.removeChild(element)
    }
}
