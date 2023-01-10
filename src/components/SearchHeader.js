import React, { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

// UseRef = Pegar a referência do dom, pegando o target.value por referência:
// https://pt-br.reactjs.org/docs/hooks-reference.html#useref

function SearchHeader() {
  const history = useHistory();
  const textInput = useRef();
  const radioInput = useRef();
  const { dataFood,
    dataDrink,
    searchRecipes } = useContext(RecipesContext);
  const nameHistory = history.location.pathname;

  // a ? serve para verificar se a chave dataFood.meals existe, se não existir ela não vai fazer nada.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  function detailsRecipe() {
    if (dataFood?.length === 1) {
      history.push(`/foods/${dataFood[0].idMeal}`);
    }
    if (dataDrink?.length === 1) {
      history.push(`/drinks/${dataDrink[0].idDrink}`);
    }
  }

  function handleClick() {
    if (radioInput.current.includes('f=') && textInput.current.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    searchRecipes(nameHistory, `${radioInput.current}${textInput.current}`);
  }

  useEffect(() => {
    detailsRecipe();
  });

  return (
    <form>
      <label htmlFor="input-search" className="inputSearch">
        <input
          type="text"
          data-testid="search-input"
          id="input-search"
          placeholder="Search Recipe"
          onChange={ ({ target }) => { textInput.current = target.value; } }
        />
      </label>
      <section className="searchFilter">
        <label htmlFor="radio-ingredient">
          Ingredient
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="radio-ingredient"
            name="radio-input"
            onClick={ () => { radioInput.current = 'filter.php?i='; } }
          />
        </label>
        <label htmlFor="radio-name">
          Name
          <input
            type="radio"
            data-testid="name-search-radio"
            id="radio-name"
            name="radio-input"
            onClick={ () => { radioInput.current = 'search.php?s='; } }
          />
        </label>
        <label htmlFor="radio-first-letter">
          First Letter
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="radio-first-letter"
            name="radio-input"
            onClick={ () => { radioInput.current = 'search.php?f='; } }
          />
        </label>
      </section>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </form>
  );
}

export default SearchHeader;
