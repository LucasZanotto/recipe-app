import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import React from 'react';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import imageComp from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const favoriteRecipesMock = [
  {
    "alcoholicOrNot": "",
    "category": "Goat",
    "id": "52968",
    "image": "https://www.themealdb.com/images/media/meals/cuio7s1555492979.jpg",
    "name": "Mbuzi Choma (Roasted Goat)",
    "nationality": "Kenyan",
    "type": "food",
  },
  {
    "alcoholicOrNot": "",
    "category": "Side",
    "id": "53060",
    "image": "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
    "name": "Burek",
    "nationality": "Croatian",
    "type": "food"
  },
];

describe('Testa página de receitas favoritas', () => {
  test('Verifica se receitas favoritas estão na página', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    renderWithRouter(<FavoriteRecipes />);

    const recipeOneImg = screen.getByTestId('0-horizontal-image');
    const recipeOneText = screen.getByTestId('0-horizontal-top-text');
    const recipeOneName = screen.getByTestId('0-horizontal-name');
    const recipeOneShareBtn = screen.getByTestId('0-horizontal-share-btn');
    const recipeOneHurtBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(recipeOneImg.src).toBe(favoriteRecipesMock[0]['image']);
    expect(recipeOneText.innerHTML).toBe(`${favoriteRecipesMock[0]['nationality']} - ${favoriteRecipesMock[0]['category']}`);
    expect(recipeOneName.innerHTML).toBe(favoriteRecipesMock[0]['name']);
    expect(recipeOneShareBtn.innerHTML).toContain(imageComp);
    expect(recipeOneHurtBtn.innerHTML).toContain(blackHeart);

    const recipeTwoImg = screen.getByTestId('1-horizontal-image');
    const recipeTwoText = screen.getByTestId('1-horizontal-top-text');
    const recipeTwoName = screen.getByTestId('1-horizontal-name');
    const recipeTwoShareBtn = screen.getByTestId('1-horizontal-share-btn');
    const recipeTwoHurtBtn = screen.getByTestId('1-horizontal-favorite-btn');
    expect(recipeTwoImg.src).toBe(favoriteRecipesMock[1]['image']);
    expect(recipeTwoText.innerHTML).toBe(`${favoriteRecipesMock[1]['nationality']} - ${favoriteRecipesMock[1]['category']}`);
    expect(recipeTwoName.innerHTML).toBe(favoriteRecipesMock[1]['name']);
    expect(recipeTwoShareBtn.innerHTML).toContain(imageComp);
    expect(recipeTwoHurtBtn.innerHTML).toContain(blackHeart);
  });
})
