import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';

describe('Testando progresso da tela', () => {
  test('Testando os botao de favorite e share', async () => {
    // const fetchBackup = global.fetch
    global.fetch = fetch
    const { history } = renderWithRouter(<App />);
    window.document.execCommand = ((param1) => param2 => console.log(param1, param2))

    history.push('foods/52771/in-progress');

    const title = await screen.findByText('Spicy Arrabiata Penne');
    expect(title).toBeInTheDocument();

    const btnComp = screen.getByTestId('share-btn');
    expect(btnComp).toBeInTheDocument();
    const alertMessage = screen.queryByText(/Link copied!/i);
    expect(alertMessage).toBeNull();
    
    userEvent.click(btnComp);
    const alertMessage1 = screen.getByText(/Link copied!/i);
    expect(alertMessage1).toBeInTheDocument();

    const favCheck = screen.getByTestId('favorite-btn')
    expect(favCheck).toBeInTheDocument();
    expect(favCheck.innerHTML).toBe('<img src=\"whiteHeartIcon.svg\" alt=\"white\">');
    
    userEvent.click(favCheck);
    expect(favCheck.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"black\">');
    
    userEvent.click(favCheck);
    expect(favCheck.innerHTML).toBe('<img src=\"whiteHeartIcon.svg\" alt=\"white\">');
    
    userEvent.click(favCheck);

    history.push('foods/52771/in-progress');

    expect(favCheck.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"black\">');

    

  });
  test('Testando os botao de check dos ingredientes', async () => {
    global.fetch = fetch
    const { history } = renderWithRouter(<App />);
    window.document.execCommand = ((param1) => param2 => console.log(param1, param2))

    history.push('/foods/52771');

    const btnStart = await screen.findByTestId('start-recipe-btn');
    expect(btnStart.innerHTML).toBe('Start Recipe');
    userEvent.click(btnStart);
    expect(history.location.pathname).toBe('/foods/52771/in-progress')

    history.push('/foods/52771/in-progress');

    const labelCheck0 = await screen.findByTestId('0-ingredient-step');
    expect(labelCheck0).toBeInTheDocument();

    const check0 = screen.getByTestId('checkbox-0');
    expect(check0).toBeInTheDocument();

    expect(check0.checked).toBe(false);
    userEvent.click(check0);

    expect(check0.checked).toBe(true);
    userEvent.click(check0);

    expect(check0.checked).toBe(false);
    userEvent.click(check0);

    const labelCheck1 = await screen.findByTestId('1-ingredient-step');
    expect(labelCheck1).toBeInTheDocument();

    const check1 = screen.getByTestId('checkbox-1');
    expect(check1).toBeInTheDocument();

    expect(check1.checked).toBe(false);

    userEvent.click(check1);
    expect(check0.checked).toBe(true);
    expect(check1.checked).toBe(true);

    userEvent.click(check1);
    expect(check0.checked).toBe(true);
    expect(check1.checked).toBe(false);

    history.push('foods/52771/in-progress');

    expect(check0.checked).toBe(true);
    expect(check1.checked).toBe(false);

    history.push('/foods/52977/in-progress');

    const check2 = await screen.findByTestId('checkbox-1');
    expect(check2).toBeInTheDocument();
    userEvent.click(check2);
    expect(check2.checked).toBe(true);

    history.push('foods/52771/in-progress');

    expect(check0.checked).toBe(true);
    expect(check1.checked).toBe(false);
    expect(check2.checked).toBe(true);

    history.push('/foods/52771');

    const btnContinue = await screen.findByTestId('start-recipe-btn');
    expect(btnContinue.innerHTML).toBe('Continue Recipe');
  });
});