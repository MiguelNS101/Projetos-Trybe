export async function getCategories() {
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const productsFromCategory = fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
  return productsFromCategory;
}

export async function getProductsById(productId) {
  const productsInfo = fetch(`https://api.mercadolibre.com/items/${productId}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
  return productsInfo;
}

export async function addItemsToCart(productObject) {
  if (localStorage.getItem('cart') === null) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  const lastSavedCart = JSON.parse(localStorage.getItem('cart'));
  localStorage.setItem('cart', JSON.stringify([...lastSavedCart, productObject]));
}

export async function saveComentStorage(id, emailValue, descValue, starValue) {
  const comentObject = {
    prodId: id,
    email: emailValue,
    description: descValue,
    star: starValue,
  };
  if (localStorage.getItem(id) === null) {
    localStorage.setItem(id, JSON.stringify([]));
  }
  const lastSavedCart = JSON.parse(localStorage.getItem(id));
  localStorage.setItem(id, JSON.stringify([...lastSavedCart, comentObject]));
}
