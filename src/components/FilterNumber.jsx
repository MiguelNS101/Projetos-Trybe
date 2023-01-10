import React, { useContext } from 'react';
import Context from '../context/Context';

function FilterNumber() {
  const {
    filterColumOpt,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    setFilterByNumericValues,
    setUsedColumOpt,
    usedColumOpt,
  } = useContext(Context);

  const handleClick = () => {
    setFilterByNumericValues((prevFilter) => [
      ...prevFilter,
      {
        column: columnFilter,
        comparison: comparisonFilter,
        value: valueFilter,
      },
    ]);
    setUsedColumOpt((prevFilter) => [
      ...prevFilter,
      columnFilter,
    ]);
    setColumnFilter('population');
    setComparisonFilter('maior que');
    setValueFilter(0);
  };

  return (
    <div className="numFilter">
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          id="column-filter"
          value={ columnFilter }
          onChange={ ({ target }) => setColumnFilter(target.value) }
        >
          {filterColumOpt
            .filter((option) => (
              usedColumOpt.every((filter) => filter !== option)))
            .map((opt) => (
              <option key={ opt }>{opt}</option>
            ))}
        </select>
      </label>

      <label
        htmlFor="comparison-filter"
        value={ comparisonFilter }
        onChange={ ({ target }) => setComparisonFilter(target.value) }
      >
        <select data-testid="comparison-filter" id="comparison-filter">
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>

      <label htmlFor="value-filter">
        <input
          type="number"
          data-testid="value-filter"
          id="value-filter"
          value={ valueFilter }
          onChange={ ({ target }) => setValueFilter(target.value) }
        />
      </label>

      <button data-testid="button-filter" type="button" onClick={ handleClick }>
        Filtrar
      </button>
    </div>
  );
}

export default FilterNumber;
