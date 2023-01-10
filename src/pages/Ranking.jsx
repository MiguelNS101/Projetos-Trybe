import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rankList: JSON.parse(localStorage.getItem('ranking')),
    };
  }

  render() {
    const { rankList } = this.state;
    const magicNumber = -1;
    let sortedList;
    if (rankList !== null && rankList !== undefined) {
      sortedList = rankList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return magicNumber;
        }
        return 0;
      });
    }

    return (
      <article className="rankingPage">
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankList !== null ? (
          sortedList.map((userData, index) => (
            <div key={ `${userData.name}_${userData.score}` } className="rankingUser">
              <img src={ userData.picture } alt={ userData.name } />
              <p>Name:</p>
              <p data-testid={ `player-name-${index}` }>{userData.name}</p>
              <p>Score:</p>
              <p data-testid={ `player-score-${index}` }>{userData.score}</p>
            </div>
          ))
        ) : (
          <p>Ranking Vazio</p>
        )}
        <Link to="/">
          <input data-testid="btn-go-home" type="button" value="Jogar" />
        </Link>
      </article>
    );
  }
}

export default connect(null, null)(Feedback);
