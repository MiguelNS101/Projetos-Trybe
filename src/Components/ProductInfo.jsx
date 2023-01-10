import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class ProductInfo extends React.Component {
  handleClick = () => {
    const { title, productAdd, price } = this.props;
    productAdd({
      name: title,
      qty: 1,
      preco: price,
    });
  };

  render() {
    const { title, price, picture, id, freeShipping } = this.props;
    return (
      <div className="productInfo-div">
        <Link
          to={ `/ProductPage/${id}` }
          data-testid="product-detail-link"
          key={ id }
        >
          <div data-testid="product" className="productInfo">
            <h2>{title}</h2>
            <img src={ picture } alt={ title } />
            <h4>{price}</h4>
            {freeShipping ? (
              <span data-testid="free-shipping">Frete Gratis</span>
            ) : (
              ''
            )}
          </div>
        </Link>
        <button
          type="submit"
          data-testid="product-add-to-cart"
          onClick={ this.handleClick }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductInfo.propTypes = {
  title: propTypes.string,
  price: propTypes.string,
  picture: propTypes.string,
  id: propTypes.string,
}.isRequired;
export default ProductInfo;
