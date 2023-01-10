import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchSearchDrink } from '../services/FetchSearchs';
import DrinksIngredients from '../components/DrinksIngredients';

function DrinkExploreIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const TWELVE = 12;

  async function DrinksList() {
    const list = await fetchSearchDrink('list.php?i=list');
    setIngredients(list);
  }

  useEffect(() => {
    DrinksList();
  }, []);

  return (
    <div>
      <Header name="Explore Ingredients" displaySearchBtn={ false } />
      <div className="foodCards-A">
        {
          ingredients.slice(0, TWELVE).map((ingredient, index) => (
            <DrinksIngredients
              key={ ingredient.idIngredient }
              index={ index }
              titleIngredient={ ingredient.strIngredient1 }
            />
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default DrinkExploreIngredients;
