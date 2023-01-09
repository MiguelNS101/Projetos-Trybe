const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  // seu código aqui
  let resp;
  if (employeeName === undefined) {
    resp = {};
  } else {
    resp = data.employees.find(
      (empl) => empl.firstName === employeeName || empl.lastName === employeeName,
    );
  }
  return resp;
}

module.exports = getEmployeeByName;
