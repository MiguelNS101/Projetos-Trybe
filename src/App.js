import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div className="mainContainer">
      <div className="mainBody">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/GamePage" component={ GamePage } />
          <Route path="/Settings" component={ Settings } />
          <Route path="/Feedback" component={ Feedback } />
          <Route path="/Ranking" component={ Ranking } />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}
