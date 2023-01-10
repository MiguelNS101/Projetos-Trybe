import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchSearchFood } from '../services/FetchSearchs';
import RecipesContext from '../context/RecipesContext';

function FoodsIngredients({ index, titleIngredient }) {
  const { setDataFood } = useContext(RecipesContext);

  async function ingredientFoods(ingredient) {
    const foodsIngredient = await fetchSearchFood(`filter.php?i=${ingredient}`);
    setDataFood(foodsIngredient);
  }

  return (
    <article>
      <Link
        to="/foods"
        data-testid={ `${index}-ingredient-card` }
      >
        <button type="button" onClick={ () => ingredientFoods(titleIngredient) }>
          <h5 data-testid={ `${index}-card-name` }>{ titleIngredient }</h5>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${titleIngredient}-Small.png` }
            alt={ titleIngredient }
          />
        </button>
      </Link>
    </article>
  );
}

FoodsIngredients.propTypes = {
  index: PropTypes.string,
  src: PropTypes.string,
  titleCard: PropTypes.string,
}.isRequired;

export default FoodsIngredients;
