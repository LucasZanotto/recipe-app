import React, { useContext } from 'react';
import Context from '../../context/context';
import Header from '../Header';

const FoodRecipes = () => {
  const { recipes } = useContext(Context);

  return (
    <>
      <Header />
      <h1>Food Recipes</h1>
      {
        recipes.map((recipe) => (
          <div key={ recipe.idMeal }>
            <p>{recipe.strMeal}</p>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              width="100px"
            />
          </div>
        ))
      }
    </>
  );
};

export default FoodRecipes;
