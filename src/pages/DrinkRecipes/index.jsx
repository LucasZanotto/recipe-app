import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../../context/context';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const DrinkRecipes = () => {
  const { recipes } = useContext(Context);
  const maxRecipesLength = 12;

  return (
    <>
      <Header />
      <h1>Food Recipes</h1>
      {
        recipes.length === 1 && <Redirect to={ `/drinks/${recipes[0].idDrink}` } />
      }

      {
        recipes.map((recipe, index) => {
          if (index < maxRecipesLength) {
            return (
              <div
                key={ recipe.idDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {recipe.strDrink}

                </p>
                <img
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
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

export default DrinkRecipes;
