import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeItem } from '../actions';

class Table extends React.Component {
  deleteButton(id) {
    const { deleteItem } = this.props;
    deleteItem(id);
  }

  render() {
    const { walletData } = this.props;
    const expenList = walletData.expenses;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenList.length === 0 ? (
              <tr>
                <td>VAZIO...</td>
              </tr>
            ) : (
              expenList.map((expenc) => {
                const {
                  value,
                  currency,
                  method,
                  tag,
                  description,
                  id,
                  exchangeRates,
                } = expenc;
                return (
                  <tr key={ id }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{Number(value).toFixed(2)}</td>
                    <td>{exchangeRates[currency].name}</td>
                    <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                    <td>{(exchangeRates[currency].ask * value).toFixed(2)}</td>
                    <td>Real</td>
                    <td>
                      <button
                        onClick={ () => this.deleteButton({ id }) }
                        type="button"
                        data-testid="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(removeItem(id)),
});

const mapStateToProps = (state) => ({
  walletData: state.wallet,
});

Table.propTypes = {
  walletData: PropTypes.shape({ expenses: PropTypes.arrayOf().isRequired })
    .isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
