import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import "assets/scss/material-kit-react.scss?v=1.8.0";
import 'antd/dist/antd.css';
import './index.css';
// pages for this product
import HomePage from "views/HomePage/HomePage";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "containers/ProfilePage";
import LoginPage from "views/LoginPage/LoginPage.js";
import ProductsListPage from "views/ProductsListPage/ProductsListPage";
import ProductDetailsPage from "views/ProductDetailsPage/ProductDetailsPage";
import RegisterPage from "views/RegisterPage/RegisterPage";
import OrderHistory from "containers/OrderHistory";
import PayPage from "containers/PayPage";
import OrderSuccess from 'views/PayPage/OrderSuccess';
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
      <Route path="/register" component={RegisterPage} />
      <Route path='/productslist/:category/:sortedBy' component={ProductsListPage}/>
      <Route path='/productdetails/:id' component={ProductDetailsPage}/>
      <Route path='/order' component={OrderHistory}/>
      <Route path='/pay' component={PayPage}/>
      <Route path='/ordersuccess' component={OrderSuccess}/>
      <Route path="/" component={HomePage} />
      
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
