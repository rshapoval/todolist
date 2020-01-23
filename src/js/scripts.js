'use strict';

var todo = document.querySelector('.todo');
var todoNew = todo.querySelector('.todo__new');
var todoListCurrent = todo.querySelector('.todo__list--current');
var todoListDone = todo.querySelector('.todo__list--done');
var todoCount = todo.querySelector('.todo__count');
var todoMessage = todo.querySelector('.todo__message');

todoNew.addEventListener('change', addTask);
todoNew.addEventListener('change', addCount);

function addTask() {
  var value = todoNew.value;

  createTask(value);

  todoNew.value = '';
  todoNew.focus();
}

function createTask(value) {
  var todoItem = document.createElement('li');
  var todoCheck = document.createElement('input');
  var todoBtnDel = document.createElement('button');

  todoItem.classList.add('todo__item');
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
  this.parentNode.parentNode.removeChild(this.parentNode);
}

function checkTask() {
  var item = this.parentNode;
  if (this.checked === true) {
    todoListDone.append(item);
  } else {
    todoListCurrent.append(item);
  }
}

function addCount() {
  var currentItems = todo.querySelectorAll('.todo__item');

  if (currentItems.length) {
    var doneItems = todoListDone.querySelectorAll('.todo__item');
    var totalAmount = currentItems.length;
    var totalDone = doneItems.length;
    var percent = totalDone / totalAmount;

    todoCount.textContent = totalDone + '/' + totalAmount;

    showMessage(percent);

  } else {
    todoCount.textContent = '';
    todoMessage.textContent = '';
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
