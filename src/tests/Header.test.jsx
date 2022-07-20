import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando a tela de login', () => {
  test('Testando os inputs', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'dsaopdso@dsop.com')

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '34245352325342')
    
    const btnLogin = screen.getByTestId('login-submit-btn');
    userEvent.click(btnLogin);


    history.push('/foods')
    
    const titleHeader = screen.getByTestId('page-title');
    expect(titleHeader).toBeInTheDocument();

    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();

    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const inputText = screen.getByTestId('search-input')
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'xablau');
    expect(inputText.value).toBe('xablau')
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });
});