import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MissionCard extends Component {
  render() {
    const mission = this.props;
    return (
      <div data-testid="mission-card" className="missionCard">
        <h3 data-testid="mission-name">{mission.name}</h3>
        <p data-testid="mission-year">{mission.year}</p>
        <p data-testid="mission-country">{mission.country}</p>
        <p data-testid="mission-destination">{mission.destination}</p>
      </div>
    );
  }
}

MissionCard.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
};

export default MissionCard;
