import React from 'react';
import { Link } from 'react-router-dom';
import imageDrink from '../../images/drinkIcon.svg';
import imageMeal from '../../images/mealIcon.svg';

export default function Footer() {
  return (
    <div style={ { position: 'fixed', bottom: '0' } } data-testid="footer">
      <Link
        data-testid="food-bottom-btn"
        style={ { position: 'fixed', bottom: '0', left: '10%' } }
        to="/foods"
        src={ imageMeal }
      >
        <img
          src={ imageMeal }
          alt="meal"
        />
      </Link>
      <Link
        style={ { position: 'fixed', bottom: '0', left: '80%' } }
        data-testid="drinks-bottom-btn"
        to="/drinks"
        src={ imageDrink }
      >
        <img
          src={ imageDrink }
          alt="drink"
        />
      </Link>
    </div>
  );
}
