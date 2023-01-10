import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import FoodProgress from './pages/FoodProgress';
import DrinkProgress from './pages/DrinkProgress';
import Explore from './pages/Explore';
import FoodExplore from './pages/FoodExplore';
import DrinkExplore from './pages/DrinkExplore';
import FoodExploreIngredients from './pages/FoodExploreIngredients';
import DrinkExploreIngredients from './pages/DrinkExploreIngredients';
import FoodExploreNationalitie from './pages/FoodExploreNationalitie';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ FoodDetails } />
        <Route exact path="/drinks/:id" component={ DrinkDetails } />
        <Route
          exact
          path="/foods/:id/in-progress"
          component={ FoodProgress }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ DrinkProgress }
        />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ FoodExplore } />
        <Route exact path="/explore/drinks" component={ DrinkExplore } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ FoodExploreIngredients }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ DrinkExploreIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodExploreNationalitie }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
