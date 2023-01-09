const saveCartItems = (idsList) => localStorage.setItem('cartItems', idsList);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
