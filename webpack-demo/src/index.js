import printMe from './print.js';
import './styles.css';

// function component() {
//     var element = document.createElement('div');
//     var btn = document.createElement('button');

//     //Lodash, now imported by this script
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    
//     btn.innerHTML = 'Click me and check the console!';
//     btn.onclick = printMe;
//     element.appendChild(btn);

//     return element;
// }
// document.body.appendChild(component());

/*
let element = component();
document.body.appendChild(element);
if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        // printMe();
        document.body.removeChild(element);
        element = component();
        document.body.appendChild(element);
    });
}
*/

// function getComponent() {
//     return import(/* webpackChunkName: 'lodash' */ 'lodash').then(({ default: _ }) => {
//         const element = document.createElement('div');
//         element.innerHTML = _.join(['Helloaaa', 'Webpack'], ' ');
//         return element;
//     }).catch(error => 'An error occurred while loading the component');
// }

async function getComponent() {
    // return import(/* webpackChunkName: 'lodash' */ 'lodash').then(({ default: _ }) => {
    //     const element = document.createElement('div');
    //     element.innerHTML = _.join(['Helloaaa', 'Webpack'], ' ');
    //     return element;
    // }).catch(error => 'An error occurred while loading the component');

    const element = document.createElement('div');
    const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');
    element.innerHTML = _.join(['async await 异步形式的:' + 'Hello', 'Webpack'], ' ');
    return element;
}

getComponent().then(component => {
    console.log('com: 是啥：', component);
    document.body.appendChild(component);
});