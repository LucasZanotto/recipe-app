import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import imageComp from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import './style.css';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [shared, setShared] = useState(false);
  const [filter, setFilter] = useState('');
  useEffect(() => (
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')))
  ), []);
  const removeFavoriteRecipe = (recipeId) => {
    const newFavoriteRecipes = favoriteRecipes.filter(({ id }) => id !== recipeId);
    setFavoriteRecipes(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  return (
    <div className="favorite-container">
      <Header />
      <div className="favorite-filters">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drink
        </button>
      </div>
      <div className="cards-group-container">
        {favoriteRecipes
        && favoriteRecipes.filter((recipe) => recipe.type.includes(filter))
          .map((favoriteRecipe, index) => (
            <div
              className="favorite-card"
              key={ index }
            >
              <div className="image-container">
                <Link to={ `${favoriteRecipe.type}s/${favoriteRecipe.id}` }>
                  <img
                    className="food-image"
                    src={ favoriteRecipe.image }
                    alt="comida"
                    width={ 250 }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
              </div>
              <div className="favorite-context">
                <Link to={ `${favoriteRecipe.type}s/${favoriteRecipe.id}` }>
                  <p
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {favoriteRecipe.name}
                  </p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${favoriteRecipe.nationality} - ${favoriteRecipe.category}`}
                </p>
                { favoriteRecipe.alcoholicOrNot && (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {favoriteRecipe.alcoholicOrNot}
                  </p>)}
                <div className="favorite-btn">

                  <button
                    src={ blackHeart }
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ () => removeFavoriteRecipe(favoriteRecipe.id) }
                  >
                    <img src={ blackHeart } alt="sla" />
                  </button>
                  <button
                    src={ imageComp }
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => {
                      setShared((prevState) => (prevState ? '' : favoriteRecipe.name));
                      copy(`http://localhost:3000/foods/${favoriteRecipe.id}`);
                    } }
                  >
                    <img src={ imageComp } alt="sla" />
                  </button>
                  {shared === favoriteRecipe.name && <p>Link copied!</p>}

                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
