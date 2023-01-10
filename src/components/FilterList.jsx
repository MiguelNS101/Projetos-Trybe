import React, { useContext } from 'react';
import Context from '../context/Context';

function FilterList() {
  const {
    filterByNumericValues,
    setFilterByNumericValues,
    usedColumOpt,
    setUsedColumOpt,
  } = useContext(Context);

  const handleRemoveFilter = (column) => {
    const filteredUsedOpt = usedColumOpt.filter((value) => value !== column);
    const filtByNum = filterByNumericValues.filter((value) => value.column !== column);
    setUsedColumOpt(filteredUsedOpt);
    setFilterByNumericValues(filtByNum);
  };

  return (
    <div>
      <div className="filteredSec">
        {filterByNumericValues.map((filter) => (
          <div key={ filter.column } data-testid="filter" className="filterCard">
            <p>{filter.column}</p>
            <p>{filter.comparison}</p>
            <p>{filter.value}</p>
            <button
              type="button"
              onClick={ () => handleRemoveFilter(filter.column) }
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setFilterByNumericValues([]) }
      >
        Remover Filtros
      </button>
    </div>
  );
}

export default FilterList;
