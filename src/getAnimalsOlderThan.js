const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const resp = data.species.find((specie) => specie.name === animal);
  return resp.residents.every((resid) => resid.age >= age);
}

module.exports = getAnimalsOlderThan;
