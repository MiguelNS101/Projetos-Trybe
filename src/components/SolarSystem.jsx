import React, { Component } from 'react';
import Title from './Title';
import PlanetCard from './PlanetCard';
import planets from '../data/planets';
// import PropTypes from 'prop-types';

class SolarSystem extends Component {
  render() {
    return (
      <div data-testid="solar-system">
        <Title headline="Planetas" />
        <div className="planets">
          {planets.map((planet) => {
            const pNm = planet.name;
            const pIm = planet.image;
            return <PlanetCard key={ pNm } planetName={ pNm } planetImage={ pIm } />;
          })}
        </div>
      </div>
    );
  }
}

// SolarSystem.propTypes = {
//   //   titulo: PropTypes.string.isRequired
// };

export default SolarSystem;
