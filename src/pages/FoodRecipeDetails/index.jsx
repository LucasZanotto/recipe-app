import React, { useContext } from 'react';
import Context from '../../context/context';
// import Header from '../Header';

const FoodRecipeDetails = () => {
  const { recipes } = useContext(Context);

  return (
    <>
      <h1>teste food recipe</h1>
      {
        console.log(recipes)
      }
    </>
  );
};

export default FoodRecipeDetails;
