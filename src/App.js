import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cardList: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkSaveButton = this.checkSaveButton.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.cleanInputs = this.cleanInputs.bind(this);
    this.checkTrunfo = this.checkTrunfo.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  // Event handler generico
  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(({ [name]: value }), () => {
      // checar se o botao pode ser habilitado
      if (this.checkSaveButton() === true) {
        this.setState({ isSaveButtonDisabled: false });
      } else {
        this.setState({ isSaveButtonDisabled: true });
      }

      this.checkTrunfo();
    });
  }

  // Event handler para salvar a carta
  handleSave() {
    const {
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
      cardList,
    } = this.state;
    const cardInfo = {
      Name: cardName,
      Image: cardImage,
      Description: cardDescription,
      CardAtr1: cardAttr1,
      CardAtr2: cardAttr2,
      CardAtr3: cardAttr3,
      Rarity: cardRare,
      IsTrunfo: cardTrunfo,
    };
    cardList.push(cardInfo);
    this.cleanInputs();
  }

  // Checa se todas as regras para habilitar o botao foram cumpridas
  checkSaveButton() {
    const {
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const atrMax = 90;
    const atrMin = 0;
    const atrTotalMax = 210;
    const n1 = Number(cardAttr1);
    const n2 = Number(cardAttr2);
    const n3 = Number(cardAttr3);
    let resp = false;
    let inputCheck = false;
    let atrCheck = false;

    if (cardName !== '' && cardImage !== '' && cardDescription !== '') {
      inputCheck = true;
    }

    if (
      n1 <= atrMax
      && n2 <= atrMax
      && n3 <= atrMax
      && n1 >= atrMin
      && n2 >= atrMin
      && n3 >= atrMin
      && (n1 + n2 + n3) <= atrTotalMax
    ) {
      atrCheck = true;
    }

    if (inputCheck === true && atrCheck === true) {
      resp = true;
    }
    return resp;
  }

  // limpa os campos do formulario
  cleanInputs() {
    this.setState({
      cardName: '',
      cardImage: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });

    this.checkTrunfo();
  }

  // Checar se existe uma carta Super Trunfo na lista de cartas
  checkTrunfo() {
    const {
      cardList,
    } = this.state;
    let resp = false;
    const found = cardList.find((card) => card.IsTrunfo === true);
    if (found !== undefined) {
      resp = true;
    }
    if (resp === true) {
      this.setState({ hasTrunfo: true });
    } else {
      this.setState({ hasTrunfo: false });
    }
  }

  // Deleta carta da lista
  deleteCard(cardName) {
    const {
      cardList,
    } = this.state;
    const removeCard = cardList.findIndex((card) => card.Name === cardName);
    cardList.splice(removeCard, 1);
    this.setState(({
      cardList,
    }));

    this.checkTrunfo();
  }

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
      cardList,
    } = this.state;

    return (
      <div>
        <header>
          <h1>Tryunfo</h1>
        </header>
        <section>
          <main>
            <Form
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              hasTrunfo={ hasTrunfo }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onInputChange={ this.handleChange }
              onSaveButtonClick={ this.handleSave }
            />
          </main>
          <aside>
            <h2>Pre-Visualizacao</h2>
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
          </aside>
        </section>
        <h3>Todas as cartas</h3>
        <section id="allCards" className="allCards">
          {cardList.map((card) => (
            <div key={ card.cardName }>
              <Card
                cardName={ card.Name }
                cardDescription={ card.Description }
                cardAttr1={ card.CardAtr1 }
                cardAttr2={ card.CardAtr2 }
                cardAttr3={ card.CardAtr3 }
                cardImage={ card.Image }
                cardRare={ card.Rarity }
                cardTrunfo={ card.IsTrunfo }
              />
              <button
                data-testid="delete-button"
                type="button"
                className="delButton"
                onClick={ () => this.deleteCard(card.Name) }
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      </div>
    );
  }
}
export default App;
