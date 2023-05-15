import { Component } from "./Component.js";
import { getText } from "./getText.js";
import type { WritableHTMLElementProps } from 'Component.js'

const h2 = new Component('h1', {
    innerText: 'Proxy html text changer',
});

const p = new Component('p', {
    innerText: getText(100) 
});

const inputNumber = new Component('input', {
    type: 'number',
    min: 1,
    max: 100
} as WritableHTMLElementProps);

const warningMessage = new Component('span', {
    style: 'color: red; margin-left: 10px;',
    innerText: 'Please enter a number between 1 and 100'
} as WritableHTMLElementProps);

const button = new Component('button', {
    innerText: 'Change text size',
    onclick: () => { 
        const words = Number((inputNumber.getElement() as HTMLInputElement).value)
        if (words < 1 || words > 100 || isNaN(words)) {
            warningMessage.render()
            setTimeout(() => { 
                warningMessage.unrender()
            }, 3000)
            return true
        }
        p.htmlProps!.innerText = getText(words)
    }
});

h2.render();
p.render();
inputNumber.render()
button.render();