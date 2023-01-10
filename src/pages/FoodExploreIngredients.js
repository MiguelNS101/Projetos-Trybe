import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchSearchFood } from '../services/FetchSearchs';
import FoodsIngredients from '../components/FoodsIngredients';

function FoodExploreIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const TWELVE = 12;

  async function IngredientsList() {
    const list = await fetchSearchFood('list.php?i=list');
    setIngredients(list);
  }

  useEffect(() => {
    IngredientsList();
  }, []);

  return (
    <div>
      <Header name="Food Explore Ingredients" displaySearchBtn={ false } />
      <div className="foodCards-A">
        {
          ingredients.slice(0, TWELVE).map((ingredient, index) => (
            <FoodsIngredients
              key={ ingredient.idIngredient }
              index={ index }
              titleIngredient={ ingredient.strIngredient }
            />
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default FoodExploreIngredients;
