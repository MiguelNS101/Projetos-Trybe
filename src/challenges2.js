// Desafio 10
function techList(list1, name) {
  let group = [];
  let list = list1.sort();
  if (list.length === 0) {
    group = 'Vazio!';
  } else {
    for (let index = 0; index < list.length; index += 1) {
      let obj = {
        tech: list[index],
        name,
      };
      group.push(obj);
    }
  }
  return group;
}

// Desafio 11
function repeatNumber(numList) {
  for (let i = 0; i < numList.length; i += 1) {
    let actualNum = numList[i];
    let numCount = 0;
    for (let index = 0; index < numList.length; index += 1) {
      if (actualNum === numList[index]) {
        numCount += 1;
      }
    }
    if (numCount >= 3) {
      return true;
    }
  }
}

function maiorMenor(numList) {
  let respBol = false;
  for (let i = 0; i < numList.length; i += 1) {
    if (numList[i] < 0 || numList[i] > 9) {
      respBol = true;
    }
  }
  return respBol;
}

function genNumb(numList) {
  let phoneNumber = '';
  phoneNumber += '(';
  for (let i = 0; i < 2; i += 1) {
    phoneNumber += numList[i];
  }
  phoneNumber += ') ';
  for (let i = 2; i < 7; i += 1) {
    phoneNumber += numList[i];
  }
  phoneNumber += '-';
  for (let i = 7; i < numList.length; i += 1) {
    phoneNumber += numList[i];
  }
  return phoneNumber;
}

function generatePhoneNumber(num) {
  let resposta = '';
  let tamLista = num.length;
  if (tamLista === 0) {
    tamLista = 1;
  }
  for (let i = 0; i < tamLista; i += 1) {
    if (num.length !== 11) {
      resposta = 'Array com tamanho incorreto.';
    } else if (maiorMenor(num) === true || repeatNumber(num) === true) {
      resposta = 'não é possível gerar um número de telefone com esses valores';
    } else {
      resposta = genNumb(num);
    }
  }
  return resposta;
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  let lineADif = Math.abs(lineB - lineC);
  let lineBDif = Math.abs(lineA - lineC);
  let lineCDif = Math.abs(lineA - lineB);
  let resposta = false;
  let somaA = lineB + lineC;
  let somaB = lineA + lineC;
  let somaC = lineB + lineA;
  if (lineA < somaA && lineB < somaB && lineC < somaC) {
    resposta = true;
  } else if (lineA > lineADif && lineB > lineBDif && lineC > lineCDif) {
    resposta = true;
  } else {
    resposta = false;
  }
  return resposta;
}

// Desafio 13
function hydrate(lista) {
  let separ = lista.replace(/[^0-9]/g, '');
  let separados = separ.split('');
  let newList = [];
  let somaTotal = 0;
  let resposta = '';
  for (let i = 0; i < separados.length; i += 1) {
    let x = Number(separados[i]);
    newList.push(x);
  }
  for (let i = 0; i < newList.length; i += 1) {
    somaTotal += newList[i];
  }
  resposta = somaTotal;
  if (somaTotal === 1) {
    resposta += ' copo';
  } else {
    resposta += ' copos';
  }
  resposta += ' de água';
  return resposta;
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
