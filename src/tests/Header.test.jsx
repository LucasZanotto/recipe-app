import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando a tela de login', () => {
  test('Testando os inputs', () => {
    const { history } = renderWithRouter(<App />);
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