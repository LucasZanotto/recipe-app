import React from 'react';
import Header from '../../Components/Header';
import imageComp from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

const FavoriteRecipes = () => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return (
    <>
      <Header />
      <h1>Favorite Recipes</h1>
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
      {favoriteRecipes.map((favoriteRecipe, index) => (
        <div key={ index }>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {favoriteRecipe.name}
          </p>
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
          <button
            src={ imageComp }
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ imageComp } alt="sla" />
          </button>
          <button
            src={ blackHeart }
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
<<<<<<< HEAD
            <img src={ blackHeart } alt="white" />
=======
            <img src={ blackHeart } alt="sla" />
>>>>>>> c084463313d0fe673f63bea82d0a75584b7bcd23
          </button>
        </div>
      ))}
    </>
  );
};

export default FavoriteRecipes;
