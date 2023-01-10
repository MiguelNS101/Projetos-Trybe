const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/';
const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';
const URL_FOOD_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const URL_DRINK_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const fetchSearchFood = async (endpoint) => {
  const requestFood = await fetch(`${URL_FOOD}${endpoint}`);
  const requestFoodJSON = await requestFood.json();
  return requestFoodJSON.meals;
};

export const fetchSearchDrink = async (endpoint) => {
  const requestDrink = await fetch(`${URL_DRINK}${endpoint}`);
  const requestDrinkJSON = await requestDrink.json();
  return requestDrinkJSON.drinks;
};

export const fetchDetailFood = async (endpoint) => {
  const requestFood = await fetch(`${URL_FOOD_DETAILS}${endpoint}`);
  const requestFoodJSON = await requestFood.json();
  return requestFoodJSON.meals[0];
};

export const fetchDetailDrink = async (endpoint) => {
  const requestDrink = await fetch(`${URL_DRINK_DETAILS}${endpoint}`);
  const requestDrinkJSON = await requestDrink.json();
  return requestDrinkJSON.drinks[0];
};

export const copyUrl = (typeDrink, pathname) => {
  const LENGTHDRINKS = 14;
  const LENGTHFOODS = 12;
  const URL = typeDrink ? `http://localhost:3000${pathname.substr(0, LENGTHDRINKS)}`
    : `http://localhost:3000${pathname.substr(0, LENGTHFOODS)}`;
  return URL;
};
