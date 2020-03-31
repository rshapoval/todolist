'use strict';

var themeSwitch = document.querySelector('.theme-switch');
var themeSwitchInput = themeSwitch.querySelector('.theme-switch__input');

var body = document.body;
var todo = document.querySelector('.todo');
var todoNew = todo.querySelector('.todo__new');
var todoListCurrent = todo.querySelector('.todo__list--current');
var todoListDone = todo.querySelector('.todo__list--done');
var todoCount = todo.querySelector('.todo__count');
var todoMessage = todo.querySelector('.todo__message');
var progressBar = document.querySelector('.progressbar');
var idMask = 'task_';
var idMaskCheck = 'checkedtask_';
var taskId = 0;

themeSwitchInput.addEventListener('change', toggleTheme);

todoNew.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    addTask();
    addCount();
  }
});

showTasks();
setId();
addCount();

// Toggle theme
function toggleTheme() {
  if (themeSwitchInput.checked) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
}

// Adding new task
function addTask() {
  var value = todoNew.value;

  createTask(value);
  localStorage.setItem(idMask + taskId, value);
  taskId++;

  todoNew.value = '';
  todoNew.focus();
}

// Task creation
function createTask(value, localMask, localTaskId) {
  var todoItem = document.createElement('li');
  var todoCheck = createCheckbox();
  var todoValue = document.createElement('span');
  var todoBtnDel = document.createElement('button');

  if (localTaskId) {
    taskId = localTaskId;
  }

  todoItem.classList.add('todo__item');
  todoItem.setAttribute('data-id', idMask + taskId);
  todoValue.classList.add('todo__value');
  todoValue.textContent = value;
  todoBtnDel.classList.add('todo__del');

  todoItem.prepend(todoCheck);
  todoItem.append(todoValue, todoBtnDel);

  if (localMask !== 'checkedtask') {
    todoListCurrent.append(todoItem);
  } else {
    todoItem.setAttribute('data-id', idMaskCheck + taskId);
    todoCheck.querySelector('.check__input').checked = true;
    todoListDone.append(todoItem);
  }

  todoBtnDel.addEventListener('click', delTask);
  todoCheck.addEventListener('click', checkTask);
  todoBtnDel.addEventListener('click', addCount);
  todoCheck.addEventListener('click', addCount);
}

// Create custom checkbox
function createCheckbox() {
  var check = document.createElement('label');
  var checkInput = document.createElement('input');
  var checkBox = document.createElement('span');

  check.classList.add('check', 'todo__check');
  checkInput.classList.add('check__input');
  checkInput.setAttribute('type', 'checkbox');
  checkBox.classList.add('check__box');
  checkBox.setAttribute('aria-hidden', 'true');

  check.append(checkInput, checkBox);

  return check;
}

// Delete task
function delTask() {
  var task = this.parentNode;
  var key = task.getAttribute('data-id');

  localStorage.removeItem(key);
  task.parentNode.removeChild(task);
}

// Adding a progress mark, unchecking a progress mark
function checkTask() {
  var task = this.parentNode;
  var todoValue = task.querySelector('.todo__value');
  var key = task.getAttribute('data-id');
  var currentTaskId = parseInt(key.slice(5), 10);
  localStorage.removeItem(key);
  var value = todoValue.innerText;

  if (this.querySelector('.check__input').checked === true) {
    task.setAttribute('data-id', idMaskCheck + currentTaskId);
    localStorage.setItem(idMaskCheck + currentTaskId, value);
    todoListDone.append(task);
  } else {
    task.setAttribute('data-id', idMask + taskId);
    localStorage.setItem(idMask + taskId, value);
    todoListCurrent.append(task);
    taskId++;
  }
}

// Adding a task counter
function addCount() {
  var allTasks = todo.querySelectorAll('.todo__item');
  var percent = 0;

  if (allTasks.length) {
    var doneTasks = todoListDone.querySelectorAll('.todo__item');
    var totalAmount = allTasks.length;
    var totalDone = doneTasks.length;
    percent = totalDone / totalAmount;

    todoCount.textContent = totalDone + '/' + totalAmount;
    todo.style.backgroundImage = 'none';

    showMessage(percent);
    showProgress(percent);
  } else {
    todoCount.textContent = '';
    todoMessage.textContent = '';
    todo.style.backgroundImage = '';

    showProgress(percent);
  }
}

// Message display
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

// Show progress
function showProgress(percent) {
  var width = (percent * 100).toFixed(0);
  progressBar.style.width = width + '%';
}

// Output task from localStorage
function showTasks() {
  if (localStorage.length) {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      var idSeparator = key.indexOf('_');
      var localMask = key.slice(0, idSeparator);
      var localTaskId = parseInt(key.slice(idSeparator + 1), 10);

      createTask(value, localMask, localTaskId);
    }
  }
}

// Set id
function setId() {
  if (localStorage.length) {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var idSeparator = key.indexOf('_');
      var localTaskId = parseInt(key.slice(idSeparator + 1), 10);

      if (localTaskId >= taskId) {
        taskId = localTaskId;
        taskId++;
      }
    }
  }
}
