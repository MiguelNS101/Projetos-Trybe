let button = document.querySelector('#criar-carta');
let cartaGerad = document.querySelector('#carta-gerada');
const styleClassList = [`newspaper`, `magazine1`, `magazine2`];
const sizeClassList = [`medium`, `big`, `reallybig`];
const rotateClassList = [`rotateleft`, `rotateright`];
const skewClassList = [`skewleft`, `skewright`];
button.addEventListener('click', function () {
  cartaGerad.innerText = '';
  let contentText = document.querySelector('#carta-texto');
  if (contentText.value.match(/^\s*$/)) {
    cartaGerad.innerText = 'Por favor, digite o conteúdo da carta.';
  } else {
    let textoSeparado = contentText.value.split(' ');
    for (let i = 0; i < textoSeparado.length; i += 1) {
      let createCarta = document.createElement('span');
      createCarta.innerText = textoSeparado[i];
      let styleClass = chooseClass(styleClassList);
      let sizeClass = chooseClass(sizeClassList);
      let rotateClass = chooseClass(rotateClassList);
      let skewClass = chooseClass(skewClassList);
      createCarta.classList.add(styleClass);
      createCarta.classList.add(sizeClass);
      createCarta.classList.add(rotateClass);
      createCarta.classList.add(skewClass);
      cartaGerad.appendChild(createCarta);
      let contaPalav = document.querySelector('#carta-contador');
      contaPalav.innerText = textoSeparado.length;
    }
    changeClass();
  }
});

//codigo abaixo parciamente retirado de https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
function chooseClass(classOpt) {
  const random = Math.floor(Math.random() * classOpt.length);
  return classOpt[random];
}

function changeClass() {
  let letterButton = document.getElementsByTagName('span');
  console.log(letterButton.length);
  for (let i = 0; i < letterButton.length; i += 1) {
    letterButton[i].addEventListener('click', function () {
      let styleClass = chooseClass(styleClassList);
      let sizeClass = chooseClass(sizeClassList);
      let rotateClass = chooseClass(rotateClassList);
      let skewClass = chooseClass(skewClassList);
      letterButton[i].className =
        styleClass + ' ' + sizeClass + ' ' + rotateClass + ' ' + skewClass;
    });
  }
}
