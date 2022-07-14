import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const seis = 6;
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
        disabled={ !(email.length > seis && password.length > seis) }
      >
        Entrar
      </button>
    </div>
  );
}
