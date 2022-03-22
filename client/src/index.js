import './index.css';
import App from './App';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import promise from "redux-promise";
import rootReducer from './reducers/index';



const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>          
          <App />                            
  </Provider>,
  document.getElementById('root')
);
