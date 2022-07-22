import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';
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
  {
    "alcoholicOrNot": "Alcoholic",
    "category": "Shot",
    "id": "13501",
    "image": "https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg",
    "name": "ABC",
    "nationality": "",
    "type": "drink",
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

  test('Verifica botão de copiar e desfavoritar', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    renderWithRouter(<FavoriteRecipes />);
    window.document.execCommand = ((param1) => param2 => console.log(param1, param2))

    const recipeOneShareBtn = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(recipeOneShareBtn);
    const shareWarning = screen.getByText('Link copied!')
    expect(shareWarning).toBeInTheDocument();
    userEvent.click(recipeOneShareBtn);
    expect(shareWarning).not.toBeInTheDocument();

    const recipeOneHurtBtn = screen.getByTestId('0-horizontal-favorite-btn');
    const recipeOneName = screen.getByTestId('0-horizontal-name');
    expect(recipeOneName.innerHTML).toBe(favoriteRecipesMock[0]['name']);
    userEvent.click(recipeOneHurtBtn);
    expect(recipeOneName.innerHTML).toBe(favoriteRecipesMock[1]['name']);
  });

  test('Testa se bebida exibe se é alcóolica ou não', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    renderWithRouter(<FavoriteRecipes />);

    const recipeOneAlcoholic = screen.getAllByTestId('2-horizontal-top-text');
    expect(recipeOneAlcoholic[1].innerHTML).toBe(favoriteRecipesMock[2]['alcoholicOrNot']);
  });

  test('Testa filtros food, drink e all', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    const { debug } = renderWithRouter(<FavoriteRecipes />);

    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    const foodFilterBtn = screen.getByTestId('filter-by-food-btn');
    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');

    const recipeOneName = screen.getByTestId('0-horizontal-name');
    const recipeTwoName = screen.getByTestId('1-horizontal-name');
    const recipeThreeName = screen.getByTestId('2-horizontal-name');
    expect(recipeOneName).toBeInTheDocument();
    expect(recipeTwoName).toBeInTheDocument();
    expect(recipeThreeName).toBeInTheDocument();
    userEvent.click(foodFilterBtn);

    expect(recipeThreeName).not.toBeInTheDocument();
    userEvent.click(drinkFilterBtn);

    expect(recipeOneName.innerHTML).toBe(favoriteRecipesMock[2]['name']);
    expect(recipeTwoName).not.toBeInTheDocument();
    expect(recipeThreeName).not.toBeInTheDocument();
    userEvent.click(allFilterBtn);

    debug();
    const newRecipeOneName = screen.getByTestId('0-horizontal-name');
    const newRecipeTwoName = screen.getByTestId('1-horizontal-name');
    const newRecipeThreeName = screen.getByTestId('2-horizontal-name');
    expect(newRecipeOneName).toBeInTheDocument();
    expect(newRecipeTwoName).toBeInTheDocument();
    expect(newRecipeThreeName).toBeInTheDocument();
  });
})
