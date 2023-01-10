import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function ContinueButton({ foodId, recType }) {
  const {
    setRecipeDoneState,
    recipeProgressState,
    setRecipeProgressState,
  } = useContext(RecipesContext);

  function handleContinue() {
    setRecipeDoneState(false);
    setRecipeProgressState(false);
  }

  useEffect(() => {
    function handleRecipeProgress() {
      const done = JSON.parse(localStorage.getItem('doneRecipes'));
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      let tipo = '';
      if (recType === 'food') {
        tipo = 'meals';
      } else if (recType === 'drink') {
        tipo = 'cocktails';
      }
      if (inProgressRecipes !== null) {
        if (
          Object.keys(inProgressRecipes[tipo])
            .filter((data) => data === foodId)
            .filter((data) => data !== done).length > 0
        ) {
          setRecipeDoneState(true);
          setRecipeProgressState(true);
        } else {
          setRecipeProgressState(false);
        }
      }
    }

    handleRecipeProgress();
  }, [foodId, recType, setRecipeDoneState, setRecipeProgressState]);

  let linkType = '';
  if (recType === 'food') {
    linkType = 'foods';
  } else if (recType === 'drink') {
    linkType = 'drinks';
  }

  return (
    <div>
      { recipeProgressState ? (
        <Link id={ foodId } to={ `/${linkType}/${foodId}/in-progress` } key={ foodId }>
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="startButton"
            onClick={ () => handleContinue() }
          >
            Continue Recipe
          </button>
        </Link>
      ) : (
        ''
      )}
    </div>
  );
}

ContinueButton.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
}.isRequired;

export default ContinueButton;
