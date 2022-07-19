import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';

const DoneRecipes = () => {
  const [recipes, setRecipes] = useState([]);

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
        >
          All
        </button>

        <button
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
      </div>

      <div>
        {
          recipes.map((recipe, index) => {
            if (recipe.type === 'food') {
              return (
                <div key={ `recipe-${index}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                    width="150px"
                  />

                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { recipe.category }
                  </p>
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                  <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
                  <p>{recipe.nacionality}</p>

                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                  >
                    share
                  </button>
                  {
                    recipe.tags && recipe.tags.split(',').slice(0, 2)
                      .map((tagName, tagIndex) => (
                        <p
                          key={ `tag-${tagIndex}` }
                          data-testid={ `${tagIndex}-${tagName}-horizontal-tag` }
                        >
                          {tagName}
                        </p>
                      ))
                  }
                </div>
              );
            }
            return (
              <div key={ `recipe-${index}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  width="150px"
                />

                <p>
                  { recipe.alcoholicOrNot }
                </p>
                <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                >
                  share
                </button>
              </div>
            );
          })
        }
      </div>

    </>
  );
};

export default DoneRecipes;
