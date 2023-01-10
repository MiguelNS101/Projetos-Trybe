import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ idMeal, butType }) {
  const { isCopied, setIsCopied } = useContext(RecipesContext);
  const COPY_TIME = 2000;

  function handleShare(recipeId) {
    if (butType === 'food') {
      copy(`http://localhost:3000/foods/${recipeId}`);
    } else if (butType === 'drink') {
      copy(`http://localhost:3000/drinks/${recipeId}`);
    }
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, COPY_TIME);
  }

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => handleShare(idMeal) }
      >
        <img src={ shareIcon } alt="share Icon" />
      </button>
      {isCopied ? <span>Link copied!</span> : ''}
    </div>
  );
}

ShareButton.propTypes = {
  index: PropTypes.string,
}.isRequired;

export default ShareButton;
