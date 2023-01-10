import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CardsRecipes from '../components/CardsRecipes';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import MainScreenDrink from '../components/MainScreenDrink';

function Drinks() {
  const { dataDrink } = useContext(RecipesContext);
  const TWELVE = 12;

  return (
    <div>
      <Header name="Drinks" displaySearchBtn />
      <MainScreenDrink />
      <div className="foodCards">
        {dataDrink.slice(0, TWELVE).map((drink, index) => (
          <Link
            id={ drink.idDrink }
            to={ `/drinks/${drink.idDrink}` }
            key={ drink.idDrink }
          >
            <CardsRecipes
              index={ index }
              src={ drink.strDrinkThumb }
              titleCard={ drink.strDrink }
            />
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

export default Drinks;
