import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import store from "./redux/store";
import CatViewer from "./components/CatViewer";
import CatSelector from "./components/CatSelector";
import { Route, MemoryRouter } from "react-router-dom";
import Listener from "./redux/listener";
import * as serviceWorker from "./serviceWorker";
import "./app.scss";
import axios from 'axios'
import {RefreshTokenMethod}from './login/Login';
store.subscribe(() => Listener(store));
window.ip = 'https://novon.cc:3001/novtodo/';
window.tknexpire= 600;
const tkn = JSON.parse(localStorage.getItem('usertkn'));
const stkn = JSON.parse(sessionStorage.getItem('usertkn'));
if (tkn) {
  window.demo = false;
  axios.defaults.headers = { 'Authorization': "bearer " + tkn.tkn, 'Content-Type': 'application/json' };
} else if(stkn){
  window.demo = false;
  axios.defaults.headers = { 'Authorization': "bearer " + stkn.stkn, 'Content-Type': 'application/json' };
}else {
  window.demo = true;
  axios.defaults.headers = undefined;
}
ReactDOM.render(
  <Provider store={store}>
    <MemoryRouter>
      <Route path="/" exact component={CatSelector} />
      <Route path="/Cat" exact component={CatViewer} />
    </MemoryRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
