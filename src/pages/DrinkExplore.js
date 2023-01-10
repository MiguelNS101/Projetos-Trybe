import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchSearchDrink } from '../services/FetchSearchs';

function DrinkExplore() {
  const history = useHistory();

  async function getRandomDrink() {
    const result = await fetchSearchDrink('random.php');
    console.log(result);
    history.push(`/drinks/${result[0].idDrink}`);
  }
  return (
    <div>
      <Header name="Explore Drinks" displaySearchBtn={ false } />
      <article className="explorePage">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ getRandomDrink }
        >
          Surprise me!
        </button>
      </article>
      <Footer />
    </div>
  );
}

export default DrinkExplore;
