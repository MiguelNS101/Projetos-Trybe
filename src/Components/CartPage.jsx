import React from 'react';
import { Link } from 'react-router-dom';

class CardPage extends React.Component {
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

  removeCartItem = (item) => {
    const { cartList } = this.state;
    const filtered = cartList.filter((product) => product.name !== item.name);
    this.setState((prevState) => ({
      cartList: filtered,
      finalPrice: prevState.finalPrice - item.preco,
    }));
    localStorage.setItem('cart', JSON.stringify(filtered));
  }

  updateCart = (item, opr) => {
    const { cartList } = this.state;
    const final = cartList;
    if (opr === '+') {
      final[cartList.findIndex((obj) => obj.name === item.name)].qty += 1;
      this.setState((prevState) => ({
        cartList: final,
        finalPrice: prevState.finalPrice + item.preco,
      }));
    } else if (final[cartList.findIndex((obj) => obj.name === item.name)].qty > 1) {
      final[cartList.findIndex((obj) => obj.name === item.name)].qty -= 1;
      this.setState((prevState) => ({
        cartList: final,
        finalPrice: prevState.finalPrice - item.preco,
      }));
    }
    localStorage.setItem('cart', JSON.stringify(final));
  }

  render() {
    const { finalPrice, cartList } = this.state;
    // const cartList = JSON.parse(localStorage.getItem('cart'));
    return (
      <div>
        {cartList !== null ? cartList.map((product, i) => (
          <div key={ i }>
            <p data-testid="shopping-cart-product-name">{`${product.name}`}</p>
            <button
              onClick={ () => this.updateCart(product, '-') }
              data-testid="product-decrease-quantity"
              type="button"
            >
              -

            </button>
            <p data-testid="shopping-cart-product-quantity">
              {product.qty}
            </p>
            <p>{product.preco}</p>
            <button
              onClick={ () => this.updateCart(product, '+') }
              data-testid="product-increase-quantity"
              type="button"
            >
              +

            </button>
            <button
              onClick={ () => this.removeCartItem(product) }
              type="button"
            >
              X

            </button>
            <div>
              <span>{finalPrice}</span>
            </div>
            <Link
              to="/Checkout"
              data-testid="checkout-products"
              className="cart-button-link"
              cart={ cartList }
            >
              <button type="button"> Checkout </button>
            </Link>
          </div>))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </div>
    );
  }
}

export default CardPage;
