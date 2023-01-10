import React, { useEffect, useState, useContext } from 'react';
import { fetchSearchFood } from '../services/FetchSearchs';
import RecipesContext from '../context/RecipesContext';

const FIVE = 5;
const TWELVE = 12;

function MainScreenFood() {
  const [categories, setCategories] = useState([]);
  const [nameCategorie, setNameCategorie] = useState('');
  const {
    dataFood,
    setDataFood,
    initialFood,
    setInitialFood } = useContext(RecipesContext);

  async function foodNameCategories() {
    const buttonFilter = await fetchSearchFood('list.php?c=list');
    setCategories(buttonFilter);
  }

  useEffect(() => {
    foodNameCategories();
  }, []);

  async function foodFilterCategorie(categorieName) {
    if (categorieName !== 'All' && categorieName !== nameCategorie) {
      const foodsCategories = await fetchSearchFood(`filter.php?c=${categorieName}`);
      const foodFilterCategories = foodsCategories.slice(0, TWELVE);
      setInitialFood(dataFood);
      setDataFood(foodFilterCategories);
      setNameCategorie(categorieName);
    } else {
      setDataFood(initialFood);
    }
  }

  function handleClickCategorie(categorieName) {
    foodFilterCategorie(categorieName);
  }

  function handleClickAll() {
    setDataFood(initialFood);
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

export default MainScreenFood;
