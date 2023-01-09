const data = require('../data/zoo_data');

const daysList = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];

function restOfDaysFunc(day) {
  let resp;
  if (day === 'Saturday') {
    resp = data.hours.Saturday;
  } else if (day === 'Sunday') {
    resp = data.hours.Sunday;
  } else if (day === 'Monday') {
    resp = data.hours.Monday;
  }
  return resp;
}

function chosDayFunc(day) {
  let resp;
  if (day === 'Tuesday') {
    resp = data.hours.Tuesday;
  } else if (day === 'Wednesday') {
    resp = data.hours.Wednesday;
  } else if (day === 'Thursday') {
    resp = data.hours.Thursday;
  } else if (day === 'Friday') {
    resp = data.hours.Friday;
  } else {
    resp = restOfDaysFunc(day);
  }
  return resp;
}

function ofiHouFunc(day) {
  let resp;
  if (day === 'Monday') {
    resp = 'CLOSED';
  } else {
    const rightDay = chosDayFunc(day);
    const ope = rightDay.open;
    const clos = rightDay.close;
    resp = `Open from ${ope}am until ${clos}pm`;
  }
  return resp;
}

function getExib(day) {
  const resp = [];
  let tes;
  const aniList = data.species.filter((animList) => animList.availability.includes(day));
  aniList.forEach((element, index) => {
    resp.push(aniList[index].name);
  });
  const rigDay = ofiHouFunc(day);
  if (day === 'Monday') {
    tes = { officeHour: rigDay, exhibition: 'The zoo will be closed!' };
  } else {
    tes = { officeHour: rigDay, exhibition: resp };
  }
  return tes;
}

function EmptyResp() {
  const resp = {};
  for (let i = 0; i < daysList.length; i += 1) {
    const info = getExib(daysList[i]);
    const tes = { [daysList[i]]: info };
    Object.assign(resp, tes);
  }
  return resp;
}

// =======================================================================

function verDay(targ) {
  for (let i = 0; i < daysList.length; i += 1) {
    if (targ === daysList[i]) {
      return true;
    }
  }
}

function verAnimal(targ) {
  const animalList = data.species;
  for (let i = 0; i < animalList.length; i += 1) {
    if (targ === animalList[i].name) {
      return true;
    }
  }
}

// =======================================================================

function parameterTypeFunc(targ) {
  let resp;
  if (verDay(targ) === true) {
    resp = { [targ]: getExib(targ) };
  } else if (verAnimal(targ) === true) {
    const aniList = data.species.find((animList) => animList.name.includes(targ));
    resp = aniList.availability;
  } else {
    resp = EmptyResp();
  }
  return resp;
}

function getSchedule(scheduleTarget) {
  // seu código aqui
  let resp;
  if (scheduleTarget === undefined) {
    resp = EmptyResp();
  } else if (scheduleTarget !== undefined) {
    resp = parameterTypeFunc(scheduleTarget);
  }
  return resp;
}

module.exports = getSchedule;
