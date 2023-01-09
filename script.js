// const { fetchProducts } = require("./helpers/fetchProducts");
const cartItensClass = '.cart__items';
let idsLocalStorage = [];

function getSavedCartItemsOnArray() {
  const cartItensIds = getSavedCartItems();
  if (cartItensIds !== null && cartItensIds !== undefined && cartItensIds !== '') {
    return cartItensIds.split(',');
  }
}

if (getSavedCartItemsOnArray() === null && getSavedCartItemsOnArray() === undefined) {
  idsLocalStorage = [];
} else {
  idsLocalStorage = getSavedCartItemsOnArray();
}

async function getProductList() {
  const productList = await fetchProducts('computador');
  return productList.results;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

async function getProductbyId(prodId) {
  const product = await fetchItem(prodId);
  const details = {
    sku: product.id,
    name: product.title,
    salePrice: product.price,
    image: product.thumbnail,
  };
  return details;
}

function removeIdFromList(prodId) {
  const index = idsLocalStorage.indexOf(prodId);
  if (index > -1) {
    idsLocalStorage.splice(index, 1);
  }
  saveCartItems(idsLocalStorage);
}

function addIdToList(prodId) {
  idsLocalStorage.push(prodId);
  saveCartItems(idsLocalStorage);
}

function modCartPrice(sum) {
  const cartPriceSection = document.querySelector('.total-price');
  cartPriceSection.innerText = sum; // `R$: ${sum.toFixed(2)}`;
}

async function sumCartItens() {
  let sum = 0;
  if (idsLocalStorage === []) {
    modCartPrice(sum);
  } else {
    idsLocalStorage.forEach(async (element, index) => {
      const proInfo = await getProductbyId(idsLocalStorage[index]);
      sum += proInfo.salePrice;
      modCartPrice(sum);
    });
  }
}

async function cartItemClickListener(li, prodId) {
  const cartSection = document.querySelector(cartItensClass);
  await cartSection.removeChild(li);
  removeIdFromList(prodId);
  if (idsLocalStorage.length === 0) {
    modCartPrice(0);
  } else {
    sumCartItens();
  }
}

function imageOnHover(li, imageSource) {
  const img = document.createElement('img');
  img.id = 'cart_item_image';
  img.src = imageSource;
  li.appendChild(img);
}

function DelimageOnHover(li) {
  const img = document.querySelector('#cart_item_image');
  li.removeChild(img);
}

function createCartItemElement(details) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${details.sku} | NAME: ${details.name} | PRICE: $${details.salePrice}`;
  li.addEventListener('click', () => cartItemClickListener(li, details.sku));
  li.addEventListener('mouseenter', () => imageOnHover(li, details.image));
  li.addEventListener('mouseleave', () => DelimageOnHover(li));
  return li;
}

async function buttonItemClickListener(prodId) {
  const cartSection = document.querySelector(cartItensClass);
  const choosedProduct = await getProductbyId(prodId);
  const details = await createCartItemElement(choosedProduct);
  await cartSection.appendChild(details);
  addIdToList(prodId);
  sumCartItens();
}

async function cartItemCreator(prodId) {
  const cartSection = document.querySelector(cartItensClass);
  const choosedProduct = await getProductbyId(prodId);
  const details = await createCartItemElement(choosedProduct);
  await cartSection.appendChild(details);
  sumCartItens();
}

function createCustomButtonElement(element, className, innerText, prodId) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  e.addEventListener('click', () => buttonItemClickListener(prodId));
  return e;
}

function createProductItemElement(prodDet) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', prodDet.sku));
  section.appendChild(createCustomElement('span', 'item__title', prodDet.name));
  section.appendChild(createProductImageElement(prodDet.image));
  section.appendChild(
    createCustomButtonElement('button', 'item__add', 'Adicionar ao carrinho!', prodDet.sku),
  );
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

async function getProductDetails(index) {
  const itenList = await getProductList();
  return {
    sku: itenList[index].id,
    name: itenList[index].title,
    salePrice: itenList[index].price,
    image: itenList[index].thumbnail,
  };
}

function removeLoading() {
  const cartSection = document.querySelector('.loading');
  cartSection.remove();
}

async function createProductsList(productList) {
  removeLoading();
  productList.forEach(async (element, index) => {
    const itemsSection = document.querySelector('.items');
    const productDetails = await getProductDetails(index);
    const details = await createProductItemElement(productDetails);
    await itemsSection.appendChild(details);
  });
}

function emptyCartButton() {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    const cartItens = document.querySelector(cartItensClass);
    cartItens.innerHTML = '';
    idsLocalStorage = [];
    modCartPrice(0);
    saveCartItems(idsLocalStorage);
  });
}

function loadSavedCartItens() {
  const cart = getSavedCartItemsOnArray();
  cart.forEach((element, index) => {
    cartItemCreator(cart[index]);
  });
}

function getResp() {
  if (getSavedCartItemsOnArray() !== null && getSavedCartItemsOnArray() !== undefined) {
    return true;
  }
}

window.onload = async () => {
  const productList = await getProductList();
  emptyCartButton();
  createProductsList(productList);
  if (getResp() === true) {
    loadSavedCartItens();
  } else {
    idsLocalStorage = [];
  }
};
