import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlanetCard extends Component {
  render() {
    const planCard = this.props;
    const altPlan = `Planeta ${planCard.planetName}`;
    return (
      <div data-testid="planet-card" className="planetCard">
        <h3 data-testid="planet-name">{planCard.planetName}</h3>
        <img src={ planCard.planetImage } alt={ altPlan } />
      </div>
    );
  }
}

PlanetCard.propTypes = {
  planetName: PropTypes.string.isRequired,
  planetImage: PropTypes.string.isRequired,
};

export default PlanetCard;
