import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../../Components/Header';
import imageComp from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

const FavoriteRecipes = () => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [shared, setShared] = useState(false);

  return (
    <>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drink
      </button>
      {favoriteRecipes && favoriteRecipes.map((favoriteRecipe, index) => (
        <div key={ index }>
          <img
            src={ favoriteRecipe.image }
            alt="comida"
            width={ 250 }
            data-testid={ `${index}-horizontal-image` }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${favoriteRecipe.nationality} - ${favoriteRecipe.category}`}
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {favoriteRecipe.name}
          </p>
          { favoriteRecipe.alcoholicOrNot && (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {favoriteRecipe.alcoholicOrNot}
            </p>)}
          <button
            src={ imageComp }
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => {
              setShared(!shared);
              copy(`http://localhost:3000/foods/${favoriteRecipe.id}`);
            } }
          >
            <img src={ imageComp } alt="sla" />
          </button>
          {shared && <p>Link copied!</p>}
          <button
            src={ blackHeart }
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img src={ blackHeart } alt="sla" />
          </button>
        </div>
      ))}
    </>
  );
};

export default FavoriteRecipes;
