import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function IngredientsInProgress({ idMeal, recType }) {
  const {
    recipeData,
    filteredIngredient,
    setFilteredIngredient,
    setIsAllIngredientsChecked,
  } = useContext(RecipesContext);
  const defaultObj = {
    cocktails: {
    },
    meals: {
    },
  };

  function handleCheck(ingredients) {
    const inProg = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProg !== null && inProg !== '' && inProg[recType][idMeal] !== undefined) {
      return inProg[recType][idMeal].includes(ingredients);
    }
  }

  function removeItemOnce(arr, value) {
    const MINUS_ONE = -1;
    const index = arr.indexOf(value);
    if (index > MINUS_ONE) {
      arr.splice(index, 1);
    }
    return arr;
  }

  function handleAddIng(ingredientsList) {
    const inProg = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mealsStorage = inProg.meals;
    const drinkStorage = inProg.cocktails;
    const changed = inProg[recType];
    changed[idMeal] = ingredientsList;
    let obj;
    if (recType === 'meals') {
      obj = {
        cocktails: drinkStorage,
        meals: changed,
      };
    } else if (recType === 'cocktails') {
      obj = {
        cocktails: changed,
        meals: mealsStorage,
      };
    }
    return obj;
  }

  function handleClickCheck(isChecked, ingredients) {
    let inProg = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProg === null || inProg === '' || inProg === undefined) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(defaultObj));
    }
    inProg = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProg !== null && inProg !== '') {
      const mealsStorage = inProg.meals;
      const drinkStorage = inProg.cocktails;
      const obj = {
        cocktails: drinkStorage,
        meals: mealsStorage,
      };
      let ingList = obj[recType][idMeal];
      if (isChecked === true && ingList !== undefined) {
        ingList.push(ingredients);
      } else if (isChecked === true && ingList === undefined) {
        ingList = [];
        ingList.push(ingredients);
      } else {
        removeItemOnce(ingList, ingredients);
      }

      const resp = handleAddIng(ingList);
      localStorage.setItem('inProgressRecipes', JSON.stringify(resp));
    }
    inProg = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const indexRec = filteredIngredient.length;
    const indexRecDone = inProg[recType][idMeal].length;
    if (indexRec === indexRecDone) {
      setIsAllIngredientsChecked(true);
    }
  }

  useEffect(() => {
    function handleIngredients() {
      const ingredients = Object.entries(recipeData).filter(
        (data) => (data[0].includes('strIngredient')),
      );
      const measures = Object.entries(recipeData).filter(
        (data) => (data[0].includes('strMeasure')),
      );
      const resp = [];
      ingredients.forEach((data, index) => {
        if (data[1] !== '' && data[1] !== null) {
          resp.push([data[1], measures[index][1]]);
        }
      });
      setFilteredIngredient(resp);
    }

    handleIngredients();
  }, [recipeData, setFilteredIngredient]);

  return (
    <ul>
      {filteredIngredient.map((data, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            type="checkbox"
            id={ `${data[0]} - ${data[1]}` }
            name={ `${data[0]} - ${data[1]}` }
            className="checkIngredients"
            checked={ handleCheck(`${data[0]} - ${data[1]}`) }
            onChange={
              (e) => handleClickCheck(e.target.checked, `${data[0]} - ${data[1]}`)
            }
          />
          <label
            htmlFor={ `${data[0]} - ${data[1]}` }
            className="checkIngredientsLabel"
          >
            { `${data[0]} - ${data[1]}` }
          </label>
        </li>
      ))}
    </ul>
  );
}

IngredientsInProgress.propTypes = {
  index: PropTypes.string,
}.isRequired;

export default IngredientsInProgress;
