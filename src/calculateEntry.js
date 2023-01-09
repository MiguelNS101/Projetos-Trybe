const data = require('../data/zoo_data');

function countEntrants(entrants) {
  // seu código aqui
  let resp;
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    resp = 0;
  } else {
    const child = entrants.filter((entlList) => entlList.age < 18);
    const adult = entrants.filter((entlList) => entlList.age >= 18 && entlList.age < 50);
    const senior = entrants.filter((entlList) => entlList.age >= 50);
    resp = { child: child.length, adult: adult.length, senior: senior.length };
  }
  return resp;
}

function calculateEntry(entrants) {
  // seu código aqui
  let resp;
  let totalSum = 0;
  const entrList = countEntrants(entrants);
  if (entrList === 0) {
    resp = 0;
  } else {
    totalSum += entrList.adult * data.prices.adult;
    totalSum += entrList.child * data.prices.child;
    totalSum += entrList.senior * data.prices.senior;
    resp = totalSum;
  }
  return resp;
}

module.exports = { calculateEntry, countEntrants };
