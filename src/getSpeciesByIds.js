const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  let resp = [];
  if (ids.length < 1) {
    resp = [];
  } else if (ids.length === 1) {
    resp = [data.species.find((specie) => specie.id === ids[0])];
  } else if (ids.length > 1) {
    for (let i = 0; i < ids.length; i += 1) {
      resp.push(...data.species.filter((specie) => specie.id === ids[i]));
    }
  }
  return resp;
}

module.exports = getSpeciesByIds;
