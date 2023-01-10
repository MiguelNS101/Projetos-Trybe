import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchHeader from './SearchHeader';

function Header({ name, displaySearchBtn }) {
  const history = useHistory();
  const [showUp, setShowUp] = useState(false);

  function handleClick() {
    setShowUp(!showUp);
  }

  return (
    <div>
      <header className="mainHeader">
        <button type="button" onClick={ () => history.push('/profile') }>
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile icon"
          />
        </button>
        <h1 data-testid="page-title">{name}</h1>
        {displaySearchBtn ? (
          <button type="button" onClick={ handleClick }>
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search icon"
            />
          </button>
        ) : (
          <button type="button">
            <p />
          </button>
        )}
      </header>
      {showUp && <SearchHeader />}
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string,
  displaySearchBtn: PropTypes.bool,
}.isRequired;

export default Header;
