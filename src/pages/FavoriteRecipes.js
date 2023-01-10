import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import { copyUrl } from '../services/FetchSearchs';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [isShowCopied, setIsShowCopied] = useState(false);
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  const attFavorites = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavorites(storage);
  };

  const filterByType = ({ target }) => {
    const data = favorites.filter((recipe) => (recipe.type === target.name));
    setFilteredFavorites(data);
  };

  const filterAll = () => {
    setFilteredFavorites(favorites);
  };

  useEffect(() => {
    attFavorites();
  }, []);

  const handleCopy = (typeDrink, pathname) => {
    copy(copyUrl(typeDrink, pathname));
    setIsShowCopied(true);
  };

  const removeFavoriteStorage = (recipeId) => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...storage.filter((item) => item.id
        !== recipeId)]));
    attFavorites();
  };
  const render = filteredFavorites.length > 0 ? filteredFavorites : favorites;

  return (
    <div>
      <Header name="Favorite Recipes" />
      <div className="categoryFilter">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ filterAll }
        >
          All

        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ filterByType }
          name="food"
        >
          Foods

        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ filterByType }
          name="drink"
        >
          Drinks

        </button>
      </div>
      <div className="doneCards">
        {
          render.map((recipe, index) => {
            const typeFood = recipe.type === 'food';
            const pathName = typeFood ? `/foods/${recipe.id}` : `/drinks/${recipe.id}`;

            return (
              <article key={ index } className="favCards">
                <Link to={ pathName }>
                  <div className="titleRecipe">
                    <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
                    <h4 data-testid={ `${index}-horizontal-top-text` }>

                      {recipe.nationality}
                      {' - '}
                      {recipe.alcoholicOrNot !== ''
                        ? recipe.alcoholicOrNot : recipe.category}
                    </h4>
                  </div>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    style={ { width: '300px' } }
                    src={ recipe.image }
                    alt={ recipe.id }
                  />
                </Link>
                <div className="ShareFavButtons-A">
                  <button
                    data-testid="share-btn"
                    type="button"
                    onClick={ () => handleCopy(typeFood, pathName) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="share-btn"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={ () => removeFavoriteStorage(recipe.id) }
                  >
                    <img
                      alt="favorite-btn"
                      src={ blackHeartIcon }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>
                </div>
                {
                  isShowCopied && <p>Link copied!</p>
                }

              </article>
            );
          })
        }
      </div>

    </div>
  );
}

export default FavoriteRecipes;
