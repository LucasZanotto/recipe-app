import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import FoodRecipes from './pages/FoodRecipes';

function App() {
  return (
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
      <Route path="/foods" component={ FoodRecipes } />
    </Switch>
  );
}

export default App;
