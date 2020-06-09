import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root'
import * as serviceWorker from './serviceWorker';
import Main from './main/Main';
import MainTop from './top/MainTop';

ReactDOM.render(
  <React.StrictMode>

    {/* <MainTop style={{position:'fixed', backgroundColor:'#fff'}}/>
    <Main/> */}
    <Root/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
