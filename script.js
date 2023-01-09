function addOnList() {
  let taskList = document.querySelector('#lista-tarefas');
  let contentText = document.querySelector('#texto-tarefa');
  let createTask = document.createElement('li');
  createTask.innerText = contentText.value;
  createTask.className = 'tasks';
  taskList.appendChild(createTask);
}

function delInputText() {
  let contentText = document.querySelector('#texto-tarefa');
  contentText.value = '';
}

function createTask() {
  let button = document.querySelector('#criar-tarefa');
  button.addEventListener('click', function () {
    addOnList();
    delInputText();
    selecTask();
    selecFinishedTask();
    callHover();
  });
}

createTask();

function selecTask() {
  let opcList = document.querySelectorAll('.tasks');
  for (let i = 0; i < opcList.length; i += 1) {
    opcList[i].addEventListener('click', function () {
      for (let index = 0; index < opcList.length; index += 1) {
        opcList[index].classList.remove('selected');
      }
      opcList[i].classList.add('selected');
    });
  }
}
selecTask();

function selecFinishedTask() {
  let opcList = document.querySelectorAll('.tasks');
  for (let i = 0; i < opcList.length; i += 1) {
    opcList[i].addEventListener('dblclick', function () {
      opcList[i].classList.add('completed');
    });
  }
}
selecFinishedTask();

function delSelecFinishedTask() {
  let opcList = document.querySelectorAll('.completed');
  for (let i = 0; i < opcList.length; i += 1) {
    opcList[i].addEventListener('dblclick', function () {
      opcList[i].classList.remove('completed');
    });
  }
}

function callFin() {
  selecFinishedTask();
  delSelecFinishedTask();
}

function callHover() {
  let opcList = document.querySelectorAll('.tasks');
  for (let i = 0; i < opcList.length; i += 1) {
    opcList[i].addEventListener('dblclick', function () {
      callFin();
    });
  }
}
callHover();

function deleteAllTasks() {
  let tasks = document.getElementsByTagName('ol')[0];
  let button = document.querySelector('#apaga-tudo');
  button.addEventListener('click', function () {
    let listT = document.querySelectorAll('.tasks');
    for (let i = 0; i < listT.length; i += 1) {
      let tarefa = document.querySelector('li');
      tasks.removeChild(tarefa);
    }
  });
}
deleteAllTasks();

function deleteCompTasks() {
  let tasks = document.getElementsByTagName('ol')[0];
  let button = document.querySelector('#remover-finalizados');
  button.addEventListener('click', function () {
    let listT = document.querySelectorAll('.completed');
    for (let i = 0; i < listT.length; i += 1) {
      let tarefa = document.querySelector('.completed');
      tasks.removeChild(tarefa);
    }
  });
}
deleteCompTasks();

function deleteSelTasks() {
  let tasks = document.getElementsByTagName('ol')[0];
  let button = document.querySelector('#remover-selecionado');
  button.addEventListener('click', function () {
    let listT = document.querySelectorAll('.selected');
    for (let i = 0; i < listT.length; i += 1) {
      let tarefa = document.querySelector('.selected');
      tasks.removeChild(tarefa);
    }
  });
}
deleteSelTasks();

function loadTasks() {
  let taskTextList = localStorage.getItem('taskText');
  let taskClassList = localStorage.getItem('taskClass');
  if (taskTextList == '' || taskTextList == null) {
    console.log('Lista Vazia');
  } else {
    let taskText = taskTextList.split(',');
    let taskClass = taskClassList.split(',');
    let taskList = document.querySelector('#lista-tarefas');
    for (let i = 0; i < taskText.length; i += 1) {
      let createTask = document.createElement('li');
      createTask.innerText = taskText[i];
      createTask.className = taskClass[i];
      taskList.appendChild(createTask);
    }
  }
}
loadTasks();

function saveTasks() {
  let button = document.querySelector('#salvar-tarefas');
  button.addEventListener('click', function () {
    let taskList = document.querySelectorAll('.tasks');
    let storageTask = [];
    let storageClass = [];
    for (let i = 0; i < taskList.length; i += 1) {
      storageTask.push(taskList[i].innerText);
      storageClass.push(taskList[i].className);
    }
    localStorage.setItem('taskText', storageTask);
    localStorage.setItem('taskClass', storageClass);
  });
}
saveTasks();

//parte do codigo a baixo foi modificado daqui: https://stackoverflow.com/questions/46724542/javascript-move-elements-up-and-down-in-the-list

function taskUp() {
  let button = document.querySelector('#mover-cima');
  button.addEventListener('click', function () {
    let selecionado = document.querySelector('.selected');
    if (selecionado == '' || selecionado == null) {
      console.log('nao pode ir mais para cima');
    } else {
      if (selecionado.previousElementSibling) {
        selecionado.parentNode.insertBefore(
          selecionado,
          selecionado.previousElementSibling
        );
      }
    }
  });
}
taskUp();

function taskDown() {
  let button = document.querySelector('#mover-baixo');
  button.addEventListener('click', function () {
    let selecionado = document.querySelector('.selected');
    if (selecionado == '' || selecionado == null) {
      console.log('nao pode ir mais para baixo');
    } else {
      if (selecionado.nextElementSibling) {
        selecionado.parentNode.insertBefore(
          selecionado.nextElementSibling,
          selecionado
        );
      }
    }
  });
}
taskDown();
