import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';
import { act } from 'react-dom/test-utils';

describe('Testando a tela de detalhes de comida', () => {
  test('Testando os botao', async () => {
    // const fetchBackup = global.fetch
    global.fetch = fetch
    
    const {history} = renderWithRouter(<App />);

    history.push('/drinks/178319')
    
    const aquamarine = await screen.findByText('Aquamarine')
    expect(aquamarine).toBeInTheDocument();
    userEvent.click(aquamarine);
    
    const recipeFiltered = await screen.findByTestId('recipe-title')
    expect(recipeFiltered).toBeInTheDocument();
    const aquamarineTitle = await screen.findByText('Aquamarine')
    expect(aquamarineTitle).toBeInTheDocument();
    
    const favCheck = screen.getByTestId('favorite-btn')
    expect(favCheck).toBeInTheDocument();
    expect(favCheck.innerHTML).toBe('<img src=\"whiteHeartIcon.svg\" alt=\"white\">');
    
    userEvent.click(favCheck);
    expect(favCheck.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"black\">');
    
    userEvent.click(favCheck);
    expect(favCheck.innerHTML).toBe('<img src=\"whiteHeartIcon.svg\" alt=\"white\">');

    userEvent.click(favCheck);
    expect(favCheck.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"black\">');
    
    history.push('/drinks/178319')
    expect(favCheck.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"black\">');

    history.push('/drinks/15997')
    
    const gg = await screen.findByText('GG')
    expect(gg).toBeInTheDocument();
    userEvent.click(gg);
    
    const recipeFiltered2 = await screen.findByTestId('recipe-title')
    expect(recipeFiltered2).toBeInTheDocument();
    const ggTitle = await screen.findByText('GG')
    expect(ggTitle).toBeInTheDocument();
    
    const favCheck2 = screen.getByTestId('favorite-btn')
    expect(favCheck2).toBeInTheDocument();
    expect(favCheck2.innerHTML).toBe('<img src=\"whiteHeartIcon.svg\" alt=\"white\">');
    
    userEvent.click(favCheck2);
    expect(favCheck2.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"black\">');
    
    userEvent.click(favCheck2);
    expect(favCheck2.innerHTML).toBe('<img src=\"whiteHeartIcon.svg\" alt=\"white\">');

    userEvent.click(favCheck2);
    expect(favCheck2.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"black\">');
    
    history.push('/drinks/15997')
    expect(favCheck2.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"black\">');
  });
});
