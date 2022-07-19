import React from 'react';
import PropTypes, { string } from 'prop-types';

const CheckRender = (props) => {
  const { ingredientAndMeasure, ingredientsCheck, checking } = props;
  if (ingredientsCheck.includes(ingredientAndMeasure)) {
    return (<input
      onChange={ () => {
        checking(ingredientAndMeasure);
        console.log('teste');
      } }
      type="checkbox"
      defaultChecked
    />
    );
  }
  return (<input
    onChange={ () => checking(ingredientAndMeasure) }
    type="checkbox"
  />
  );
};

CheckRender.propTypes = {
  ingredientsCheck: PropTypes.arrayOf(string).isRequired,
  ingredientAndMeasure: PropTypes.string.isRequired,
  checking: PropTypes.func.isRequired,
};

export default CheckRender;
