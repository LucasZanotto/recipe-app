import React, { useContext } from 'react';
import Context from '../../context/context';
// import Header from '../Header';

const DrinkRecipeDetails = () => {
  const { recipes } = useContext(Context);

  return (
    <>
      <h1>teste drink recipe</h1>
      {
        console.log(recipes)
      }
    </>
  );
};

export default DrinkRecipeDetails;
