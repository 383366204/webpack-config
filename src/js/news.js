import _ from 'loadsh';
import "./news.css";

function component() {
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console';
    element.innerHTML = _.join(['Hello','new'],' ');
    element.appendChild(br);
    element.appendChild(button);
    element.classList.add('hi');
    return element;
}

document.body.appendChild(component());