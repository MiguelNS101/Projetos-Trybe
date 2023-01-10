import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

class Form extends Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <div>
        <h2>Form</h2>
        <form onSubmit={ this.handleSubmit }>
          <Input
            testid="name-input"
            type="text"
            name="cardName"
            label="Name: "
            value={ cardName }
            onChange={ onInputChange }
          />

          <Input
            testid="description-input"
            type="textarea"
            name="cardDescription"
            label="Description: "
            value={ cardDescription }
            onChange={ onInputChange }
          />

          <Input
            testid="attr1-input"
            type="number"
            name="cardAttr1"
            label="Atribute 1: "
            value={ cardAttr1 }
            onChange={ onInputChange }
          />

          <Input
            testid="attr2-input"
            type="number"
            name="cardAttr2"
            label="Atribute 2: "
            value={ cardAttr2 }
            onChange={ onInputChange }
          />

          <Input
            testid="attr3-input"
            type="number"
            name="cardAttr3"
            label="Atribute 3: "
            value={ cardAttr3 }
            onChange={ onInputChange }
          />

          <Input
            testid="image-input"
            type="text"
            name="cardImage"
            label="Image: "
            value={ cardImage }
            onChange={ onInputChange }
          />

          <div htmlFor="raridade" id="cardRare" className="cardRare">
            Raridade:
            <select
              name="cardRare"
              value={ cardRare }
              onChange={ onInputChange }
              data-testid="rare-input"
            >
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito Raro</option>
            </select>
          </div>

          <div id="cardTrunfo" className="cardTrunfo">
            {hasTrunfo ? 'Você já tem um Super Trunfo em seu baralho' : (
              <label htmlFor="superTrunfo">
                is Super Trunfo:
                <input
                  data-testid="'trunfo-input'"
                  disabled={ hasTrunfo }
                  type="checkbox"
                  name="cardTrunfo"
                  id="superTrunfo"
                  onChange={ onInputChange }
                  checked={ cardTrunfo }
                />
              </label>
            )}
          </div>
          <div />
          <div id="saveButton" className="saveButton">
            <button
              type="button"
              data-testid="save-button"
              disabled={ isSaveButtonDisabled }
              onClick={ onSaveButtonClick }
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
