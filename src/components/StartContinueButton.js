import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function StartContinueButton({ foodId, recType }) {
  const {
    recipeDoneState,
    setRecipeDoneState,
    setRecipeProgressState,
  } = useContext(RecipesContext);

  function handleStart() {
    setRecipeDoneState(true);
    setRecipeProgressState(true);
  }

  useEffect(() => {
    function handleRecipeDone() {
      const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneRecipesList !== null) {
        if (doneRecipesList.filter((data) => data.id === foodId).length > 0) {
          setRecipeDoneState(true);
        } else {
          setRecipeDoneState(false);
        }
      }
    }

    handleRecipeDone();
  }, [foodId, setRecipeDoneState]);
  let linkType = '';
  if (recType === 'food') {
    linkType = 'foods';
  } else if (recType === 'drink') {
    linkType = 'drinks';
  }

  return (
    <div>
      { recipeDoneState ? (
        ''
      ) : (
        <Link id={ foodId } to={ `/${linkType}/${foodId}/in-progress` } key={ foodId }>
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="startButton"
            onClick={ () => handleStart() }
          >
            Start Recipe
          </button>
        </Link>
      )}
    </div>
  );
}

StartContinueButton.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
}.isRequired;

export default StartContinueButton;
