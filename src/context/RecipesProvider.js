import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import {
  fetchSearchFood,
  fetchSearchDrink,
} from '../services/FetchSearchs';

function RecipesProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [dataFood, setDataFood] = useState([]);
  const [dataDrink, setDataDrink] = useState([]);
  const [recipeData, setRecipeData] = useState([]);
  const [filteredIngredient, setFilteredIngredient] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [recipeDoneState, setRecipeDoneState] = useState(false);
  const [recipeProgressState, setRecipeProgressState] = useState(false);
  const [initialFood, setInitialFood] = useState([]);
  const [initialDrink, setInitialDrink] = useState([]);
  const [filterNationalitie, setFilterNationalitie] = useState([]);
  const [isAllIngredientsChecked, setIsAllIngredientsChecked] = useState(false);

  async function searchRecipes(nameHistory, endpoint) {
    if (nameHistory === '/foods') {
      const foods = await fetchSearchFood(endpoint);
      if (foods === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else {
        setDataFood(foods);
      }
    }
    if (nameHistory === '/drinks') {
      const drinks = await fetchSearchDrink(endpoint);
      if (drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else {
        setDataDrink(drinks);
      }
    }
  }

  useEffect(() => {
    searchRecipes('/foods', 'search.php?s=');
  }, []);

  useEffect(() => {
    searchRecipes('/drinks', 'search.php?s=');
  }, []);

  const mainState = {
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    dataFood,
    setDataFood,
    dataDrink,
    setDataDrink,
    searchRecipes,
    recipeData,
    setRecipeData,
    filteredIngredient,
    setFilteredIngredient,
    isCopied,
    setIsCopied,
    isFav,
    setIsFav,
    recipeDoneState,
    setRecipeDoneState,
    recipeProgressState,
    setRecipeProgressState,
    initialFood,
    setInitialFood,
    initialDrink,
    setInitialDrink,
    filterNationalitie,
    setFilterNationalitie,
    isAllIngredientsChecked,
    setIsAllIngredientsChecked,
  };

  return (
    <RecipesContext.Provider value={ mainState }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
}.isRequired;

export default RecipesProvider;
