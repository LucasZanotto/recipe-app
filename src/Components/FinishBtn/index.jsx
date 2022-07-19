import React from 'react';
// import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { useHistory } from 'react-router-dom';

const FinishBtn = (props) => {
  const history = useHistory();
  const location = 
  const { ingredientsCheck, recipeInfo } = props;

  const updateRecipes = () => {
    const today = new Date();
    const doneDate = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;

    if (history.location.pathname)
    const {
      idMeal: id,
      strArea: nationality,
      strCategory: category,
      strMeal: name,
      strMealThumb: image,
      strTags: tags,
    } = recipeInfo;
    const recipe = {
      id,
      nationality,
      category,
      alcoholicOrNot: '',
      name,
      image,
      doneDate,
      tags,
      type: 'food',
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, recipe]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
    }
    history.push('/done-recipes');
  };

  const counter = Object.keys(recipeInfo).filter((a) => a.includes('strIngredient'))
    .map((info, index) => {
      if (recipeInfo[info] && recipeInfo[info].length > 1) {
        return index;
      }
      return null;
    });

  const lastIndex = -1;
  const ingredientsLength = counter.filter((n) => n).at(lastIndex) + 1;

  if (ingredientsCheck && (ingredientsCheck.length !== ingredientsLength)) {
    return (
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled
      >
        Finish Recipe
      </button>
    );
  }

  return (
    <button
      data-testid="finish-recipe-btn"
      type="button"
      onClick={ updateRecipes }
    >
      Finish Recipe
    </button>
  );
};

FinishBtn.propTypes = {
  ingredientsCheck: PropTypes.arrayOf(string).isRequired,
  recipeInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

export default FinishBtn;
