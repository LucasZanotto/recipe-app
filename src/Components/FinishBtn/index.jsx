import React from 'react';
// import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { useHistory } from 'react-router-dom';

const FinishBtn = (props) => {
  const history = useHistory();
  const { ingredientsCheck, recipeInfo } = props;

  const counter = Object.keys(recipeInfo).filter((a) => a.includes('strIngredient'))
    .map((info, index) => {
      if (recipeInfo[info] && recipeInfo[info].length > 1) {
        return index;
      }
      return null;
    });

  const lastIndex = -1;
  const ingredientsLength = counter.filter((n) => n).at(lastIndex) + 1;

  console.log(ingredientsCheck.length, ingredientsLength);

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
      onClick={ () => history.push('/done-recipes') }
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
