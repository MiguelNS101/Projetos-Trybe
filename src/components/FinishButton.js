import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function FinishButton({ recType }) {
  const {
    isAllIngredientsChecked,
    recipeData,
  } = useContext(RecipesContext);
  const DATA_MEAL = {
    id: recipeData.idMeal,
    type: 'Food',
    nationality: recipeData.strArea,
    category: recipeData.strCategory,
    alcoholicOrNot: '',
    name: recipeData.strMeal,
    image: recipeData.strMealThumb,
    doneDate: recipeData.idDrink,
    tags: recipeData.strTags,
  };

  const DATA_DRINK = {
    id: recipeData.idDrink,
    type: 'Drink',
    nationality: '',
    category: recipeData.strCategory,
    alcoholicOrNot: recipeData.strAlcoholic,
    name: recipeData.strDrink,
    image: recipeData.strDrinkThumb,
    doneDate: recipeData.idDrink,
    tags: recipeData.strTags,
  };

  function handleFinish() {
    let foodDataArray = [];
    let data = {};
    if (recType === 'food') {
      data = DATA_MEAL;
    } else if (recType === 'drink') {
      data = DATA_DRINK;
    }
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesList === null) {
      foodDataArray.push(data);
      localStorage.setItem('doneRecipes', JSON.stringify(foodDataArray));
    } else {
      foodDataArray = doneRecipesList;
      foodDataArray.push(data);
      localStorage.setItem('doneRecipes', JSON.stringify(foodDataArray));
    }
  }

  return (
    <div>
      <Link to="/done-recipes">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          className="startButton"
          onClick={ () => handleFinish() }
          disabled={ !isAllIngredientsChecked }
        >
          Finish Recipe
        </button>
      </Link>
    </div>
  );
}

FinishButton.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
}.isRequired;

export default FinishButton;
