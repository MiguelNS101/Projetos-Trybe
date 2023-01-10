import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Input from './Input';

class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (
      <div className="card">
        <h4 data-testid="name-card">{ cardName }</h4>
        <img src={ cardImage } alt={ cardName } data-testid="image-card" />
        <p data-testid="description-card">{ cardDescription }</p>
        <p data-testid="attr1-card">
          Atrr 1:
          { cardAttr1 }
        </p>
        <p data-testid="attr2-card">
          Atrr 2:
          { cardAttr2 }
        </p>
        <p data-testid="attr3-card">
          Atrr 3:
          { cardAttr3 }
        </p>
        <p data-testid="rare-card">{ cardRare }</p>
        <span data-testid={ cardTrunfo ? 'trunfo-card' : '' }>
          {cardTrunfo ? 'Super Trunfo' : ''}
        </span>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
