import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';



describe('Testando a tela de foodRecipes', () => {
  test('Testando os botao', async () => {
    const fetchBackup = global.fetch
    global.fetch = fetch


    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const corba = await screen.findByText('Corba')
    expect(corba).toBeInTheDocument();
    
    const btnGoat = await screen.findByTestId('Goat-category-filter');
    expect(btnGoat).toBeInTheDocument();
    userEvent.click(btnGoat);
    
    const twoCorba = await screen.findByText('Corba')
    expect(twoCorba).not.toBeInTheDocument();
    
    const btnBeef = await screen.findByTestId('Beef-category-filter');
    expect(btnBeef).toBeInTheDocument();
    userEvent.click(btnBeef);
    
    const onBeefPie = await screen.findByText(/beef and mustard pie/i)
    expect(onBeefPie).toBeInTheDocument();
    
    const btnAll = screen.getByRole('button', { name: /all/i })
    userEvent.click(btnAll)
    
    const treeCorba = await screen.findByText('Corba')
    expect(treeCorba).toBeInTheDocument();
    
    const btnDessert = await screen.findByTestId('Dessert-category-filter');
    expect(btnDessert).toBeInTheDocument();
    userEvent.click(btnDessert);
    userEvent.click(btnDessert);
    
    const stay = await screen.findByTestId('Dessert-category-filter'); //sei la pq mas isso aqui força um interval

    const fourCorba = await screen.findByText('Corba')
    expect(fourCorba).toBeInTheDocument();
    
    const btnDrinks = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(btnDrinks);
    const btnFoods = await screen.findByTestId('food-bottom-btn');
    userEvent.click(btnFoods);
    const fiveCorba = await screen.queryByText('Corba')
    const stay2 = await screen.findByTestId('food-bottom-btn');
    expect(fiveCorba).toBeNull()


    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);
    
    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);

    const inputText = screen.getByTestId('search-input')
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'Arrabiata');
    expect(inputText.value).toBe('Arrabiata')

    const searchBtn = screen.getByTestId('exec-search-btn')
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const recipeFiltered = await screen.findByTestId('recipe-title')
    expect(recipeFiltered).toBeInTheDocument();
    
    screen.logTestingPlaygroundURL()

    global.fetch = fetchBackup
  });
});
