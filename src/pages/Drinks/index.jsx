import React, { useContext } from 'react';
import Context from '../../context/context';
import Header from '../Header';

const Drink = () => {
  const { recipes } = useContext(Context);

  return (
    <>
      <Header />
      <h1>Food Recipes</h1>
      {
        console.log(recipes)
      }

      {
        recipes.map((recipe) => (
          <div key={ recipe.idDrink }>
            <p>{recipe.strDrink}</p>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              width="100px"
            />
          </div>
        ))
      }
    </>
  );
};

export default Drink;
