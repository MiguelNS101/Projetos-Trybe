import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const { planetData, filterByName, filterByNumericValues } = useContext(Context);

  const filterPlanet = (filter, data) => {
    const { column, comparison, value } = filter;
    if (comparison === 'maior que') {
      return (Number(data[column]) > Number(value));
    }
    if (comparison === 'menor que') {
      return (Number(data[column]) < Number(value));
    }
    return (Number(data[column]) === Number(value));
  };

  return (
    <div className="tableCss">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planetData !== '' ? (
            planetData.results.filter(
              (planet) => planet.name.includes(filterByName.name)
                && filterByNumericValues.every((filterOpt) => (
                  filterPlanet(filterOpt, planet))),
            ).map((planet) => {
              const {
                name,
                climate,
                created,
                diameter,
                edited,
                films,
                gravity,
                orbital_period: orbitalPeriod,
                population,
                rotation_period: rotationPeriod,
                surface_water: surfaceWater,
                terrain,
                url,
              } = planet;
              return (
                <tr key={ name }>
                  <td data-testid="planet-name">{name}</td>
                  <td>{rotationPeriod}</td>
                  <td>{orbitalPeriod}</td>
                  <td>{diameter}</td>
                  <td>{climate}</td>
                  <td>{gravity}</td>
                  <td>{terrain}</td>
                  <td>{surfaceWater}</td>
                  <td>{population}</td>
                  <td>{films}</td>
                  <td>{created}</td>
                  <td>{edited}</td>
                  <td>{url}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>carregando</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
