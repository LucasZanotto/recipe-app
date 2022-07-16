import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando a tela de foodRecipes', () => {


  test('Testando os botao', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    setInterval(() => {

      const btnAll = screen.getByTestId('All-category-filter');
      expect(btnAll).toBeInTheDocument();
      const btnBeef = screen.getByTestId('Beef-category-filter');
      expect(btnBeef).toBeInTheDocument();
      const btnChicken = screen.getByTestId('Chicken-category-filter')
      expect(btnChicken).toBeInTheDocument();
      const btnDessert = screen.getByTestId('Dessert-category-filter')
      expect(btnDessert).toBeInTheDocument();
      const btnGoat = screen.getByTestId('Goat-category-filter')
      expect(btnGoat).toBeInTheDocument();
      const btnLamb = screen.queryByTestId('Lamb-category-filter')
      expect(btnLamb).toBeNull();
      const btnTodos = screen.getAllByRole('button');
      expect(btnTodos.length).toBe(3);
      const btnTest = screen.getAllByTestId('btn-test');
      expect(btnTest.length).toBe('');
    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();
    expect(history.location.pathname).toBe('/foods');
  }, 3000);

  });
});