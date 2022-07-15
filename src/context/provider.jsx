import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import getFoods from '../services/api/getFoods';

const Provider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const updateRecipes = async (type, text, category) => {
    if (category === '/foods') {
      const { meals } = await getFoods(type, text, category);
      if (meals) {
        setRecipes(meals);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }

    if (category === '/drinks') {
      const { drinks } = await getFoods(type, text, category);
      if (drinks) {
        setRecipes(drinks);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };

  return (
    <Context.Provider
      value={ {
        recipes,
        updateRecipes,
      } }
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
