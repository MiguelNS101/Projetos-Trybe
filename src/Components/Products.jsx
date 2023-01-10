import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery, addItemsToCart } from '../services/api';
import ProductInfo from './ProductInfo';
import CartButton from './CartButton';
import Category from './Category';

class Products extends Component {
  constructor() {
    super();
    this.state = {
      firstTime: true,
      searchValue: '',
      searchResult: '',
      category: '',
      isSearched: false,
      cartList: [],
    };
    this.loadCart = this.loadCart.bind(this);
  }

  componentDidMount() {
    this.loadCart();
  }

  handleChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  }

  productAdd = (nameOfProduct) => {
    addItemsToCart(nameOfProduct);
    this.loadCart();
  }

  handleClick = async () => {
    const { searchValue, category } = this.state;
    this.setState({
      isSearched: true,
      firstTime: false,
      searchResult: await getProductsFromCategoryAndQuery(category, searchValue),
    });
  }

  handleCategory = (categoryId) => this.setState({
    category: categoryId,
  },
  () => this.handleClick())

  loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({
      cartList: cart,
    });
  }

  render() {
    const { firstTime, searchValue, searchResult, isSearched, cartList } = this.state;
    return (
      <section>
        <header>
          <h1>Front-End Online Store</h1>
          {cartList !== null ? (
            <CartButton cartSyze={ cartList.length } />
          ) : (
            <CartButton cartSyze="0" />
          )}
        </header>
        <section className="search-section">
          <label htmlFor="searchProduct">
            <input
              type="text"
              name="searchProduct"
              value={ searchValue }
              onChange={ this.handleChange }
              data-testid="query-input"
            />
          </label>
          <button
            type="submit"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Pesquisar

          </button>
        </section>
        {firstTime && (
          <p data-testid="home-initial-message" className="noSearchMsg">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        <main>
          <Category
            getCategory={ this.handleCategory }
          />
          <div className="listProducts">
            { isSearched ? searchResult.results.map((product) => (
              <ProductInfo
                title={ product.title }
                picture={ product.thumbnail }
                price={ product.price }
                id={ product.id }
                productAdd={ this.productAdd }
                productQty={ product.available_quantity }
                key={ product.id }
                freeShipping={ product.shipping.free_shipping }
              />)) : null }
          </div>
        </main>
      </section>
    );
  }
}

export default Products;
