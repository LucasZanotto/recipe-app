import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HandleRecipeBtn from '../../Components/HandleRecipeBtn';
import Context from '../../context/context';
import getDrinkDetails from '../../services/api/getDrinkDetails';
import './style.css';

const FoodRecipeDetails = () => {
  const [drinkInfo, setDrinkInfo] = useState([]);
  const { pathname } = useLocation();
  const { getAllRecipes, recipes } = useContext(Context);
  const seis = 6;

  useEffect(() => {
    const arrayDetail = async () => {
      const magic = -1;
      const { drinks } = await getDrinkDetails(pathname.split('/').at(magic));
      setDrinkInfo(drinks[0]);
      getAllRecipes('/foods');
    };
    arrayDetail();
  }, []);

  return (
    <>
      <HandleRecipeBtn />
      <h1>teste drink recipe</h1>
      <img
        data-testid="recipe-photo"
        width="250px"
        src={ drinkInfo.strDrinkThumb }
        alt={ drinkInfo.strDrink }
      />
      <h1 data-testid="recipe-title">{drinkInfo.strDrink}</h1>
      <div data-testid="recipe-category">
        <p>{drinkInfo.strCategory}</p>
        <p>{drinkInfo.strAlcoholic}</p>
      </div>
      {
        Object.keys(drinkInfo)
          .filter((a) => a.includes('strIngredient')).map((info, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <p>
                { drinkInfo[info]
                && `${drinkInfo[info]} : ${drinkInfo[`strMeasure${index + 1}`]}`}
              </p>
            </div>
          ))
      }
      <p data-testid="instructions">{drinkInfo.strInstructions}</p>
      <embed
        data-testid="video"
        width="300px"
        type="video/webm"
        src={ drinkInfo.strYoutube }
        alt={ drinkInfo.strDrink }
      />
      <div
        className="carousel-details"
      >
        {
          recipes.slice(0, seis).map((recommend, index) => (
            <div
              key={ `${recommend.strMeal}-${index}` }
              data-testid={ `${index}-recomendation-card` }
            >
              <img width="100px" src={ recommend.strMealThumb } alt="recommed" />
              <p data-testid={ `${index}-recomendation-title` }>{recommend.strMeal}</p>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default FoodRecipeDetails;
