import React from 'react';

class InfoCheckout extends React.Component {
  render() {
    return (
      <div className="InfoCheckoutCard">
        <label htmlFor="checkoutfullname">
          Full Name:
          <input
            type="text"
            name="checkoutfullname"
            data-testid="checkout-fullname"
          />
        </label>
        <label htmlFor="checkoutemail">
          Email:
          <input
            type="text"
            name="checkoutemail"
            data-testid="checkout-email"
          />
        </label>
        <label htmlFor="checkoutcpf">
          CPF:
          <input
            type="text"
            name="checkoutcpf"
            data-testid="checkout-cpf"
          />
        </label>
        <label htmlFor="checkoutphone">
          Phone Number:
          <input
            type="text"
            name="checkoutphone"
            data-testid="checkout-phone"
          />
        </label>
        <label htmlFor="checkoutcep">
          CEP:
          <input
            type="text"
            name="checkoutcep"
            data-testid="checkout-cep"
          />
        </label>
        <label htmlFor="checkoutaddress">
          Adress:
          <input
            type="text"
            name="checkoutaddress"
            data-testid="checkout-address"
          />
        </label>
        <button type="button"> Checkout </button>
      </div>
    );
  }
}

export default InfoCheckout;
