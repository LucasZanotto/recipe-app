import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Context from '../../context/context';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import getDrinksFilters from '../../services/api/getDrinksFilters';

const DrinkRecipes = () => {
  const { recipes, getAllRecipes, getFilteredRecipes } = useContext(Context);
  const [filters, setFilters] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const maxRecipesLength = 12;
  const { pathname } = useLocation();

  const getFiltersApi = async () => {
    const { drinks } = await getDrinksFilters();
    const lengthFilters = 5;
    setFilters(drinks.slice(0, lengthFilters));
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
          && <Redirect to={ `/drinks/${recipes[0].idDrink}` } />
      }

      {
        recipes.slice(0, maxRecipesLength).map((recipe, index) => {
          if (recipe.idDrink) {
            return (
              <Link to={ `/drinks/${recipe.idDrink}` }>
                <div
                  key={ recipe.idDrink }
                  data-testid={ `${index}-recipe-card` }
                >
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    {recipe.strDrink}

                  </p>
                  <img
                    src={ recipe.strDrinkThumb }
                    alt={ recipe.strDrink }
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

export default DrinkRecipes;
