import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import RecipeExpressICON from '../images/RecipeExpressICON.png';

function Login() {
  const {
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
  } = useContext(RecipesContext);

  const handleButton = () => {
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // Regular Expression Pattern - https://www.w3resource.com/javascript/form/email-validation.php
    const passwordFormat = 6;
    let result = false;
    if (userEmail.match(mailFormat) && userPassword.length > passwordFormat) {
      result = true;
    }
    return result;
  };

  const handleLogin = (value) => {
    const obj = { email: value };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(obj));
  };

  return (
    <article className="LoginPage">
      <div className="loginCard">
        <img src={ RecipeExpressICON } alt="RecipeExpressICON" />
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            data-testid="email-input"
            onChange={ ({ target }) => setUserEmail(target.value) }
            value={ userEmail }
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            data-testid="password-input"
            value={ userPassword }
            onChange={ ({ target }) => setUserPassword(target.value) }
          />
        </label>
        <Link to="/foods">
          <button
            type="button"
            data-testid="login-submit-btn"
            onClick={ () => handleLogin(userEmail) }
            disabled={ !handleButton() }
          >
            Enter
          </button>
        </Link>
      </div>
    </article>
  );
}

export default Login;
