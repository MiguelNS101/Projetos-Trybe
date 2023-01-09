
function colorListSet() {
  let cor1 = '#' + Math.floor(Math.random() * 16777215).toString(16);
  let cor2 = '#' + Math.floor(Math.random() * 16777215).toString(16);
  let cor3 = '#' + Math.floor(Math.random() * 16777215).toString(16);
  let colorList = ['black', cor1, cor2, cor3];
  return colorList;
}

let colorList = colorListSet();

function opcCores(listaDeCores) {
  let botaoCor = document.querySelectorAll('#color-palette .color');
  for (let i = 0; i < botaoCor.length; i += 1) {
    botaoCor[i].style.backgroundColor = listaDeCores[i];
  }
}
opcCores(colorList);

function delBoard() {
  let board = document.querySelector('#pixel-board');
  let linhas = document.querySelectorAll('.line');
  for (let i = 0; i < linhas.length; i += 1) {
    let rem = document.querySelector('.line');
    rem.remove();
  }
}

function maiorMenor(size) {
  let resp = false;
  if (size > 0) {
    resp = true;
  } else if (size === '') {
    alert('Board inválido!');
  }
  return resp;
}

function boardSize() {
  let genBoard = document.querySelector('#generate-board');
  genBoard.addEventListener('click', function () {
    let boardSi = document.querySelector('#board-size');
    let size = boardSi.value;
    if (maiorMenor(size) === true) {
      console.log('teste');
      delBoard();
      createBoard(size);
      drawPixels();
      clearBoard();
    }
  });
}
boardSize();

function createBoard(size) {
  if (size < 5) {
    size = 5;
  } else if (size > 50) {
    size = 50;
  }
  for (let i = 0; i < size; i += 1) {
    let quadro = document.querySelector('#pixel-board');
    let createLine = document.createElement('div');
    createLine.className = 'line';
    for (let i = 0; i < size; i += 1) {
      let createPixel = document.createElement('div');
      createPixel.className = 'pixel';
      createLine.appendChild(createPixel);
    }
    quadro.appendChild(createLine);
  }
}
createBoard(5);

function chooseColor() {
  let opcCores = document.querySelectorAll('#color-palette .color');
  for (let i = 0; i < opcCores.length; i += 1) {
    opcCores[i].addEventListener('click', function () {
      for (let index = 0; index < opcCores.length; index += 1) {
        opcCores[index].className = 'color';
      }
      opcCores[i].className = 'color selected';
    });
  }
}
chooseColor();

function drawPixels() {
  let pixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', function () {
      let selectedColor = document.querySelector('.selected');
      let colorChosed = selectedColor.style.backgroundColor;
      pixels[i].style.backgroundColor = colorChosed;
    });
  }
}
drawPixels();

function clearBoard() {
  let clearButton = document.querySelector('#clear-board');
  let pixels = document.querySelectorAll('.pixel');
  clearButton.addEventListener('click', function () {
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = 'white';
    }
  });
}

clearBoard();
