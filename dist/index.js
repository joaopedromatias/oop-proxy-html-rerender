import { Component } from "./Component.js";
import { getText } from "./getText.js";
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
});
const warningMessage = new Component('span', {
    style: 'color: red',
    innerText: 'Please enter a number between 1 and 100'
});
const button = new Component('button', {
    innerText: 'Change text size',
    onclick: () => {
        const words = Number(inputNumber.getElement().value);
        if (words < 1 || words > 100) {
            warningMessage.render();
            setTimeout(() => {
                warningMessage.unrender();
            }, 3000);
            return true;
        }
        p.htmlProps.innerText = getText(words);
    }
});
h2.render();
p.render();
inputNumber.render();
button.render();
