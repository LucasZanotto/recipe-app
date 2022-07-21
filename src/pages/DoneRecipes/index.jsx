import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import ShareBtn from '../../Components/ShareBtn';

const DoneRecipes = () => {
  const [recipes, setRecipes] = useState();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(storage);
  }, []);

  return (
    <>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter('') }
        >
          All
        </button>

        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setFilter('food') }
        >
          Food
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>

      <div>
        {recipes
          && recipes.filter((recipe) => recipe.type.includes(filter))
            .map((recipe, index) => {
              if (recipe.type === 'food') {
                return (
                  <div key={ `recipe-food-${index}` }>
                    <Link
                      to={ `/${recipe.type}s/${recipe.id}` }
                    >
                      <img
                        data-testid={ `${index}-horizontal-image` }
                        src={ recipe.image }
                        alt={ recipe.name }
                        width="150px"
                      />
                    </Link>

                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { `${recipe.nationality} - ${recipe.category}` }
                    </p>
                    <Link
                      to={ `/${recipe.type}s/${recipe.id}` }
                    >
                      <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                    </Link>
                    <p
                      data-testid={ `${index}-horizontal-done-date` }
                    >
                      {recipe.doneDate}

                    </p>

                    <ShareBtn url={ `/${recipe.type}s/${recipe.id}` } />

                    {
                      recipe.tags && recipe.tags.toString().split(',')
                    && recipe.tags.toString().split(',').slice(0, 2)
                      .map((tagName, tagIndex) => (
                        <p
                          key={ `tag-${index}-${tagIndex}` }
                          data-testid={ `${index}-${tagName}-horizontal-tag` }
                        >
                          {tagName}
                        </p>
                      ))
                    }
                  </div>
                );
              }
              return (
                <div key={ `recipe-drink-${index}` }>
                  <Link
                    to={ `/${recipe.type}s/${recipe.id}` }
                  >
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt={ recipe.name }
                      width="150px"
                    />
                  </Link>

                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { recipe.alcoholicOrNot }
                  </p>
                  <Link
                    to={ `/${recipe.type}s/${recipe.id}` }
                  >
                    <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                  </Link>
                  <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

                  <ShareBtn url={ `/${recipe.type}s/${recipe.id}` } />

                </div>
              );
            })}
      </div>

    </>
  );
};

export default DoneRecipes;
