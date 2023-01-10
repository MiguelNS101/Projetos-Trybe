import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import RecipesContext from '../context/RecipesContext';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState([]);
  const [initialRecipesDone, setInitialRecipesDone] = useState([]);
  const { isCopied, setIsCopied } = useContext(RecipesContext);
  const COPY_TIME = 2000;
  const history = useHistory();

  function handleShare(type, recipeId) {
    copy(`http://localhost:3000/${type}s/${recipeId}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, COPY_TIME);
  }

  function cardsDoneRecipes() {
    const cardsDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (cardsDone !== null) {
      setRecipesDone(cardsDone);
      setInitialRecipesDone(cardsDone);
    }
  }

  useEffect(() => {
    cardsDoneRecipes();
  }, []);

  function handleClick({ target: { name } }) {
    if (name === 'All') return setRecipesDone(initialRecipesDone);
    const doneRecipes = initialRecipesDone.filter((recipe) => recipe.type === name);
    setRecipesDone(doneRecipes);
  }

  function redirect(type, id) {
    history.push(`/${type}s/${id}`);
  }

  return (
    <div>
      <Header name="Done Recipes" displaySearchBtn={ false } />
      <div className="categoryFilter">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name="All"
          onClick={ handleClick }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="food"
          onClick={ handleClick }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          onClick={ handleClick }
        >
          Drinks
        </button>
      </div>
      <div className="doneCards">
        { recipesDone.map((
          { image,
            category,
            name,
            doneDate,
            tags,
            alcoholicOrNot,
            type,
            nationality,
            id }, index,
        ) => (
          <article key={ index } className="buttonImg">
            <div className="doneCardHeader">
              <div className="doneRecipesHeader">
                <button type="button" onClick={ () => redirect(type, id) }>
                  <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
                </button>
              </div>
            </div>
            <button type="button" onClick={ () => redirect(type, id) }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
            </button>
            <button type="button" onClick={ () => handleShare(type, id) }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Botão de Compartilhar"
              />
            </button>
            { type === 'food'
              ? (
                <h3 data-testid={ `${index}-horizontal-top-text` }>
                  { `${nationality} - ${category}` }
                </h3>)
              : (
                <h3 data-testid={ `${index}-horizontal-top-text` }>
                  {alcoholicOrNot}
                </h3>
              )}
            <h4 data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</h4>
            { type === 'food' && tags.map((tag) => (
              <h5
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </h5>
            )) }
          </article>
        )) }
        {isCopied ? <span>Link copied!</span> : ''}
      </div>
    </div>
  );
}

export default DoneRecipes;
