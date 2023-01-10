import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import CartLogo from '../Img/shopping-cart.png'; // https://www.iconsdb.com/white-icons/shopping-cart-icon.html

class CartButton extends React.Component {
  render() {
    const { cartSyze } = this.props;
    return (
      <div>
        <Link
          to="/CartPage"
          data-testid="shopping-cart-button"
          className="cart-button-link"
        >
          <img
            className="cart-button-img"
            src={ CartLogo }
            alt=""
            srcSet={ CartLogo }
          />
          <span data-testid="shopping-cart-size">{cartSyze}</span>
        </Link>
      </div>
    );
  }
}

CartButton.propTypes = {
  cartSyze: propTypes.string,
}.isRequired;
export default CartButton;
