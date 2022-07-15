import React from 'react';
import { Link } from 'react-router-dom';
import imageDrink from '../../images/drinkIcon.svg';
import imageMeal from '../../images/mealIcon.svg';

export default function Footer() {
  return (
    <div style={ { position: 'fixed', bottom: '0' } } data-testid="footer">
      <Link style={ { position: 'fixed', bottom: '0', left: '10%' } } to="/foods">
        <a
          data-testid="food-bottom-btn"
          to="/foods"
          src={ imageMeal }
          alt="meal"
        >
          <img
            src={ imageMeal }
            alt="meal"
          />
        </a>
      </Link>
      <Link style={ { position: 'fixed', bottom: '0', left: '80%' } } to="/drinks">
        <a data-testid="drinks-bottom-btn" to="/drinks" src={ imageDrink } alt="drink">
          <img
            src={ imageDrink }
            alt="drink"
          />
        </a>
      </Link>
    </div>
  );
}
