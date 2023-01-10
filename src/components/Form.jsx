import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletDataApi, addInfo } from '../actions';

const ALIMENTACAO = 'Alimentação';
class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      valor: '',
      desc: '',
      moeda: 'USD',
      payMetod: 'Dinheiro',
      tag: ALIMENTACAO,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
  }

  componentDidMount() {
    const { apiData } = this.props;
    apiData();
  }

  handleChange(target) {
    this.setState({ [target.name]: target.value });
  }

  handleAddButton(dispesaInfo) {
    const { handleAddInfo, apiData } = this.props;
    apiData();
    handleAddInfo(dispesaInfo);
    this.setState((prevState) => ({ id: prevState.id + 1 }));
    this.setState({
      valor: '',
      desc: '',
      moeda: 'USD',
      payMetod: 'Dinheiro',
      tag: ALIMENTACAO,
    });
  }

  render() {
    const { walletData, isFetching } = this.props;
    const optionCurrency = Object.keys(walletData.currencies).filter(
      (code) => code !== 'USDT',
    );
    const { valor, desc, moeda, payMetod, tag, id } = this.state;
    const dispesaInfo = {
      id,
      value: valor,
      currency: moeda,
      method: payMetod,
      tag,
      description: desc,
      exchangeRates: walletData.currencies,
    };
    return (
      <article>
        {isFetching && <h1>LOADING</h1>}
        <form>
          <label htmlFor="valor">
            Valor:
            <input
              type="text"
              name="valor"
              data-testid="value-input"
              value={ valor }
              onChange={ ({ target }) => this.handleChange(target) }
            />
          </label>

          <label htmlFor="desc">
            Descricao::
            <input
              type="text"
              name="desc"
              data-testid="description-input"
              value={ desc }
              onChange={ ({ target }) => this.handleChange(target) }
            />
          </label>

          <label htmlFor="currency-input">
            Moeda:
            <select
              name="moeda"
              value={ moeda }
              onChange={ ({ target }) => this.handleChange(target) }
              data-testid="currency-input"
              id="currency-input"
            >
              {optionCurrency > 0 ? (
                <option value="car">Carregando</option>
              ) : (
                optionCurrency.map((name) => (
                  <option data-testid={ name } key={ name }>
                    {name}
                  </option>
                ))
              )}
            </select>
          </label>

          <label htmlFor="method-input">
            Metodo de pagamento:
            <select
              name="payMetod"
              value={ payMetod }
              onChange={ ({ target }) => this.handleChange(target) }
              data-testid="method-input"
              id="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Tag:
            <select
              name="tag"
              value={ tag }
              onChange={ ({ target }) => this.handleChange(target) }
              data-testid="tag-input"
              id="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button
            onClick={ () => this.handleAddButton(dispesaInfo) }
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
      </article>
    );
  }
}

const mapStateToProps = (state) => ({
  walletData: state.wallet,
  isFetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  apiData: (data) => dispatch(walletDataApi(data)),
  handleAddInfo: (dispesaInfo) => dispatch(addInfo(dispesaInfo)),
});

Form.propTypes = {
  apiData: PropTypes.func.isRequired,
  handleAddInfo: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  walletData: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
