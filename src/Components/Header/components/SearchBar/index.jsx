import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../../../../context/context';

const SearchBar = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [radioState, setRadioState] = useState('s');

  const { pathname } = useLocation();
  const { updateRecipes } = useContext(Context);

  const handleClick = async () => {
    if (radioState === 'f' && inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    await updateRecipes(radioState, inputSearch, pathname);
  };

  return (
    <>
      <input
        data-testid="search-input"
        type="text"
        onChange={ (e) => setInputSearch(e.target.value) }
        value={ inputSearch }
      />

      <div
        value={ radioState }
        onChange={ (e) => setRadioState(e.target.value) }
      >
        <input
          type="radio"
          value="i"
          name="gender"
          data-testid="ingredient-search-radio"
        />
        Ingredient
        <input
          type="radio"
          value="s"
          name="gender"
          data-testid="name-search-radio"
        />
        Name
        <input
          type="radio"
          value="f"
          name="gender"
          data-testid="first-letter-search-radio"
        />
        First Letter
      </div>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </>
  );
};

export default SearchBar;
