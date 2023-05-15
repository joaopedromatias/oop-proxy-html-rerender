# HTML Elements Rerendering

The goal of this repository was to make a reactive HTML rerendering, triggered by changes in the element's properties.

To achieve this, I used the **`JavaScript Proxy`** class within the constructor of the `Component` class, following the principles of `object-oriented programming`. The JavaScript proxy enables the execution of custom code when a property is set, changed, or deleted within a specific object.

The code is written in TypeScript in order to have more OOP functionalities and type safety.

```ts
constructor(elementType: keyof HTMLElementTagNameMap, htmlProps?: WritableHTMLElementProps) {
    // ...
    this.htmlProps = new Proxy(htmlProps, {
        set: (target, property, newValue) => {
            target[property as keyof WritableHTMLElementProps] = newValue
            this.rerender()
            return true
        }
    })
}
```