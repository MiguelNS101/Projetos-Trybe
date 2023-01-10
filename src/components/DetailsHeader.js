import React, { useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import ShareButton from './ShareButton';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DetailsHeader({
  strMealThumb,
  strMeal,
  strCategory,
  idMeal,
  recType,
  nationalityMeal,
  strAlcoholic,
}) {
  const { isFav, setIsFav } = useContext(RecipesContext);

  const DATA_MEAL = {
    id: idMeal,
    type: recType,
    nationality: nationalityMeal,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  const DATA_DRINK = {
    id: idMeal,
    type: recType,
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strMeal,
    image: strMealThumb,
  };

  const handleFavorite = useCallback(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipes !== null) {
      if (favRecipes.filter((data) => data.id === idMeal).length > 0) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    }
  }, [idMeal, setIsFav]);

  function addFavorite() {
    let empArr = [];
    let data = {};
    if (recType === 'food') {
      data = DATA_MEAL;
    } else if (recType === 'drink') {
      data = DATA_DRINK;
    }
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipes === null) {
      empArr.push(data);
      localStorage.setItem('favoriteRecipes', JSON.stringify(empArr));
    } else {
      empArr = favRecipes;
      empArr.push(data);
      localStorage.setItem('favoriteRecipes', JSON.stringify(empArr));
    }
    handleFavorite();
  }

  function dellFavorite() {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavRecipes = favRecipes.filter((data) => data.id !== idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    handleFavorite();
  }

  useEffect(() => {
    handleFavorite();
  }, [handleFavorite]);

  return (
    <div className="detailsPage">
      <div className="detailImage">
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
      </div>
      <div className="detailHeader">
        <div className="titleRecipe">
          <h2 data-testid="recipe-title">{strMeal}</h2>
          { recType === 'food' ? (
            <h3 data-testid="recipe-category">{strCategory}</h3>
          ) : (
            <h3 data-testid="recipe-category">{strAlcoholic}</h3>
          )}
        </div>
        <div className="ShareFavButtons">
          <ShareButton idMeal={ idMeal } butType={ recType } />
          {isFav ? (
            <div>
              <button
                type="button"
                onClick={ () => dellFavorite() }
              >
                <img src={ blackHeartIcon } alt="fav Icon" data-testid="favorite-btn" />
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={ () => addFavorite() }
              >
                <img src={ whiteHeartIcon } alt="fav Icon" data-testid="favorite-btn" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

DetailsHeader.propTypes = {
  index: PropTypes.string,
}.isRequired;

export default DetailsHeader;
