import React, { useEffect, useState, useContext } from 'react';
import { fetchSearchDrink } from '../services/FetchSearchs';
import RecipesContext from '../context/RecipesContext';

const FIVE = 5;
const TWELVE = 12;

function MainScreenDrink() {
  const [categories, setCategories] = useState([]);
  const [nameCategorie, setNameCategorie] = useState('');
  const { dataDrink,
    setDataDrink,
    initialDrink,
    setInitialDrink } = useContext(RecipesContext);

  async function drinkFilter() {
    const buttonFilter = await fetchSearchDrink('list.php?c=list');
    setCategories(buttonFilter);
  }

  useEffect(() => {
    drinkFilter();
  }, []);

  async function drinkFilterCategorie(categorieName) {
    if (categorieName !== 'All' && categorieName !== nameCategorie) {
      const drinksCategories = await fetchSearchDrink(`filter.php?c=${categorieName}`);
      const drinkFilterCategories = drinksCategories.slice(0, TWELVE);
      setInitialDrink(dataDrink);
      setDataDrink(drinkFilterCategories);
      setNameCategorie(categorieName);
    } else {
      setDataDrink(initialDrink);
    }
  }

  function handleClickCategorie(categorieName) {
    drinkFilterCategorie(categorieName);
  }

  function handleClickAll() {
    setDataDrink(initialDrink);
  }

  return (
    <form className="categoryFilter">
      <button
        data-testid="All-category-filter"
        type="button"
        name="All"
        onClick={ handleClickAll }
      >
        All
      </button>
      {categories.slice(0, FIVE).map((categorie) => (
        <button
          key={ categorie.strCategory }
          type="button"
          data-testid={ `${categorie.strCategory}-category-filter` }
          onClick={ () => handleClickCategorie(categorie.strCategory) }
        >
          {categorie.strCategory}
        </button>
      ))}
    </form>
  );
}

export default MainScreenDrink;
