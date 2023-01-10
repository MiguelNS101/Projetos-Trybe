import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userName, userEmail, userScore } = this.props;
    const hashUserEmail = md5(userEmail).toString();

    return (
      <div>
        <header>
          <div className="userData">
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${hashUserEmail}` }
              alt={ userName }
            />
            <p data-testid="header-player-name">{userName}</p>
          </div>
          <div className="userScore">
            <p>Score:</p>
            <p data-testid="header-score">{userScore}</p>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.player.gravatarEmail,
  userName: state.player.name,
  userScore: state.player.score,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
