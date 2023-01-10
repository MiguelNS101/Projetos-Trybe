import React, { useEffect, useState, useContext } from 'react';
import { fetchSearchFood } from '../services/FetchSearchs';
import RecipesContext from '../context/RecipesContext';

function ExploreNationalitie() {
  const [nationalities, setNationalities] = useState([]);
  const { dataFood,
    setDataFood, filterNationalitie, setFilterNationalitie } = useContext(RecipesContext);
  const [countrySelect, setCountrySelect] = useState('');

  async function fetchSearchFoodNat() {
    const listFoodsNationalities = await fetchSearchFood('list.php?a=list');
    setNationalities(listFoodsNationalities);
  }

  useEffect(() => {
    fetchSearchFoodNat();
  }, []);

  async function handleChange(endpoint) {
    setCountrySelect(endpoint);
    setFilterNationalitie(dataFood);
    if (endpoint !== 'All') {
      const foodsNationalitie = await fetchSearchFood(`filter.php?a=${endpoint}`);
      setDataFood(foodsNationalitie);
    } else {
      setDataFood(filterNationalitie);
    }
  }

  return (
    <div className="exploreNationalitieDropdown">
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ (event) => handleChange(event.target.value) }
        value={ countrySelect }
      >
        <option data-testid="All-option">All</option>
        {nationalities.map((nationalitie) => (
          <option
            key={ nationalitie.strArea }
            data-testid={ `${nationalitie.strArea}-option` }
          >
            {nationalitie.strArea}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ExploreNationalitie;
