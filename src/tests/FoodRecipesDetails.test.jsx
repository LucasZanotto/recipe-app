import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';
const copy = require('clipboard-copy');


describe('Testando a tela de detalhes de comida', () => {
  test('Testando os botao', async () => {
    global.fetch = fetch
    // document.execCommand = () => console.log('teste');
    window.document.execCommand = ((param1) => param2 => console.log(param1, param2))

    const {history} = renderWithRouter(<App />);

    history.push('/foods/52771')

    const spicy = await screen.findByText('Spicy Arrabiata Penne')
    expect(spicy).toBeInTheDocument();
    userEvent.click(spicy);
    
    const recipeFiltered = await screen.findByTestId('recipe-title')
    expect(recipeFiltered).toBeInTheDocument();
    const spicyTitle = await screen.findByText('Spicy Arrabiata Penne')
    expect(spicyTitle).toBeInTheDocument();
    
    const favCheck = screen.getByTestId('favorite-btn')
    expect(favCheck).toBeInTheDocument();
    expect(favCheck.innerHTML).toBe('<img src=\"whiteHeartIcon.svg\" alt=\"white\">');
    
    userEvent.click(favCheck);
    expect(favCheck.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"black\">');
    
    userEvent.click(favCheck);
    expect(favCheck.innerHTML).toBe('<img src=\"whiteHeartIcon.svg\" alt=\"white\">');
    
    userEvent.click(favCheck);
    
    const shareBtn = screen.getByTestId('share-btn')
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
    // expect(document.execCommand).toHabeBeenCalledWith('copy')
    
    const shareWarning = screen.getByText('Link copied!')
    expect(shareWarning).toBeInTheDocument();
    
    history.push('/foods/52977')
    const corbaTitle = await screen.findByText('Corba')
    expect(corbaTitle).toBeInTheDocument();
    const favCheck2 = screen.getByTestId('favorite-btn')
    expect(favCheck2.innerHTML).toBe('<img src=\"whiteHeartIcon.svg\" alt=\"white\">');
    userEvent.click(favCheck2);
    expect(favCheck2.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"black\">');

  });
});
