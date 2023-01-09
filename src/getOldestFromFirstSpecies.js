const data = require('../data/zoo_data');

function getAnimalFromEmpId(id) {
  const emp = data.employees.find((empList) => empList.id === id);
  return emp.responsibleFor[0];
}

function getOlder(resid) {
  let olderAge = 0;
  let info;
  for (let i = 0; i < resid.length; i += 1) {
    if (resid[i].age > olderAge) {
      info = [resid[i].name, resid[i].sex, resid[i].age];
      olderAge = resid[i].age;
    }
  }
  return info;
}

function getAnimalInfo(animalId) {
  const animalinfo = data.species.find((animList) => animList.id === animalId);
  return getOlder(animalinfo.residents);
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const animal = getAnimalFromEmpId(id);
  return getAnimalInfo(animal);
}

module.exports = getOldestFromFirstSpecies;
