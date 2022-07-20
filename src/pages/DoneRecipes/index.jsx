import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imageComp from '../../images/shareIcon.svg';
import Header from '../../Components/Header';

const copy = require('clipboard-copy');

const DoneRecipes = () => {
  const [recipes, setRecipes] = useState();
  const [shared, setShared] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(storage);
  }, []);

  // const array = 'onion, beef, chicken';
  // console.log(array.split(','));

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
              console.log(recipe);
              if (recipe.type === 'food') {
                return (
                  <div key={ `recipe-${index}` }>
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

                    {
                      shared && 'Link copied!'
                    }

                    <button
                      data-testid={ `${index}-horizontal-share-btn` }
                      type="button"
                      src={ imageComp }
                      onClick={ () => {
                        setShared(!shared);
                        copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                      } }
                    >
                      <img src={ imageComp } alt="sla" />
                    </button>
                    {
                      recipe.tags && recipe.tags.toString().split(',')
                    && recipe.tags.toString().split(',').slice(0, 2)
                      .map((tagName) => (
                        <p
                          key={ `tag-${index}` }
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
                <div key={ `recipe-${index}` }>
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

                  {
                    shared && 'Link copied!'
                  }

                  <button
                    data-testid={ `${index}-horizontal-share-btn` }
                    type="button"
                    src={ imageComp }
                    onClick={ () => {
                      setShared(!shared);
                      copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                    } }
                  >
                    <img src={ imageComp } alt="sla" />
                  </button>
                </div>
              );
            })}
      </div>

    </>
  );
};

export default DoneRecipes;
