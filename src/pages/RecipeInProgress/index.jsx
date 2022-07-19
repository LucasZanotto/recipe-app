import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../../context/context';
import getDrinkDetails from '../../services/api/getDrinkDetails';
import getFoodDetails from '../../services/api/getFoodDetails';
import './style.css';

const RecipeInProgress = () => {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const { pathname } = useLocation();
  const { getAllRecipes } = useContext(Context);
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
        getAllRecipes('/drinks');
      } else {
        const { drinks } = await getDrinkDetails(pathname.split('/').at(idIndex));
        setRecipeInfo(drinks[0]);
        getAllRecipes('/foods');
      }
    };
    arrayDetail();
  }, [pathname]);

  const handleCheck = (ingredientAndMeasure) => {
    console.log(storagePrev);

    if (!ingredientsCheck.includes(ingredientAndMeasure)) {
      const body = {
        ...storagePrev,
        [cat]: {
          ...storagePrev[cat],
          [recipeId]: [...ingredientsCheck, ingredientAndMeasure],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(body));
      setIngredientsCheck([...ingredientsCheck, ingredientAndMeasure]);
    }

    if (ingredientsCheck.includes(ingredientAndMeasure)) {
      setIngredientsCheck(ingredientsCheck
        .filter((ingredient) => ingredient !== ingredientAndMeasure));
      const body = {
        ...storagePrev,
        [cat]: {
          ...storagePrev[cat],
          [recipeId]: ingredientsCheck
            .filter((ingredient) => ingredient !== ingredientAndMeasure),
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(body));
    }
  };

  const checkRender = (ingredientAndMeasure) => {
    if (ingredientsCheck.includes(ingredientAndMeasure)) {
      return (<input
        onChange={ () => handleCheck(ingredientAndMeasure) }
        type="checkbox"
        checked
      />
      );
    }

    return (<input
      onChange={ () => handleCheck(ingredientAndMeasure) }
      type="checkbox"
    />
    );
  };

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

  useEffect(() => {
    console.log(ingredientsCheck);
  }, [ingredientsCheck]);

  return (
    <>
      {/* <FinishRecipeBtn /> */}

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

      {
        Object.keys(recipeInfo)
          .filter((a) => a.includes('strIngredient')).map((info, index) => {
            const ingredientRecipe = `${recipeInfo[info]} - `;
            const measureRecipe = `${recipeInfo[`strMeasure${index + 1}`]}`;
            const ingredientAndMeasure = ingredientRecipe + measureRecipe;

            const thisCheck = checkRender(ingredientAndMeasure);
            return (
              <div
                key={ `ingredient-${index}` }
                data-testid={ `${index}-ingredient-step` }
              >
                {thisCheck}
                <p>
                  { recipeInfo[info]
                && `${recipeInfo[info]} - ${recipeInfo[`strMeasure${index + 1}`]}`}
                </p>
              </div>
            );
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

    </>
  );
};

export default RecipeInProgress;
