import React from 'react';
import PropTypes from 'prop-types';

function Recomendated({ index, src, titleCard }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="recomendatedCard">
      <img
        data-testid={ `${index}-recomendation-card` }
        src={ src }
        alt=""
      />
      <h5 data-testid={ `${index}-recomendation-title` }>{ titleCard }</h5>
    </div>
  );
}

Recomendated.propTypes = {
  index: PropTypes.string,
  src: PropTypes.string,
  titleCard: PropTypes.string,
}.isRequired;

export default Recomendated;
