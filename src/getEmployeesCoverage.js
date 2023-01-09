const data = require('../data/zoo_data');

function GetId(emp) {
  return emp.id;
}

function GetFullName(emp) {
  return `${emp.firstName} ${emp.lastName}`;
}

function GetSpecies(emp) {
  const speciesId = emp.responsibleFor;
  const animals = [];
  speciesId.forEach((element, index) => {
    const specie = data.species.find((AnimallList) => AnimallList.id === speciesId[index]);
    animals.push(specie.name);
  });
  return animals;
}

function GetLocations(emp) {
  const speciesId = emp.responsibleFor;
  const locations = [];
  speciesId.forEach((element, index) => {
    const specie = data.species.find((AnimallList) => AnimallList.id === speciesId[index]);
    locations.push(specie.location);
  });
  return locations;
}

function returnEmpInfo(empId, empFullName, empSpecies, empLocations) {
  return {
    id: empId,
    fullName: empFullName,
    species: empSpecies,
    locations: empLocations,
  };
}

function getInfoById(opc) {
  const emp = data.employees.find((emplList) => emplList.id === opc.id);
  let resp;
  if (emp === undefined) {
    throw new Error('Informações inválidas');
  } else {
    resp = returnEmpInfo(GetId(emp), GetFullName(emp), GetSpecies(emp), GetLocations(emp));
  }
  return resp;
}

function getInfoByName(opc) {
  const emp = data.employees.find((eL) => eL.firstName === opc.name || eL.lastName === opc.name);
  let resp;
  if (emp === undefined) {
    throw new Error('Informações inválidas');
  } else {
    resp = returnEmpInfo(GetId(emp), GetFullName(emp), GetSpecies(emp), GetLocations(emp));
  }
  return resp;
}

function getInfoFromAll(opc) {
  const allEmp = data.employees;
  const resp = [];
  allEmp.forEach((element, index) => {
    const emp = allEmp[index];
    const info = returnEmpInfo(GetId(emp), GetFullName(emp), GetSpecies(emp), GetLocations(emp));
    resp.push(info);
  });
  return resp;
}

function getEmployeesCoverage(opc) {
  // seu código aqui
  let resp;
  if (opc === undefined) {
    resp = getInfoFromAll();
  } else if ('id' in opc) {
    resp = getInfoById(opc);
  } else if ('name' in opc) {
    resp = getInfoByName(opc);
  }
  return resp;
}

module.exports = getEmployeesCoverage;
