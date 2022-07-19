import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const seis = 6;
  const re = /\S+@\S+\.\S+/;

  const history = useHistory();

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ username: email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <div>
      <label htmlFor="email">
        Email:
        <input
          data-testid="email-input"
          id="email"
          type="text"
          onChange={ (e) => setEmail(e.target.value) }
          value={ email }
          name="nome"
          required
        />
      </label>
      <br />
      <label htmlFor="password">
        Senha:
        <input
          data-testid="password-input"
          id="password"
          type="text"
          onChange={ (e) => setPassword(e.target.value) }
          value={ password }
          name="password"
          required
        />
      </label>
      <br />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !(re.test(email) && password.length > seis) }
        onClick={ handleSubmit }
      >
        Entrar
      </button>
    </div>
  );
}
