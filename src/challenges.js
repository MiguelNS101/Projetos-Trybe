// Funcoes extras
function a(highestNum, highCount, numList) {
  for (let index = 0; index < numList.length; index += 1) {
    if (numList[index] === highestNum) {
      highCount += 1;
    }
  }
  return highCount;
}

function b(rest1, rest2, list) {
  if (rest1 === 0 && rest2 === 0) {
    list.push('fizzBuzz');
  } else if (rest1 === 0) {
    list.push('fizz');
  } else if (rest2 === 0) {
    list.push('buzz');
  } else {
    list.push('bug!');
  }
}

function c(list, index) {
  if (list[index] === 'a') {
    list[index] = '1';
  } else if (list[index] === 'e') {
    list[index] = '2';
  } else if (list[index] === 'i') {
    list[index] = '3';
  } else if (list[index] === 'o') {
    list[index] = '4';
  } else if (list[index] === 'u') {
    list[index] = '5';
  }
  return list[index];
}

function d(list, index) {
  if (list[index] === '1') {
    list[index] = 'a';
  } else if (list[index] === '2') {
    list[index] = 'e';
  } else if (list[index] === '3') {
    list[index] = 'i';
  } else if (list[index] === '4') {
    list[index] = 'o';
  } else if (list[index] === '5') {
    list[index] = 'u';
  }
  return list[index];
}

// Desafio 1
function compareTrue(bol1, bol2) {
  let resp = false;
  if (bol1 === true && bol2 === true) {
    resp = true;
  }
  return resp;
}

// Desafio 2
function calcArea(base, height) {
  return ((base * height) / 2);
}

// Desafio 3
function splitSentence(string1) {
  let string2 = string1.split(' ');
  return string2;
}

// Desafio 4
function concatName(list) {
  let eslintfix = ', ';
  let concat = list[list.length - 1] + eslintfix + list[0];
  return concat;
}

// Desafio 5
function footballPoints(wins, ties) {
  let points = (wins * 3) + (ties);
  return points;
}

// Desafio 6
function highestCount(numList) {
  let highestNum = -9999999999999999999999999999999999999999999999;
  let highCount = 0;
  for (let index = 0; index < numList.length; index += 1) {
    if (numList[index] > highestNum) {
      highestNum = numList[index];
    }
  }

  // for (let index = 0; index < numList.length; index += 1) {
  //   if (numList[index] === highestNum) {
  //     highCount += 1;
  //   }
  // }

  return a(highestNum, highCount, numList);
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  console.log(mouse, cat1, cat2);
  let disx = mouse - cat1;
  let disy = mouse - cat2;
  let dist1 = Math.abs(disx);
  let dist2 = Math.abs(disy);
  let msg = '';
  if (dist1 < dist2) {
    msg = 'cat1';
  } else if (dist2 < dist1) {
    msg = 'cat2';
  } else if (dist1 === dist2) {
    msg = 'os gatos trombam e o rato foge';
  }
  return msg;
}

// Desafio 8
function fizzBuzz(numList) {
  let list = [];
  for (let index = 0; index < numList.length; index += 1) {
    let rest1 = numList[index] % 3;
    let rest2 = numList[index] % 5;
    b(rest1, rest2, list);
    // if (rest1 === 0 && rest2 === 0) {
    //   list.push('fizzBuzz');
    // } else if (rest1 === 0) {
    //   list.push('fizz');
    // } else if (rest2 === 0) {
    //   list.push('buzz');
    // } else {
    //   list.push('bug!');
    // }
  }
  return list;
}

// Desafio 9
function encode(string1) {
  let list = string1.split('');
  let resp = '';
  for (let index = 0; index < string1.length; index += 1) {
    // if (list[index] === 'a') {
    //   list[index] = '1';
    // } else if (list[index] === 'e') {
    //   list[index] = '2';
    // } else if (list[index] === 'i') {
    //   list[index] = '3';
    // } else if (list[index] === 'o') {
    //   list[index] = '4';
    // } else if (list[index] === 'u') {
    //   list[index] = '5';
    // }
    resp += c(list, index);
  }
  return resp;
}
function decode(string1) {
  let list = string1.split('');
  let resp = '';
  for (let index = 0; index < string1.length; index += 1) {
    // if (list[index] === '1') {
    //   list[index] = 'a';
    // } else if (list[index] === '2') {
    //   list[index] = 'e';
    // } else if (list[index] === '3') {
    //   list[index] = 'i';
    // } else if (list[index] === '4') {
    //   list[index] = 'o';
    // } else if (list[index] === '5') {
    //   list[index] = 'u';
    // }
    resp += d(list, index);
  }
  return resp;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
