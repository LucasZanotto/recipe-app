import React from 'react';
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// import getDrinkDetails from '../../services/api/getDrinkDetails';
// import getFoodDetails from '../../services/api/getFoodDetails';

export default function IngredientCheckbox(props) {
  // const [recipesLS, setRecipesLS] = useState({});
  // const [isStarded, setIsStarted] = useState('false');
  const { recipeCheck } = props;

  // const { pathname } = useLocation();

  // const pathnameSplited = pathname.split('/');
  // const category = pathnameSplited[1];
  // const id = pathnameSplited[2];

  // useEffect(() => {
  //   const arrayDetail = async () => {
  //     const idIndex = -1;

  //     if (pathname.includes('foods')) {
  //       const { meals } = await getFoodDetails(pathname.split('/').at(idIndex));
  //       setRecipesLS(meals[0]);
  //     } else {
  //       const { drinks } = await getDrinkDetails(pathname.split('/').at(idIndex));
  //       setRecipesLS(drinks[0]);
  //     }
  //   };
  //   arrayDetail();
  // }, [pathname]);

  // useEffect(() => {
  //   const categoryLs = (Object.keys(recipesLS).at(0));
  //   const inProgressRecipesLS = JSON.parse(localStorage.getItem('inProgressRecipes'));

  //   if (Object.keys(recipesLS).includes('idMeal')
  //     && inProgressRecipesLS
  //     && Object.keys(inProgressRecipesLS).includes('meals')) {
  //     const started = Object.keys(inProgressRecipesLS.meals)
  //       .some((idLs) => idLs === recipesLS[categoryLs]);
  //     setIsStarted(started);
  //   }
  // }, [recipesLS]);

  // const handleCLick = () => {
  //   console.log('clicado');
  //   console.log(isStarded);
  //   //   setIsStarted(true);
  //   //   setRecipesLS({
  //   //     ...recipesLS,
  //   //     [pathname]: { stage: 1 },
  //   //   });

  // //   localStorage.setItem('inProgressRecipes', JSON.stringify({
  // //     ...recipesLS,
  // //     {
  // //       [category] : {
  // //         [id]: { stage: 1 },
  // //       }
  // //     }
  // //   }));
  // };

  return (
    <div>
      <p>teste</p>
      {
        console.log(recipeCheck)
      }

      {/* {
        !isStarded ? (
          <button
            type="button"
            data-testid="continue-recipe-btn"
            onClick={ handleCLick }
          >
            Continue Recipe comp
          </button>
        ) : (
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleCLick }
          >
            Start Recipe comp
          </button>
        )

      } */}

    </div>
  );
}

IngredientCheckbox.propTypes = {
  recipeCheck: PropTypes.string.isRequired,
};
