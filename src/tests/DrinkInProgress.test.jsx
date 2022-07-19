import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';

describe('Testando progresso da tela', () => {
  test('Testando os botao de favorite e share drink', async () => {
    // const fetchBackup = global.fetch
    global.fetch = fetch
    const { history } = renderWithRouter(<App />);
    window.document.execCommand = ((param1) => param2 => console.log(param1, param2))

    history.push('drinks/15997/in-progress');

    const title = await screen.findByText('GG');
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

    history.push('drinks/15997/in-progress');

    expect(favCheck.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"black\">');

    

  });
  test('Testando os botao de check dos ingredientes', async () => {
    global.fetch = fetch
    const { history } = renderWithRouter(<App />);
    window.document.execCommand = ((param1) => param2 => console.log(param1, param2))

    history.push('/drinks/15997');

    const btnStart = await screen.findByTestId('start-recipe-btn');
    expect(btnStart.innerHTML).toBe('Start Recipe');
    userEvent.click(btnStart);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');

    history.push('/drinks/15997/in-progress');

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

    history.push('drinks/15997/in-progress');

    expect(check0.checked).toBe(true);
    expect(check1.checked).toBe(false);

    history.push('/drinks/178319/in-progress');

    const titleAqua = await screen.findByText('Aquamarine');
    expect(titleAqua).toBeInTheDocument()

    const check2 = await screen.findByTestId('checkbox-1');
    expect(check2).toBeInTheDocument();
    userEvent.click(check2);
    expect(check2.checked).toBe(true);

    history.push('drinks/15997/in-progress');

    expect(check0.checked).toBe(true);
    expect(check1.checked).toBe(false);
    expect(check2.checked).toBe(true);

    history.push('/drinks/15997');

    const btnContinue = await screen.findByTestId('start-recipe-btn');
    expect(btnContinue.innerHTML).toBe('Continue Recipe');

    history.push('/drinks/15997/in-progress');

    const btnFinishDisabled = await screen.findByTestId('finish-recipe-btn');
    expect(btnFinishDisabled.disabled).toBe(true);

    const checkGG1 = screen.getByTestId('checkbox-1');
    expect(checkGG1).toBeInTheDocument();
    userEvent.click(checkGG1);
    
    const checkGG2 = screen.getByTestId('checkbox-2');
    expect(checkGG2).toBeInTheDocument();
    userEvent.click(checkGG2); 
    
    expect(check0.checked).toBe(true);
    expect(checkGG1.checked).toBe(true);
    expect(checkGG2.checked).toBe(true);
    
    const btnFinishActive = await screen.findByTestId('finish-recipe-btn');
    expect(btnFinishActive.disabled).toBe(false);

    userEvent.click(btnFinishActive);

    history.push('/done-recipes');
    expect(history.location.pathname).toBe('/done-recipes');
  });
});