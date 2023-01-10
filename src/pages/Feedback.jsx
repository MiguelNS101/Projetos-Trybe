import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FeedbackMsg from '../components/FeedbackMsg';

class Feedback extends React.Component {
  render() {
    const { userScore, userAssertions } = this.props;
    return (
      <div>
        <Header />
        <article className="feedCard">
          <FeedbackMsg />
          <div className="asScore">
            <div className="asserScore">
              <p>Score:</p>
              <p data-testid="feedback-total-score">{ userScore }</p>
            </div>
            <div className="asserScore">
              <p>Acertos:</p>
              <p data-testid="feedback-total-question">{ userAssertions }</p>
            </div>
          </div>
          <Link to="/">
            <button data-testid="btn-play-again" type="button">Play Again</button>
          </Link>
          <Link to="/Ranking">
            <button data-testid="btn-ranking" type="button">Ranking</button>
          </Link>
        </article>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userAssertions: state.player.assertions,
    userScore: state.player.score,
  };
}

Feedback.propTypes = {
  userAssertions: PropTypes.string,
  userScore: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
