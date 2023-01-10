import React, { useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { fetchDetailDrink } from '../services/FetchSearchs';
import IngredientsInProgress from '../components/IngredientsInProgress';
import DetailsHeader from '../components/DetailsHeader';
import FinishButton from '../components/FinishButton';

function DrinkProgress(props) {
  const {
    recipeData,
    setRecipeData,
  } = useContext(RecipesContext);
  const { match } = props;
  const { params } = match;
  const { id } = params;

  const recipesDetails = useCallback((recipeId) => {
    fetchDetailDrink(recipeId).then(
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
            strMealThumb={ recipeData.strDrinkThumb }
            strMeal={ recipeData.strDrink }
            strCategory={ recipeData.strCategory }
            strAlcoholic={ recipeData.strAlcoholic }
            idMeal={ recipeData.idDrink }
            nationalityMeal={ recipeData.strArea }
            recType="drink"
          />
          <article>
            <h3>Ingredient</h3>
            <IngredientsInProgress idMeal={ recipeData.idDrink } recType="cocktails" />
          </article>
          <article>
            <h3>Instructions</h3>
            <p data-testid="instructions">{recipeData.strInstructions}</p>
          </article>
          <FinishButton recType="drink" />
        </div>
      ) : (
        <span>carregando</span>
      )}
    </div>
  );
}

DrinkProgress.propTypes = {
  recipeId: PropTypes.string,
}.isRequired;

export default DrinkProgress;
