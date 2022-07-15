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
    const { meals } = await getFoodsFilters();
    const lengthFilters = 5;
    setFilters(meals.slice(0, lengthFilters));
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
      {
        filters.map((filter) => (
          <button
            key={ filter.strCategory }
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
              <Link to={ `/foods/${recipe.idMeal}` }>
                <div
                  key={ recipe.idMeal }
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
