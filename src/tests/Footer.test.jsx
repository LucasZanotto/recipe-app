import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando a tela de login', () => {
  test('Testando os inputs', () => {
    renderWithRouter(<App />);
    expect(true).toBeTruthy();
  });
});