// import _ from 'lodash';
// import  './style.css'
// import  './style.scss'
// import logo from './webpack-test.png'


// function component(){
// const element = document.createElement('div');
// const array = ['Hello','webpack', '!!']
// element.innerHTML= _.join(array, ' ')
// return element;
// }
// document.body.appendChild(component());
// document.body.classList.add('haikei')

// const image = new Image()
// image.src = logo
// document.body.appendChild(image)

import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import './style.scss';

// console.log('This is printing logs')

ReactDOM.render(
  <div>Hello, React!</div>,
  document.getElementById('root'),
);
