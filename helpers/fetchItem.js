// const fetch = require('node-fetch');

const fetchItem = async (productId) => {
  const url = `https://api.mercadolibre.com/items/${productId}`;
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
    fetchItem,
  };
}
