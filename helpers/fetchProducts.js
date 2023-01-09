// const fetch = require('node-fetch');

const fetchProducts = async (searchValue) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${searchValue}`;
  try {
    const respJson = await fetch(url);
    const productList = await respJson.json();
    return productList;
  } catch (error) {
    return error.message;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
