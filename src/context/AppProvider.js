import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
const FILTER_COLUMN_OPT = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function AppProvider({ children }) {
  const [planetData, setPlanetData] = useState('');
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterColumOpt, setfilterColumOpt] = useState(FILTER_COLUMN_OPT);
  const [usedColumOpt, setUsedColumOpt] = useState([]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [loading, setLoading] = useState(false);

  const mainState = {
    planetData,
    loading,
    filterByName,
    setFilterByName,
    filterColumOpt,
    setfilterColumOpt,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    filterByNumericValues,
    setFilterByNumericValues,
    usedColumOpt,
    setUsedColumOpt,
  };

  useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setPlanetData(data);
        setLoading(false);
      });
  }, []);

  return (
    <Context.Provider value={ mainState }>
      {children}
    </Context.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AppProvider;
