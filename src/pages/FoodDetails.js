import React, { useContext, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { fetchDetailFood } from '../services/FetchSearchs';
import Recomendated from '../components/Recomendated';
import Ingredients from '../components/Ingredients';
import StartContinueButton from '../components/StartContinueButton';
import ContinueButton from '../components/ContinueButton';
import DetailsHeader from '../components/DetailsHeader';

function FoodDetails(props) {
  const {
    recipeData,
    setRecipeData,
    dataDrink,
  } = useContext(RecipesContext);
  const SIX = 6;
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

  // console.log(recipeData.strYoutube.split('=')[1]);
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
            <Ingredients />
          </article>
          <article>
            <h3>Instructions</h3>
            <p data-testid="instructions">{recipeData.strInstructions}</p>
          </article>
          { recipeData.strYoutube
            && (
              <iframe
                data-testid="video"
                title="oi"
                src={ `https://www.youtube.com/embed/${recipeData.strYoutube.split('=')[1]}` }
                width="350"
                height="250"
              />
            )}
          <h3 className="rocomendatedH">Recomendados</h3>
          <div className="recomendatedCards">
            {dataDrink.slice(0, SIX).map((drink, index) => (
              <Link
                id={ drink.idDrink }
                to={ `/drinks/${drink.idDrink}` }
                key={ drink.idDrink }
              >
                <Recomendated
                  index={ index }
                  src={ drink.strDrinkThumb }
                  titleCard={ drink.strDrink }
                />
              </Link>
            ))}
          </div>
          <StartContinueButton foodId={ recipeData.idMeal } recType="food" />
          <ContinueButton foodId={ recipeData.idMeal } recType="food" />
        </div>
      ) : (
        <span>carregando</span>
      )}
    </div>
  );
}

FoodDetails.propTypes = {
  recipeId: PropTypes.string,
}.isRequired;

export default FoodDetails;
