import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="mainContainer">
      <div className="mainBody">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/carteira" component={ Wallet } />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
