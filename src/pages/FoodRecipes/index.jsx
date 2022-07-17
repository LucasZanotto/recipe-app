import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Context from '../../context/context';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import getFoodsFilters from '../../services/api/getFoodsFilters';

const FoodRecipes = () => {
  const { recipes, getAllRecipes, getFilteredRecipes } = useContext(Context);
  const [filters, setFilters] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const maxRecipesLength = 12;
  const { pathname } = useLocation();

  const getFiltersApi = async () => {
    const meals = await getFoodsFilters();
    setFilters(meals);
  };

  useEffect(() => {
    getAllRecipes(pathname);
    getFiltersApi();
  }, []);

  return (
    <>
      <Header />
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => {
          getAllRecipes(pathname);
          setIsFiltered(false);
          setActiveFilter('');
        } }
      >
        All
      </button>
      <div data-testid="btn-test">
        {
          filters.map((filter, index) => (
            <button
              key={ `${filter.strCategory}${index}` }
              type="button"
              onClick={ () => {
                if (activeFilter.includes(filter.strCategory)) {
                  getAllRecipes(pathname);
                  setActiveFilter('');
                  setIsFiltered(false);
                } else {
                  getFilteredRecipes(pathname, filter.strCategory);
                  setIsFiltered(true);
                  setActiveFilter(filter.strCategory);
                }
              } }
              data-testid={ `${filter.strCategory}-category-filter` }
            >
              {filter.strCategory}
            </button>
          ))
        }
      </div>

      <h1>Food Recipes</h1>
      {
        (recipes.length === 1
          && isFiltered === false)
          && <Redirect to={ `/foods/${recipes[0].idMeal}` } />
      }

      {
        recipes.slice(0, maxRecipesLength).map((recipe, index) => {
          if (recipe.idMeal) {
            return (
              <Link
                key={ recipe.idMeal }
                to={ `/foods/${recipe.idMeal}` }
                data-testid="recipe-card"
              >
                <div
                  data-testid={ `${index}-recipe-card` }
                >
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    {recipe.strMeal}

                  </p>
                  <img
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                    width="100px"
                    data-testid={ `${index}-card-img` }
                  />
                </div>
              </Link>
            );
          }
          return null;
        })
      }
      <Footer />
    </>
  );
};

export default FoodRecipes;
