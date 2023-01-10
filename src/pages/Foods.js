import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CardsRecipes from '../components/CardsRecipes';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import MainScreenFood from '../components/MainScreenFood';

function Foods() {
  const { dataFood } = useContext(RecipesContext);
  const TWELVE = 12;

  return (
    <div>
      <Header name="Foods" displaySearchBtn />
      <MainScreenFood />
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

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

export default Foods;
