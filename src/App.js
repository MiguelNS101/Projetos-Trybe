import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Products from './Components/Products';
import ProductPage from './Components/ProductPage';
import CartPage from './Components/CartPage';
import Checkout from './Components/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Products } />
        <Route path="/CartPage" exact component={ CartPage } />
        <Route path="/Checkout" exact component={ Checkout } />
        <Route path="/ProductPage/:id" component={ ProductPage } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
