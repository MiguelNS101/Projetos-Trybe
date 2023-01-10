import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function Ingredients() {
  const {
    recipeData,
    filteredIngredient,
    setFilteredIngredient,
  } = useContext(RecipesContext);

  useEffect(() => {
    function handleIngredients() {
      const ingredients = Object.entries(recipeData).filter(
        (data) => (data[0].includes('strIngredient')),
      );
      const measures = Object.entries(recipeData).filter(
        (data) => (data[0].includes('strMeasure')),
      );
      const entriesArray = [];
      ingredients.forEach((data, index) => {
        if (data[1] !== '' && data[1] !== null) {
          entriesArray.push([data[1], measures[index][1]]);
        }
      });
      setFilteredIngredient(entriesArray);
    }

    handleIngredients();
  }, [recipeData, setFilteredIngredient]);

  return (
    <ul>
      {filteredIngredient.map((data, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {`${data[0]} - ${data[1]}`}
        </li>
      ))}
    </ul>
  );
}

Ingredients.propTypes = {
  index: PropTypes.string,
}.isRequired;

export default Ingredients;
