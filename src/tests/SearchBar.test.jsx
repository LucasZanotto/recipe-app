import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';


describe('Testando a tela de login', () => {
  test('Testando os inputs', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    const { history } = renderWithRouter(<App />);
    history.push('/foods')

    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const inputText = screen.getByTestId('search-input')
    expect(inputText).toBeInTheDocument();

    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);

    userEvent.type(inputText, 'Bubble & Squeak');
    expect(inputText.value).toBe('Bubble & Squeak')

    const searchBtn = screen.getByTestId('exec-search-btn')
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    
    setInterval(() => {
      const recipeFiltered = screen.findByText('Bubble & Squeak')
      expect(recipeFiltered).toBeInTheDocument();
      const recipeNotFiltered = screen.queryByText('Beef and Mustard Pie')
      expect(recipeNotFiltered).toBeNull();
    }, 2000)

    const flRadio = screen.getByTestId('first-letter-search-radio');
    expect(flRadio).toBeInTheDocument();
    userEvent.click(flRadio);
    
    const alertMock = jest.spyOn(window,'alert'); 
    userEvent.click(searchBtn);

    expect(alertMock).toHaveBeenCalledTimes(1)

    window.alert = jsdomAlert;  // restore the jsdom alert
  });
});