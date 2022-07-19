import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HandleRecipeBtn from '../../Components/HandleRecipeBtn';
import Context from '../../context/context';
import getDrinkDetails from '../../services/api/getDrinkDetails';
import getFoodDetails from '../../services/api/getFoodDetails';
import './style.css';

const RecipeDetails = () => {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const { pathname } = useLocation();
  const { getAllRecipes, recipes } = useContext(Context);
  const recommendLength = 6;

  useEffect(() => {
    const arrayDetail = async () => {
      const idIndex = -1;

      if (pathname.includes('foods')) {
        const { meals } = await getFoodDetails(pathname.split('/').at(idIndex));
        setRecipeInfo(meals[0]);
        getAllRecipes('/drinks');
      } else {
        const { drinks } = await getDrinkDetails(pathname.split('/').at(idIndex));
        setRecipeInfo(drinks[0]);
        getAllRecipes('/foods');
      }
    };
    arrayDetail();
  }, [pathname]);

  return (
    <>
      <HandleRecipeBtn />
      <h1>teste recipe</h1>

      {
        pathname.includes('foods') ? (
          <div>
            <img
              data-testid="recipe-photo"
              width="250px"
              src={ recipeInfo.strMealThumb }
              alt={ recipeInfo.strCategory }
            />
            <h1 data-testid="recipe-title">{recipeInfo.strMeal}</h1>
            <p data-testid="recipe-category">{recipeInfo.strCategory}</p>

          </div>
        ) : (
          <div>

            <img
              data-testid="recipe-photo"
              width="250px"
              src={ recipeInfo.strDrinkThumb }
              alt={ recipeInfo.strDrink }
            />
            <h1 data-testid="recipe-title">{recipeInfo.strDrink}</h1>
            <div data-testid="recipe-category">
              <p>{recipeInfo.strCategory}</p>
              <p>{recipeInfo.strAlcoholic}</p>
            </div>
          </div>
        )
      }

      {
        Object.keys(recipeInfo)
          .filter((a) => a.includes('strIngredient')).map((info, index) => (
            <div
              key={ `ingredient-${index}` }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <p>
                { recipeInfo[info]
                && `${recipeInfo[info]} : ${recipeInfo[`strMeasure${index + 1}`]}`}
              </p>
            </div>
          ))
      }

      <p data-testid="instructions">{recipeInfo.strInstructions}</p>

      {
        recipeInfo.strYoutube ? (
          <iframe
            data-testid="video"
            title={ recipeInfo.strYoutube }
            width="420"
            height="315"
            src={ recipeInfo.strYoutube.replace('watch?v=', 'embed/') }
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <iframe
            data-testid="video"
            title={ recipeInfo.strYoutube }
            width="420"
            height="315"
            src={ recipeInfo.strYoutube }
            frameBorder="0"
            allowFullScreen
          />
        )
      }

      <div
        className="carousel-details"
      >
        {
          pathname.includes('foods') ? (
            recipes.slice(0, recommendLength).map((recommend, index) => (
              <div
                key={ `${recommend.strDrink}-${index}` }
                data-testid={ `${index}-recomendation-card` }
              >
                <img width="100px" src={ recommend.strDrinkThumb } alt="recommed" />
                <p data-testid={ `${index}-recomendation-title` }>{recommend.strDrink}</p>
              </div>
            ))
          ) : (
            recipes.slice(0, recommendLength).map((recommend, index) => (
              <div
                key={ `${recommend.strMeal}-${index}` }
                data-testid={ `${index}-recomendation-card` }
              >
                <img width="100px" src={ recommend.strMealThumb } alt="recommed" />
                <p data-testid={ `${index}-recomendation-title` }>{recommend.strMeal}</p>
              </div>
            )))
        }
      </div>

    </>
  );
};

export default RecipeDetails;
