const data = require('../data/zoo_data');

function countAnimals(animal) {
  let obj;
  if (animal === undefined) {
    data.species.forEach((especies, index) => {
      obj = { ...obj, ...{ [especies.name]: especies.residents.length } };
    });
  } else {
    const resp = data.species.find((especie) => especie.name === animal.specie);
    if (animal.sex === undefined) {
      obj = resp.residents.length;
    } else {
      const respSez = resp.residents.filter((resid) => resid.sex === animal.sex);
      obj = respSez.length;
    }
  }
  return obj;
}

module.exports = countAnimals;
