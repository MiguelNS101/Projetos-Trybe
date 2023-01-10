import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreNationalitie from '../components/ExploreNationalitie';
import RecipesContext from '../context/RecipesContext';
import CardsRecipes from '../components/CardsRecipes';

function FoodExploreNationalitie() {
  const { dataFood } = useContext(RecipesContext);
  const TWELVE = 12;

  return (
    <div>
      <Header name="Explore Nationalities" displaySearchBtn />
      <ExploreNationalitie />
      <div className="foodCards">
        {dataFood.slice(0, TWELVE).map((food, index) => (
          <Link id={ food.idMeal } to={ `/foods/${food.idMeal}` } key={ food.idMeal }>
            <CardsRecipes
              id={ food.idMeal }
              index={ index }
              src={ food.strMealThumb }
              titleCard={ food.strMeal }
            />
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FoodExploreNationalitie;
