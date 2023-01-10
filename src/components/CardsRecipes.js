import React from 'react';
import PropTypes from 'prop-types';

function CardsRecipes({ index, src, titleCard }) {
  return (
    <article data-testid={ `${index}-recipe-card` } className="recipeCard">
      <h5 data-testid={ `${index}-card-name` }>{ titleCard }</h5>
      <img
        data-testid={ `${index}-card-img` }
        src={ src }
        alt={ titleCard }
      />
    </article>
  );
}

CardsRecipes.propTypes = {
  index: PropTypes.string,
  src: PropTypes.string,
  titleCard: PropTypes.string,
}.isRequired;

export default CardsRecipes;
