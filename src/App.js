import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import FoodRecipes from './pages/FoodRecipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Provider from './context/provider';
import FoodRecipeDetails from './pages/FoodRecipeDetails';
import DrinkRecipeDetails from './pages/DrinkRecipeDetails';
import DrinkRecipes from './pages/DrinkRecipes';

function App() {
  return (
    <Provider>
      <Switch>

        {/* <div className="meals">
    <span className="logo">TRYBE</span>
    <object
      className="rocksGlass"
      type="image/svg+xml"
      data={ rockGlass }
    >
      Glass
    </object>
  </div> */}

        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ FoodRecipes } />
        <Route exact path="/drinks" component={ DrinkRecipes } />
        <Route exact path="/foods/:id" component={ FoodRecipeDetails } />
        <Route exact path="/drinks/:id" component={ DrinkRecipeDetails } />
        <Route path="/foods/:id/in-progress" component={ FoodRecipeDetails } />
        <Route path="/drinks/:id/in-progress" component={ DrinkRecipeDetails } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;
