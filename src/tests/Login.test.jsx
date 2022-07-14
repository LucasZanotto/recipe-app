import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando a tela de login', () => {
  test('Testando os inputs', () => {
    const {history} = renderWithRouter(<App />);
    const emailInputEl = screen.getByTestId('email-input');
    expect(emailInputEl).toBeInTheDocument();
    userEvent.type(emailInputEl, 'sla@gmail.com');
    expect(emailInputEl.value).toBe('sla@gmail.com');
    
    const passwordInputEl = screen.getByTestId('password-input');
    expect(passwordInputEl).toBeInTheDocument();
    userEvent.type(passwordInputEl, '1234567');
    expect(passwordInputEl.value).toBe('1234567');
    
    const buttonSubmitEl = screen.getByTestId('login-submit-btn');
    expect(buttonSubmitEl.disabled).toBe(false);
    expect(buttonSubmitEl).toBeInTheDocument();
    userEvent.click(buttonSubmitEl);
    
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
