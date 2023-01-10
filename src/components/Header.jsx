import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  calculateTotal = (expenses) => {
    const resp = expenses
      .reduce((totalSum, dataObj) => {
        const { value, currency, exchangeRates } = dataObj;
        const exchangeValue = exchangeRates[currency];
        return (totalSum + value * exchangeValue.ask);
      }, 0).toFixed(2);
    return resp;
  };

  render() {
    const { userEmail, walletData } = this.props;
    const totalValue = this.calculateTotal(walletData.expenses);
    return (
      <header>
        <h1>Trybe Wallet</h1>
        <div className="infoHeaderDiv">
          <p data-testid="email-field">{userEmail.email}</p>
          <div className="moneyDiv">
            <span data-testid="total-field">{totalValue}</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user,
  walletData: state.wallet,
});

Header.propTypes = {
  userEmail: PropTypes.objectOf(PropTypes.string).isRequired,
  walletData: PropTypes.shape({ expenses: PropTypes.arrayOf().isRequired })
    .isRequired,
};

export default connect(mapStateToProps)(Header);
