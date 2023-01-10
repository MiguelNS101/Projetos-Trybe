import React, { useContext } from 'react';
import Context from '../context/Context';

function FilterName() {
  const { filterByName, setFilterByName } = useContext(Context);
  return (
    <label htmlFor="name-filter">
      <p>Filtrar por nome:</p>
      <input
        id="name-filter"
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => setFilterByName({ name: target.value }) }
        value={ filterByName.name }
      />
    </label>
  );
}

export default FilterName;
