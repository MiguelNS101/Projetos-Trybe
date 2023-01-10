import React from 'react';
import propTypes from 'prop-types';
import InfoCheckout from './InfoCheckout';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      finalPrice: 0,
      cartList: JSON.parse(localStorage.getItem('cart')),
    };
  }

  componentDidMount() {
    this.handlePrice();
  }

  handlePrice = () => {
    const { cartList } = this.state;
    if (cartList !== null) {
      cartList.forEach((item) => {
        this.setState((prevState) => ({
          finalPrice: prevState.finalPrice + item.preco,
        }));
      });
    }
  }

  render() {
    const { cartList, finalPrice } = this.state;
    return (
      <div>
        {cartList !== null ? cartList.map((product, i) => (
          <div key={ i } className="InfoCheckout">
            <p data-testid="shopping-cart-product-name">{`${product.name}`}</p>
            <p data-testid="shopping-cart-product-quantity">
              {product.qty}
            </p>
            <p>{product.preco}</p>
          </div>))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <div>
          <h3>{finalPrice}</h3>
        </div>
        <InfoCheckout />
      </div>
    );
  }
}

Checkout.propTypes = {
  cart: propTypes.string,
}.isRequired;
export default Checkout;
