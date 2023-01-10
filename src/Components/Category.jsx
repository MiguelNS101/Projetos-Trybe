import React, { Component } from 'react';
import propTypes from 'prop-types';
import * as api from '../services/api';

class Category extends Component {
  constructor() {
    super();
    this.state = {
      categoryList: [],
    };
    this.getCateg = this.getCateg.bind(this);
    // this.getProductsByCategory = this.getProductsByCategory.bind(this);
  }

  async componentDidMount() {
    this.getCateg();
    // this.getProductsByCategory();
  }

  async getCateg() {
    const category = await api.getCategories();
    this.setState({
      categoryList: category,
    });
  }

  // async getProductsByCategory(category) {
  //   console.log(category);
  //   const ProductsByCategory = await api.getProductsFromCategoryAndQuery(category, '');
  //   return console.log(ProductsByCategory);
  // }

  render() {
    const { categoryList } = this.state;
    const { getCategory } = this.props;
    return (
      <section className="categoryList">
        {categoryList.map((category) => (
          <label htmlFor={ category.id } key={ category.id }>
            { category.name }
            <input
              data-testid="category"
              type="radio"
              name="category"
              id={ category.id }
              onChange={ () => getCategory(category.id) }
              // checked={ this.checkFavorite(album.trackId) }
            />
          </label>
        ))}
      </section>
    );
  }
}

Category.propTypes = {
  getCategory: propTypes.func,
}.isRequired;

export default Category;
