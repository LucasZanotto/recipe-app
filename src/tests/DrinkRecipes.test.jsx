import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';



describe('Testando a tela de drinkRecipes', () => {
  test('Testando os botao', async () => {
    const fetchBackup = global.fetch
    global.fetch = fetch


    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const gg = await screen.findByText('GG')
    expect(gg).toBeInTheDocument();
    
    const btnShake = await screen.findByTestId('Shake-category-filter');
    expect(btnShake).toBeInTheDocument();
    userEvent.click(btnShake);
    
    const twoGG = await screen.findByText('GG')
    expect(twoGG).not.toBeInTheDocument();
    
    const btnCocoa = await screen.findByTestId('Cocoa-category-filter');
    expect(btnCocoa).toBeInTheDocument();
    userEvent.click(btnCocoa);
    
    const onCastillian = await screen.findByText(/Castillian Hot Chocolate/i)
    expect(onCastillian).toBeInTheDocument();
    
    const btnAll = screen.getByRole('button', { name: /all/i })
    userEvent.click(btnAll)
    
    const treeGG = await screen.findByText('GG')
    expect(treeGG).toBeInTheDocument();
    
    const btnCocktail = await screen.findByTestId('Cocktail-category-filter');
    expect(btnCocktail).toBeInTheDocument();
    userEvent.click(btnCocktail);
    userEvent.click(btnCocktail);
    
    const stay = await screen.findByTestId('Cocoa-category-filter'); //sei la pq mas isso aqui força um interval

    const fourGG = await screen.findByText('GG')
    expect(fourGG).toBeInTheDocument();
    
    const btnDrinks = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(btnDrinks);
    const btnFoods = await screen.findByTestId('food-bottom-btn');
    // userEvent.click(btnFoods);
    const fiveGG = await screen.queryByText('GG')
    const stay2 = await screen.findByTestId('food-bottom-btn');
    // expect(fiveGG).toBeNull()
    
    // screen.logTestingPlaygroundURL()
    
    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);
    
    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);
    
    const inputText = screen.getByTestId('search-input')
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'Aquamarine');
    expect(inputText.value).toBe('Aquamarine')
    
    const searchBtn = screen.getByTestId('exec-search-btn')
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    // screen.logTestingPlaygroundURL()

    const recipeFiltered = await screen.findByTestId('recipe-title')
    expect(recipeFiltered).toBeInTheDocument();

    global.fetch = fetchBackup
  });
});
