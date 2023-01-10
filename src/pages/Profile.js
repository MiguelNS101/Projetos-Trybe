import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  let usuario = JSON.parse(localStorage.getItem('user'));
  if (usuario === null || usuario === undefined || usuario === '') {
    usuario = 'Default User';
  }
  const history = useHistory();
  return (
    <div>
      <Header name="Profile" displaySearchBtn={ false } />
      <article>
        <p data-testid="profile-email" className="userName">
          { usuario.email }
        </p>
        <div className="profileoptions">
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
        </div>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </article>
      <Footer />
    </div>
  );
}

export default Profile;
