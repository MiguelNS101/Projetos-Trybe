import React from 'react';
import propTypes from 'prop-types';
import { saveComentStorage } from '../services/api';

class ComentarySection extends React.Component {
  constructor() {
    super();
    this.state = {
      starRating: [],
      emailValue: '',
      descValue: '',
      starValue: 0,
    //   buttonIsDisable: true,
    };
    this.saveComentay = this.saveComentay.bind(this);
  }

  componentDidMount() {
    this.loadStarRating();
  }

  handleChange = (event) => {
    if (event.target.name === 'email') {
      this.setState({
        emailValue: event.target.value,
      });
    } else if (event.target.name === 'Avaliacao') {
      this.setState({
        descValue: event.target.value,
      });
    }
  }

  setRatingNum(num) {
    this.setState({ starValue: num });
  }

  saveComentay() {
    const { id, loadFunc } = this.props;
    const { emailValue, descValue, starValue } = this.state;
    saveComentStorage(id, emailValue, descValue, starValue);
    loadFunc();
  }

  async loadStarRating() {
    const maxRating = 5;
    const ratingNumList = [];
    for (let index = 1; index <= maxRating; index += 1) {
      ratingNumList.push(index);
    }
    this.setState({ starRating: ratingNumList });
  }

  render() {
    const { starRating, emailValue, descValue } = this.state;
    return (
      <div className="comentaryCard">
        <h3>Deixe seu comentario:</h3>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              data-testid="product-detail-email"
              value={ emailValue }
              onChange={ this.handleChange }
            />
          </label>
          <p>Deixe sua nota:</p>
          {starRating.map((rating) => (
            <label htmlFor={ rating } key={ rating }>
              { rating }
              <input
                data-testid={ `${rating}-rating` }
                type="radio"
                name="rating"
                id={ rating }
                onChange={ () => this.setRatingNum(rating) }
              />
            </label>
          ))}
        </div>
        <div>
          <p>Deixe sua avaliacao:</p>
          <label htmlFor="Avaliacao">
            <input
              type="text"
              name="Avaliacao"
              data-testid="product-detail-evaluation"
              value={ descValue }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="submit-review-btn"
          //   disabled={ buttonIsDisable }
          onClick={ this.saveComentay }
        >
          Publicar
        </button>
      </div>
    );
  }
}

ComentarySection.propTypes = {
  id: propTypes.string,
}.isRequired;

export default ComentarySection;
