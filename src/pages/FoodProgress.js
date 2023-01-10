import React, { useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { fetchDetailFood } from '../services/FetchSearchs';
import IngredientsInProgress from '../components/IngredientsInProgress';
import DetailsHeader from '../components/DetailsHeader';
import FinishButton from '../components/FinishButton';

function FoodProgress(props) {
  const {
    recipeData,
    setRecipeData,
  } = useContext(RecipesContext);
  const { match } = props;
  const { params } = match;
  const { id } = params;

  const recipesDetails = useCallback((recipeId) => {
    fetchDetailFood(recipeId).then(
      (data) => setRecipeData(data),
      () => setRecipeData('error'),
    );
  }, [setRecipeData]);

  useEffect(() => {
    recipesDetails(id);
  }, [id, recipesDetails]);

  return (
    <div>
      {recipeData !== undefined ? (
        <div>
          <DetailsHeader
            strMealThumb={ recipeData.strMealThumb }
            strMeal={ recipeData.strMeal }
            strCategory={ recipeData.strCategory }
            idMeal={ recipeData.idMeal }
            nationalityMeal={ recipeData.strArea }
            recType="food"
          />
          <article>
            <h3>Ingredient</h3>
            <IngredientsInProgress idMeal={ recipeData.idMeal } recType="meals" />
          </article>
          <article>
            <h3>Instructions</h3>
            <p data-testid="instructions">{recipeData.strInstructions}</p>
          </article>
          <FinishButton recType="food" />
        </div>
      ) : (
        <span>carregando</span>
      )}
    </div>
  );
}

FoodProgress.propTypes = {
  recipeId: PropTypes.string,
}.isRequired;

export default FoodProgress;
