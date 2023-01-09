import React, { Component } from 'react';
import Title from './Title';
import MissionCard from './MissionCard';
import missions from '../data/missions';
// import PropTypes from 'prop-types';

class Missions extends Component {
  render() {
    return (
      <div data-testid="missions">
        <Title headline="Missões" />
        <div className="missions">
          {missions.map((mission) => {
            const mNm = mission.name;
            const mYa = mission.year;
            const mCt = mission.country;
            const mDs = mission.year;
            return (
              <MissionCard
                key={ mNm }
                name={ mNm }
                year={ mYa }
                country={ mCt }
                destination={ mDs }
              />
            );
          })}
        </div>
      </div>
    );
  }
}

// Missions.propTypes = {
//   headline: PropTypes.string.isRequired,
// };

export default Missions;
