import React, { useContext, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { fetchDetailDrink } from '../services/FetchSearchs';
import Recomendated from '../components/Recomendated';
import Ingredients from '../components/Ingredients';
import StartContinueButton from '../components/StartContinueButton';
import ContinueButton from '../components/ContinueButton';
import DetailsHeader from '../components/DetailsHeader';

function DrinkDetails(props) {
  const {
    recipeData,
    setRecipeData,
    dataFood,
  } = useContext(RecipesContext);
  const SIX = 6;
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
            <Ingredients />
          </article>
          <article>
            <h3>Instructions</h3>
            <p data-testid="instructions">{recipeData.strInstructions}</p>
          </article>
          <div>
            <h3 className="rocomendatedH">Recomendados</h3>
            <div className="recomendatedCards">
              {dataFood.slice(0, SIX).map((food, index) => (
                <Link
                  id={ food.idMeal }
                  to={ `/foods/${food.idMeal}` }
                  key={ food.idMeal }
                >
                  <Recomendated
                    id={ food.idMeal }
                    index={ index }
                    src={ food.strMealThumb }
                    titleCard={ food.strMeal }
                  />
                </Link>
              ))}
            </div>
          </div>
          <StartContinueButton foodId={ recipeData.idDrink } recType="drink" />
          <ContinueButton foodId={ recipeData.idDrink } recType="drink" />
        </div>
      ) : (
        <span>carregando</span>
      )}
    </div>
  );
}

DrinkDetails.propTypes = {
  recipeId: PropTypes.string,
}.isRequired;

export default DrinkDetails;
