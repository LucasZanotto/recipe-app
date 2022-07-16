import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../../context/context';
import getFoodDetails from '../../services/api/getFoodDetails';

const FoodRecipeDetails = () => {
  const [foodInfo, setFoodInfo] = useState([]);
  const { pathname } = useLocation();
  const { getAllRecipes, recipes } = useContext(Context);
  const seis = 6;

  useEffect(() => {
    const arrayDetail = async () => {
      const magic = -1;
      const { meals } = await getFoodDetails(pathname.split('/').at(magic));
      setFoodInfo(meals[0]);
      getAllRecipes('/drinks');
    };
    arrayDetail();
  }, []);
  console.log(foodInfo);

  return (
    <>
      <h1>teste food recipe</h1>
      <img
        data-testid="recipe-photo"
        width="250px"
        src={ foodInfo.strMealThumb }
        alt={ foodInfo.strCategory }
      />
      <h1 data-testid="recipe-title">{foodInfo.strMeal}</h1>
      <p data-testid="recipe-category">{foodInfo.strCategory}</p>
      {
        Object.keys(foodInfo)
          .filter((a) => a.includes('strIngredient')).map((info, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <p>
                { foodInfo[info]
                && `${foodInfo[info]} : ${foodInfo[`strMeasure${index + 1}`]}`}
              </p>
            </div>
          ))
      }
      <p data-testid="instructions">{foodInfo.strInstructions}</p>
      <embed
        data-testid="video"
        width="300px"
        type="video/webm"
        src={ foodInfo.strYoutube }
      />
      {
        recipes.slice(0, seis).map((recommend, index) => (
          <div key={ recommend.strDrink } data-testid={ `${index}-recomendation-card` }>
            <img width="100px" src={ recommend.strDrinkThumb } alt="recommed" />
            <p>{recommend.strDrink}</p>
          </div>
        ))
      }
    </>
  );
};

export default FoodRecipeDetails;
