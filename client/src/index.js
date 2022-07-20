import  React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from 'react-router-dom';

import promise from "redux-promise";





const root = ReactDOM.createRoot(document.getElementById('root'));

//store.dispatch(fetchMember());

root.render(
  //<React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  //</React.StrictMode>
);


reportWebVitals();