import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchSearchDrink } from '../services/FetchSearchs';
import RecipesContext from '../context/RecipesContext';

function DrinksIngredients({ index, titleIngredient }) {
  const { setDataDrink } = useContext(RecipesContext);

  async function ingredientDrinks(ingredient) {
    const drinksIngredient = await fetchSearchDrink(`filter.php?i=${ingredient}`);
    setDataDrink(drinksIngredient);
  }

  return (
    <article>
      <Link to="/drinks" data-testid={ `${index}-ingredient-card` }>
        <button type="button" onClick={ () => ingredientDrinks(titleIngredient) }>
          <h5 data-testid={ `${index}-card-name` }>{ titleIngredient }</h5>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${titleIngredient}-Small.png` }
            alt={ titleIngredient }
          />
        </button>
      </Link>
    </article>
  );
}

DrinksIngredients.propTypes = {
  index: PropTypes.string,
  src: PropTypes.string,
  titleCard: PropTypes.string,
}.isRequired;

export default DrinksIngredients;
