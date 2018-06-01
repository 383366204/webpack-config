import './style.css';
import Icon from '../img/ok.png';
import printMe from './print.js';
import { cube } from "./math.js";
import _ from 'loadsh';
function component() {
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console';
    element.innerHTML = _.join(['Hello','Webpack'],' ');
    element.appendChild(br);
    element.appendChild(button);
    element.classList.add('hello');
    button.onclick =e=>import(/* webpackChunkName: "print" */'./print').then(module=>{
        let print = module.default;
        print();
    })
    return element;
}

document.body.appendChild(component());

if(module.hot){
    module.hot.accept('./print.js',function(){
        console.log('Accepting the undated printMe module');
        document.body.removeChild(element);
        element = component(); // 重新渲染页面后，component 更新 click 事件处理
        document.body.appendChild(element);
    })
}