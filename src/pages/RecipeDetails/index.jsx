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
  }, [recipeInfo]);

  const handleFav = () => {
    const favListLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const categoryLs = (Object.keys(recipeInfo).at(0));
    if (!favListLS && Object.keys(recipeInfo).includes(categoryLs)) {
      const firstList = [{ id: recipeInfo[categoryLs] }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(firstList));
    } else if (favListLS && Object.keys(recipeInfo).includes(categoryLs)) {
      const isFav = favListLS
        .some((info) => (info.id) === recipeInfo[categoryLs]);
      if (!isFav) {
        favListLS.push({ id: recipeInfo[categoryLs] });
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
        onClick={ () => {
          setShared(!shared);
          copy(`http://localhost:3000${pathname}`);
        } }
      >
        <img src={ imageComp } alt="sla" />
      </button>
      { (fav) ? (
        <button type="button" onClick={ handleFav }>
          <img src={ blackHeart } alt="black" />
        </button>
      ) : (
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ handleFav }
        >
          <img src={ whiteHeart } alt="white" />
        </button>
      )}
      {
        shared && <p>Link copied!</p>
      }
      {/* [
        {
      "id":"178319",
      "type":"drink",
      "nationality":"",
      "category":"Cocktail",
      "alcoholicOrNot":"Alcoholic",
      "name":"Aquamarine",
      "image":"https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg"
      }
      ] */}

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

      {/* <embed
        data-testid="video"
        width="300px"
        type="video/webm"
        src={ recipeInfo.strYoutube }
      /> */}

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
