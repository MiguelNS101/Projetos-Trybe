import React from 'react';
import propTypes from 'prop-types';
import { getProductsById, addItemsToCart } from '../services/api';
import CartButton from './CartButton';
import ComentarySection from './ComentarySection';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      productInfo: [],
      cartList: [],
    };
    this.loadCart = this.loadCart.bind(this);
    this.loadComments = this.loadComments.bind(this);
  }

  componentDidMount() {
    this.loadProductInfo();
    this.loadCart();
    this.loadComments();
  }

  productAdd = (nameOfProduct) => {
    addItemsToCart(nameOfProduct);
    this.loadCart();
  };

  handleClick = () => {
    const { productInfo } = this.state;
    this.productAdd({
      name: productInfo.title,
      qty: 1,
      preco: productInfo.price,
    });
  };

  loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({
      cartList: cart,
    });
  }

  async loadComments() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const coments = await JSON.parse(localStorage.getItem(id));
    this.setState({
      comentList: coments,
    });
  }

  async loadProductInfo() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const prodInfo = await getProductsById(id);
    this.setState({ productInfo: prodInfo });
  }

  render() {
    const { productInfo, cartList, comentList } = this.state;
    return (
      <>
        <header>
          <h1>Front-End Online Store</h1>
          {cartList !== null ? (
            <CartButton cartSyze={ cartList.length } />
          ) : (
            <CartButton cartSyze="0" />
          )}
        </header>
        <div className="prodPageCard">
          <img src={ productInfo.thumbnail } alt={ productInfo.title } />
          <div className="prodPageInfo">
            <h2 data-testid="product-detail-name">{productInfo.title}</h2>
            <h4>{`R$ ${productInfo.price}`}</h4>
            <button
              type="submit"
              data-testid="product-detail-add-to-cart"
              onClick={ this.handleClick }
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
        <ComentarySection id={ productInfo.id } loadFunc={ this.loadComments } />
        <div className="comentSectionCard">
          {comentList !== undefined && comentList !== null ? (
            comentList.map((product, i) => (
              <div key={ i } className="comentCard">
                <p className="comentName">{product.email}</p>
                <p className="comentDesc">{product.description}</p>
                <p className="comentRating">{`${product.star}/5`}</p>
              </div>
            ))
          ) : (
            <p>Produto nao avaliado</p>
          )}
        </div>
      </>
    );
  }
}
ProductPage.propTypes = {
  productId: propTypes.string,
}.isRequired;
export default ProductPage;
