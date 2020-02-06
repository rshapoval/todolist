'use strict';

var todo = document.querySelector('.todo');
var todoNew = todo.querySelector('.todo__new');
var todoListCurrent = todo.querySelector('.todo__list--current');
var todoListDone = todo.querySelector('.todo__list--done');
var todoCount = todo.querySelector('.todo__count');
var todoMessage = todo.querySelector('.todo__message');
var idMask = 'task_';
var taskId = 0;

todoNew.addEventListener('change', addTask);
todoNew.addEventListener('change', addCount);

showTasks();
setId();

function addTask() {
  var value = todoNew.value;

  createTask(value);
  localStorage.setItem(idMask + taskId, value);
  taskId++;

  todoNew.value = '';
  todoNew.focus();
}

function createTask(value, localTaskId) {
  var todoItem = document.createElement('li');
  var todoCheck = document.createElement('input');
  var todoBtnDel = document.createElement('button');

  if (localTaskId) {
    taskId = localTaskId;
  }

  todoItem.classList.add('todo__item');
  todoItem.setAttribute('data-id', idMask + taskId);
  todoCheck.classList.add('todo__check');
  todoCheck.setAttribute('type', 'checkbox');
  todoBtnDel.classList.add('todo__del');
  todoBtnDel.textContent = 'x';

  todoItem.textContent = value;
  todoItem.prepend(todoCheck);
  todoItem.append(todoBtnDel);
  todoListCurrent.append(todoItem);

  todoBtnDel.addEventListener('click', delTask);
  todoCheck.addEventListener('click', checkTask);

  todoBtnDel.addEventListener('click', addCount);
  todoCheck.addEventListener('click', addCount);
}

function delTask() {
  var task = this.parentNode;
  var key = task.getAttribute('data-id');
  localStorage.removeItem(key);
  task.parentNode.removeChild(task);
}

function checkTask() {
  var task = this.parentNode;
  if (this.checked === true) {
    todoListDone.append(task);
  } else {
    todoListCurrent.append(task);
  }
}

function addCount() {
  var allTasks = todo.querySelectorAll('.todo__item');
  var percent = 0;

  if (allTasks.length) {
    var doneTasks = todoListDone.querySelectorAll('.todo__item');
    var totalAmount = allTasks.length;
    var totalDone = doneTasks.length;
    percent = totalDone / totalAmount;

    todoCount.textContent = totalDone + '/' + totalAmount;

    showMessage(percent);
    displayProgress(percent);

  } else {
    todoCount.textContent = '';
    todoMessage.textContent = '';

    displayProgress(percent);
  }
}

function showMessage(percent) {
  switch (true) {
    case (percent <= 0):
      todoMessage.textContent = 'Начни наконец!';
      break;

    case (percent <= 0.25):
      todoMessage.textContent = 'Лучше чем ничего.';
      break;
    case (percent <= 0.5):
      todoMessage.textContent = 'Ну такое.';
      break;
    case (percent <= 0.75):
      todoMessage.textContent = 'Ты на верном пути.';
      break;
    case (percent < 1):
      todoMessage.textContent = 'Не думал, что ты это сможешь.';
      break;
    case (percent === 1):
      todoMessage.textContent = 'Мог бы и быстрее!';
      break;

    default:
      todoMessage.textContent = 'Сверхчеловек?!';
      break;
  }
}

function displayProgress(percent) {
  var progressBar = document.querySelector('.progressbar');
  var width = (percent * 100).toFixed(0);

  progressBar.style.width = width + '%';
}

function showTasks() {
  if (localStorage.length) {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      var localTaskId = parseInt(key.slice(5), 10);

      createTask(value, localTaskId);
    }
  }
}

function setId() {
  if (localStorage.length) {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var localTaskId = parseInt(key.slice(5), 10);

      if (localTaskId >= taskId) {
        taskId = localTaskId;
        taskId++;
      }
    }
  }
}
