import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando a tela de login', () => {
  test('Testando os inputs', () => {
    const {history} = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'dsaopdso@dsop.com')

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '34245352325342')
    
    const btnLogin = screen.getByTestId('login-submit-btn');
    userEvent.click(btnLogin);

    history.push('/profile');

    expect(history.location.pathname).toBe('/profile');
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();

    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(btnDoneRecipes).toBeInTheDocument();
    userEvent.click(btnDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
    
    history.push('/profile');

    const btnFavRecipes = screen.getByTestId('profile-favorite-btn');
    expect(btnFavRecipes).toBeInTheDocument();
    userEvent.click(btnFavRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');

    history.push('/profile');

    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeInTheDocument();
    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');

  });
});