import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import "assets/scss/material-kit-react.scss?v=1.8.0";
import 'index.css';
// pages for this product
import HomePage from "views/HomePage/HomePage";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ProductsListPage from "views/ProductsListPage/ProductsListPage";
import ProductDetailsPage from "views/ProductDetailsPage/ProductDetailsPage";
var hist = createBrowserHistory();
const redux = require('redux');

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
const store = redux.createStore(
  rootReducer,
  composeEnhancer(redux.applyMiddleware(thunk))
);
store.subscribe(() => console.log(store.getState()));
ReactDOM.render(
  <Provider store={store}>
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path='/productslist/:category' component={ProductsListPage}/>
      <Route path='/productdetails/:id' component={ProductDetailsPage}/>
      <Route path="/" component={HomePage} />
      
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
