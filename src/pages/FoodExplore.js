import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchSearchFood } from '../services/FetchSearchs';

function FoodExplore() {
  const history = useHistory();

  async function getRandomFood() {
    const result = await fetchSearchFood('random.php');
    history.push(`/foods/${result[0].idMeal}`);
  }

  return (
    <div>
      <Header name="Explore Foods" displaySearchBtn={ false } />
      <article className="explorePage">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ getRandomFood }
        >
          Surprise me!
        </button>
      </article>
      <Footer />
    </div>
  );
}

export default FoodExplore;
