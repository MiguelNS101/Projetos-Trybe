const btnFornSubmit = document.querySelector('.btn-header-submit');
const emailFormHeader = document.getElementsByName('email')[0];
const passwordFormHeader = document.getElementsByName('password')[0];
const counter = document.getElementById('counter');
const textAreaSelector = document.getElementById('textarea');

function loginCredentials() {
  if (emailFormHeader.value === 'tryber@teste.com' && passwordFormHeader.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}
btnFornSubmit.addEventListener('click', loginCredentials);

function changeButtonState() {
  const button = document.querySelector('#submit-btn');
  if (button.disabled === true) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

const checkBox = document.querySelector('#agreement');
checkBox.addEventListener('click', changeButtonState);

const dados = ['Nome: ',
  'Email: ',
  'Casa: ',
  'Família: ',
  'Matérias: ',
  'Avaliação: ',
  'Observações: '];

function getValorCheck(list) {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].checked === true) {
      return list[i].value;
    }
  }
}

textAreaSelector.addEventListener('input', (event) => {
  const currentLength = event.target.value.length;
  counter.innerHTML = `Caracteres: ${500 - currentLength}`;
});

function getValorCheckSub(list) {
  const subjectList = [];
  const blankSpace = ' ';
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].checked === true) {
      const valorPush = blankSpace + list[i].value;
      subjectList.push(valorPush);
    }
  }
  return subjectList;
}

function getValor() {
  const name = document.querySelector('#input-name').value;
  const lastName = document.querySelector('#input-lastname').value;
  const email = document.querySelector('#input-email').value;
  const houseWarts = document.querySelector('#house').value;
  const family = document.querySelectorAll('.familiaClass');
  const subject = document.querySelectorAll('.subject');
  const rating = document.querySelectorAll('.ratingClass');
  const textArea = document.querySelector('#textarea').value;
  const familyValor = getValorCheck(family);
  const subjectValor = getValorCheckSub(subject);
  const ratingValor = getValorCheck(rating);
  const blankSpace = ' ';
  const compName = name + blankSpace + lastName;
  const lista = [compName, email, houseWarts, familyValor, subjectValor, ratingValor, textArea];
  return lista;
}

function createDados(dadosInf, valorInf) {
  const formSection = document.querySelector('#evaluation-form');
  formSection.innerHTML = '';
  for (let i = 0; i < 7; i += 1) {
    const createP = document.createElement('p');
    createP.innerHTML = dadosInf[i] + valorInf[i];
    createP.classList = 'formCenter';
    formSection.appendChild(createP);
  }
}

function submitForm() {
  const valor = getValor();
  createDados(dados, valor);
}

const submitButton = document.querySelector('#submit-btn');
submitButton.addEventListener('click', submitForm);
