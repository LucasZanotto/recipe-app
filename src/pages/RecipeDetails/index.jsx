import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HandleRecipeBtn from '../../Components/HandleRecipeBtn';
import Context from '../../context/context';
import getDrinkDetails from '../../services/api/getDrinkDetails';
import getFoodDetails from '../../services/api/getFoodDetails';
import imageComp from '../../images/shareIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import './style.css';

const copy = require('clipboard-copy');

const RecipeDetails = () => {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [body, setBody] = useState({});
  const [shared, setShared] = useState(false);
  const [fav, setFav] = useState(false);
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

  useEffect(() => {
    const favListLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const idIndex = -1;
    if (favListLS && Object.keys(recipeInfo).includes('idMeal')) {
      const isFav = favListLS
        .some((info) => (info.id) === pathname.split('/').at(idIndex));
      setFav(isFav);
    }
    if (favListLS && Object.keys(recipeInfo).includes('idDrink')) {
      const isFav = favListLS
        .some((info) => (info.id) === pathname.split('/').at(idIndex));
      setFav(isFav);
    }

    const categoryLs = (Object.keys(recipeInfo).at(0));

    if (categoryLs === 'idMeal') {
      const foodBody = {
        alcoholicOrNot: '',
        category: recipeInfo.strCategory,
        id: recipeInfo.idMeal,
        image: recipeInfo.strMealThumb,
        name: recipeInfo.strMeal,
        nationality: recipeInfo.strArea,
        type: 'food',
      };
      setBody(foodBody);
    } else {
      const drinkBody = {
        alcoholicOrNot: recipeInfo.strAlcoholic,
        category: recipeInfo.strCategory,
        id: recipeInfo.idDrink,
        image: recipeInfo.strDrinkThumb,
        name: recipeInfo.strDrink,
        nationality: '',
        type: 'drink',
      };
      setBody(drinkBody);
    }
  }, [recipeInfo]);

  console.log(recipeInfo);

  const handleFav = () => {
    const favListLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const categoryLs = (Object.keys(recipeInfo).at(0));

    if ((!favListLS) && Object.keys(recipeInfo).includes(categoryLs)) {
      const firstList = [body];
      localStorage.setItem('favoriteRecipes', JSON.stringify(firstList));
      setFav(true);
    } else if (favListLS && Object.keys(recipeInfo).includes(categoryLs)) {
      const isFav = favListLS
        .some((info) => (info.id) === recipeInfo[categoryLs]);
      if (!isFav) {
        favListLS.push(body);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favListLS));
        setFav(!isFav);
      } else {
        const removeFav = favListLS
          .filter((recipe) => (recipe.id !== recipeInfo[categoryLs]));
        localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
        setFav(!isFav);
      }
    }
  };

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
      <button
        data-testid="share-btn"
        type="button"
        src={ imageComp }
        onClick={ () => {
          setShared(!shared);
          copy(`http://localhost:3000${pathname}`);
        } }
      >
        <img src={ imageComp } alt="sla" />
      </button>

      { (fav) ? (
        <button
          data-testid="favorite-btn"
          src={ blackHeart }
          type="button"
          onClick={ handleFav }
        >
          <img src={ blackHeart } alt="black" />
        </button>
      ) : (
        <button
          data-testid="favorite-btn"
          src={ whiteHeart }
          type="button"
          onClick={ handleFav }
        >
          <img src={ whiteHeart } alt="white" />
        </button>
      )}

      {
        shared && <p>Link copied!</p>
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
