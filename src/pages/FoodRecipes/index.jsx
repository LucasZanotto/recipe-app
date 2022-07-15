import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../../context/context';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const FoodRecipes = () => {
  const { recipes } = useContext(Context);
  const maxRecipesLength = 12;

  return (
    <>
      <Header />
      <h1>Food Recipes</h1>
      {
        recipes.length === 1 && <Redirect to={ `/foods/${recipes[0].idMeal}` } />
      }

      {
        recipes.map((recipe, index) => {
          if (index < maxRecipesLength) {
            return (
              <div
                key={ recipe.idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {recipe.strMeal}

                </p>
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  width="100px"
                  data-testid={ `${index}-card-img` }
                />
              </div>
            );
          }
          return null;
        })
      }
      <Footer />
    </>
  );
};

export default FoodRecipes;
