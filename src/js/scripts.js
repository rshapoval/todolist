'use strict';

var todo = document.querySelector('.todo');
var todoNew = todo.querySelector('.todo__new');
var todoListCurrent = todo.querySelector('.todo__list--current');
var todoListDone = todo.querySelector('.todo__list--done');

todoNew.addEventListener('change', addTask);

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
