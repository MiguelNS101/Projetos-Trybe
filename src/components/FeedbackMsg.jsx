import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class FeedbackMsg extends React.Component {
  render() {
    const { userName, userEmail, userScore, userAssertions } = this.props;
    const hashUserEmail = md5(userEmail).toString();
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) {
      ranking = [];
    }
    const info = { name: userName, score: userScore, picture: `https://www.gravatar.com/avatar/${hashUserEmail}` };
    ranking.push(info);
    localStorage.setItem('ranking', JSON.stringify(ranking));
    const minScore = 3;
    return (
      <div className="feedbackMsg">
        { userAssertions < minScore
          ? <span data-testid="feedback-text">Could be better...</span> : ''}
        { userAssertions >= minScore
          ? <span data-testid="feedback-text">Well Done!</span> : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.player.gravatarEmail,
  userName: state.player.name,
  userScore: state.player.score,
  userAssertions: state.player.assertions,
});

FeedbackMsg.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
  userAssertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedbackMsg);
