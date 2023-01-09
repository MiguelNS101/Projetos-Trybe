const data = require('../data/zoo_data');

const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';
const managers = [stephanieId, olaId, burlId];

function isManager(id) {
  // seu código aqui
  let resp = false;
  managers.forEach((manag) => {
    if (manag === id) {
      resp = true;
    }
  });
  return resp;
}

function getRelatedEmployees(managerId) {
  // seu código aqui
  const isMan = isManager(managerId);
  if (isMan === false) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  } else {
    const resp = data.employees.filter((emplList) => emplList.managers.includes(managerId));
    return resp.map((emp) => `${emp.firstName} ${emp.lastName}`);
  }
}

module.exports = { isManager, getRelatedEmployees };
