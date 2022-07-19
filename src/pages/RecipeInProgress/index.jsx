import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import getDrinkDetails from '../../services/api/getDrinkDetails';
import getFoodDetails from '../../services/api/getFoodDetails';
import imageComp from '../../images/shareIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import './style.css';
import handleFav from '../../services/handleFav';
import handleCheck from '../../services/handleCheck';
import FinishBtn from '../../Components/FinishBtn';

const copy = require('clipboard-copy');

const RecipeInProgress = () => {
  const [recipeInfo, setRecipeInfo] = useState({});
  const [body, setBody] = useState({});
  const [fav, setFav] = useState(false);
  const [shared, setShared] = useState(false);
  const { pathname } = useLocation();
  const [ingredientsCheck, setIngredientsCheck] = useState([]);
  const [storagePrev, setStoragePrev] = useState();
  const [cat, setCat] = useState();
  const [recipeId, setRecipeId] = useState();

  useEffect(() => {
    const arrayDetail = async () => {
      const idIndex = -2;
      if (pathname.includes('foods')) {
        const { meals } = await getFoodDetails(pathname.split('/').at(idIndex));
        setRecipeInfo(meals[0]);
      } else {
        const { drinks } = await getDrinkDetails(pathname.split('/').at(idIndex));
        setRecipeInfo(drinks[0]);
      }
    };
    arrayDetail();
  }, [pathname]);
  useEffect(() => {
    const favListLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const idIndex = -2;
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
  useEffect(() => {
    if (Object.keys(recipeInfo)[0] === 'idMeal') {
      setCat('meals');
      setRecipeId(recipeInfo.idMeal);
    }
    if (Object.keys(recipeInfo)[0] === 'idDrink') {
      setCat('cocktails');
      setRecipeId(recipeInfo.idDrink);
    }
    const ingredientsLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredientsLS && Object.keys(recipeInfo)[0] === 'idMeal'
      && ingredientsLS.meals[recipeInfo.idMeal]) {
      setIngredientsCheck(ingredientsLS.meals[recipeInfo.idMeal]);
    }
    if (ingredientsLS && Object.keys(recipeInfo)[0] === 'idDrink'
      && ingredientsLS.cocktails[recipeInfo.idDrink]) {
      setIngredientsCheck(ingredientsLS.cocktails[recipeInfo.idDrink]);
    }
    if (!ingredientsLS) {
      const initialLS = { meals: {}, cocktails: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialLS));
      setStoragePrev({ meals: {}, cocktails: {} });
    }
    setStoragePrev(ingredientsLS);
  }, [recipeInfo]);
  const checking = (ingredientAndMeasure) => {
    handleCheck({
      setIngredientsCheck,
      ingredientsCheck,
      ingredientAndMeasure,
      storagePrev,
      cat,
      recipeId });
  };
  const checkRender = (ingredientAndMeasure) => {
    if (ingredientsCheck.includes(ingredientAndMeasure)) {
      return (<input
        onChange={ () => {
          checking(ingredientAndMeasure);
          console.log('teste');
        } }
        type="checkbox"
        defaultChecked
      />
      );
    }
    return (<input
      onChange={ () => checking(ingredientAndMeasure) }
      type="checkbox"
    />
    );
  };

  return (
    <>
      <FinishBtn ingredientsCheck={ ingredientsCheck } recipeInfo={ recipeInfo } />
      <h1>em progresso</h1>
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
          copy(`http://localhost:3000/${pathname.split('/')[1]}/${pathname.split('/')[2]}`);
        } }
      >
        <img src={ imageComp } alt="sla" />
      </button>
      { (fav) ? (
        <button
          data-testid="favorite-btn"
          src={ blackHeart }
          alt="blackheart"
          type="button"
          onClick={ () => {
            handleFav(recipeInfo, body, setFav);
            setFav(false);
          } }
        >
          <img src={ blackHeart } alt="black" />
        </button>
      ) : (
        <button
          data-testid="favorite-btn"
          src={ whiteHeart }
          alt="whiteHeart"
          type="button"
          onClick={ () => {
            handleFav(recipeInfo, body, setFav);
            setFav(true);
          } }
        >
          <img src={ whiteHeart } alt="white" />
        </button>
      )}
      {shared && <p>Link copied!</p>}
      {
        Object.keys(recipeInfo)
          .filter((a) => a.includes('strIngredient')).map((info, index) => {
            const ingredientRecipe = `${recipeInfo[info]} - `;
            const measureRecipe = `${recipeInfo[`strMeasure${index + 1}`]}`;
            const ingredientAndMeasure = ingredientRecipe + measureRecipe;

            if (recipeInfo[info] && recipeInfo[info].length > 1) {
              return (
                <div
                  key={ `ingredient-${index}` }
                  data-testid={ `${index}-ingredient-step` }
                >
                  {() => checkRender(ingredientAndMeasure)}
                  <p>
                    { recipeInfo[info]
                    && `${recipeInfo[info]} - ${recipeInfo[`strMeasure${index + 1}`]}`}
                  </p>
                </div>
              );
            }
            return null;
          })
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
            allowFullScreen
          />
        ) : (
          <iframe
            data-testid="video"
            title={ recipeInfo.strYoutube }
            width="420"
            height="315"
            src={ recipeInfo.strYoutube }
            allowFullScreen
          />
        )
      }
    </>
  );
};
export default RecipeInProgress;
