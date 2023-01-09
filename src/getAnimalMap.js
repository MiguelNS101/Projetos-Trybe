const data = require('../data/zoo_data');

// ======================================================================

function createAniList(anList) {
  const respList = [];
  for (let i = 0; i < anList.length; i += 1) {
    respList.push(anList[i].name);
  }
  return respList;
}

function noInclude(options) {
  const respNE = data.species.filter((animList) => animList.location.includes('NE'));
  const respNW = data.species.filter((animList) => animList.location.includes('NW'));
  const respSE = data.species.filter((animList) => animList.location.includes('SE'));
  const respSW = data.species.filter((animList) => animList.location.includes('SW'));
  return {
    NE: createAniList(respNE),
    NW: createAniList(respNW),
    SE: createAniList(respSE),
    SW: createAniList(respSW),
  };
}

// ======================================================================

function createAnObj(listA) {
  const namList = [];
  for (let i = 0; i < listA.residents.length; i += 1) {
    namList.push(listA.residents[i].name);
  }
  return { [listA.name]: namList };
}

function createNameList(nameList) {
  const respList = [];
  for (let i = 0; i < nameList.length; i += 1) {
    respList.push(createAnObj(nameList[i]));
  }
  // console.log(respList);
  return respList;
}

function incName() {
  const respNE = data.species.filter((animList) => animList.location.includes('NE'));
  const respNW = data.species.filter((animList) => animList.location.includes('NW'));
  const respSE = data.species.filter((animList) => animList.location.includes('SE'));
  const respSW = data.species.filter((animList) => animList.location.includes('SW'));
  return {
    NE: createNameList(respNE),
    NW: createNameList(respNW),
    SE: createNameList(respSE),
    SW: createNameList(respSW),
  };
}

// ======================================================================
function createAnSortedObj(listA) {
  const namList = [];
  for (let i = 0; i < listA.residents.length; i += 1) {
    namList.push(listA.residents[i].name);
  }
  return { [listA.name]: namList.sort() };
}

function createSortedNameList(nameList) {
  const respList = [];
  for (let i = 0; i < nameList.length; i += 1) {
    respList.push(createAnSortedObj(nameList[i]));
  }
  // console.log(respList);
  return respList;
}

function sortFunc(dSpecie) {
  const respNE = data.species.filter((animList) => animList.location.includes('NE'));
  const respNW = data.species.filter((animList) => animList.location.includes('NW'));
  const respSE = data.species.filter((animList) => animList.location.includes('SE'));
  const respSW = data.species.filter((animList) => animList.location.includes('SW'));
  return {
    NE: createSortedNameList(respNE),
    NW: createSortedNameList(respNW),
    SE: createSortedNameList(respSE),
    SW: createSortedNameList(respSW),
  };
}

// ======================================================================

function createSeObj(listA, opt) {
  const namList = [];
  for (let i = 0; i < listA.residents.length; i += 1) {
    if (listA.residents[i].sex === opt.sex) {
      namList.push(listA.residents[i].name);
    }
  }
  return { [listA.name]: namList };
}

function createSexNameList(nameList, opt) {
  const respList = [];
  for (let i = 0; i < nameList.length; i += 1) {
    respList.push(createSeObj(nameList[i], opt));
  }
  // console.log(respList);
  return respList;
}

function sexFunc(opt, dSpecie) {
  const respNE = data.species.filter((animList) => animList.location.includes('NE'));
  const respNW = data.species.filter((animList) => animList.location.includes('NW'));
  const respSE = data.species.filter((animList) => animList.location.includes('SE'));
  const respSW = data.species.filter((animList) => animList.location.includes('SW'));
  return {
    NE: createSexNameList(respNE, opt),
    NW: createSexNameList(respNW, opt),
    SE: createSexNameList(respSE, opt),
    SW: createSexNameList(respSW, opt),
  };
}

// ======================================================================

function createSeSortedObj(listA, opt) {
  const namList = [];
  for (let i = 0; i < listA.residents.length; i += 1) {
    if (listA.residents[i].sex === opt.sex) {
      namList.push(listA.residents[i].name);
    }
  }
  return { [listA.name]: namList.sort() };
}

function createSortedSexNameList(nameList, opt) {
  const respList = [];
  for (let i = 0; i < nameList.length; i += 1) {
    respList.push(createSeSortedObj(nameList[i], opt));
  }
  // console.log(respList);
  return respList;
}

function sexFuncSort(opt, dSpecie) {
  const respNE = data.species.filter((animList) => animList.location.includes('NE'));
  const respNW = data.species.filter((animList) => animList.location.includes('NW'));
  const respSE = data.species.filter((animList) => animList.location.includes('SE'));
  const respSW = data.species.filter((animList) => animList.location.includes('SW'));
  return {
    NE: createSortedSexNameList(respNE, opt),
    NW: createSortedSexNameList(respNW, opt),
    SE: createSortedSexNameList(respSE, opt),
    SW: createSortedSexNameList(respSW, opt),
  };
}

// ======================================================================

function sortSexFunc(opt, dSpecie) {
  let resp;
  if (opt.sex === undefined && opt.sorted === true) {
    resp = sortFunc(dSpecie);
  } else if (opt.sex !== undefined && opt.sorted === undefined) {
    resp = sexFunc(opt, dSpecie);
  } else {
    resp = sexFuncSort(opt, dSpecie);
  }
  return resp;
}

// ======================================================================

function getAnimalMap(opt = noInclude()) {
  let resp;
  if (opt.includeNames === undefined || opt.includeNames === false) {
    resp = noInclude();
  } else if (opt.sorted === undefined && opt.sex === undefined) {
    resp = incName();
  } else {
    resp = sortSexFunc(opt, data.species);
  }
  return resp;
}

module.exports = getAnimalMap;
