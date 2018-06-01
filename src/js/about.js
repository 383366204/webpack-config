import _ from 'loadsh';
import "./style.css";

function component() {
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console';
    element.innerHTML = _.join(['Hello','about'],' ');
    element.appendChild(br);
    element.appendChild(button);
    element.classList.add('hello');
    return element;
}

document.body.appendChild(component());