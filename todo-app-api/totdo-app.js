import {
  lSApiKey1
} from './switch_storage.js';
const doneClass = 'list-group-item-success';
// проверяем выполнено ли дело 
export function checkTodoItemStatus(obj, elemItem) {
  if (obj.done) {
    elemItem.item.classList.toggle(doneClass);
  }
  elemItem.item.classList.toggle(doneClass);
}
// Создаем и возвращаем заголовок страницы
export function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}
// Создаем и возвращаем форму для создания дела
export function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  button.disabled = !input.value.length;
  input.addEventListener('input', () => {
    button.disabled = !input.value.length;
  });

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}
// создаем и вoзвращаем список
export const createTodoList = () => {
  const list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
};
// сздаем и возвращаем элемент списка
export function createTodoItemElement(name) {
  let item = document.createElement('li');
  // кнопки помещаем в элемент, который красиво покажет их в одной группе
  let bouttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  // устанавливаем стили для элемента списка, а также для размещения кнопок
  // в его правой части с помощью flex
  const randomID = Math.random() * 15.75;
  item.id = randomID.toFixed(2);
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

  item.textContent = name;

  bouttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
  bouttonGroup.append(doneButton);
  bouttonGroup.append(deleteButton);
  item.append(bouttonGroup);

  // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатавать события нажатия
  return {
    item,
    doneButton,
    bouttonGroup,
    deleteButton,
  }
}
// изменяем/удаляем элемент из серверного хранилища
function changeItemAPI(todoItem, {
  onDone,
  onDelete
}) {
  let todoItemList = createTodoItemElement();
  if (localStorage.getItem(lSApiKey1)) {
    if (todoItem.done) {
      todoItemList.item.classList.toggle(doneClass);
    }

    todoItemList.item.textContent = todoItem.name;

    todoItemList.doneButton.addEventListener('click', () => {
      onDone({
        todoItem,
        element: todoItemList.item
      });
      todoItemList.item.classList.toggle(doneClass, todoItem.done);
    });

    todoItemList.deleteButton.addEventListener('click', () => {
      onDelete({
        todoItem,
        element: todoItemList.item
      });
    });
  } else {
    return;
  }
  todoItemList.item.append(todoItemList.bouttonGroup);
  return todoItemList.item;
}
// изменяем/удаляем элемент из локального хранилища
function changeItemLS(btnDone, btnDel, item, lSkey, toDone, toDelete) {
  btnDone.addEventListener('click', () => {
    toDone(item, lSkey);
  })
  btnDel.addEventListener('click', () => {
    toDelete(item, lSkey);
  })
}

export async function createTodoApp({
  container,
  lSkey,
  title
}, {
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick,
  setObjToLS,
  toDone,
  toDelete
}, switchBtn) {

  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();
  switchBtn.innerHTML = 'Перейти на серверное хранилище';

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  const handlers = {
    onDone: onDoneClick,
    onDelete: onDeleteClick
  };
  // отрисовываем элемент из серверного хранилища
  todoItemList.forEach(e => {
    if (localStorage.getItem(lSApiKey1)) {
      const todoItemElement = changeItemAPI(e, handlers);
      todoList.append(todoItemElement);
      switchBtn.innerHTML = 'Перейти на локальное хранилище';
    } else {
      return;
    }
  });
  // отрисовываем элемент из локального хранилища
  let todoArr = JSON.parse(localStorage.getItem(lSkey));
  if (localStorage.getItem(lSkey)) {
    for (let elemObj of todoArr) {
      let todoItem = createTodoItemElement();

      todoItem.item.innerHTML = elemObj.name;
      todoItem.item.id = elemObj.id;

      if (elemObj.done) {
        todoItem.item.classList.toggle(doneClass);
      }

      changeItemLS(todoItem.doneButton,
        todoItem.deleteButton,
        todoItem,
        lSkey,
        toDone,
        toDelete);

      todoList.append(todoItem.item);
      todoItem.item.append(todoItem.bouttonGroup);
    }
  }
  // браузер создает событие 'submit' на форме по нажатию на Enter или на кнопку создания дела
  todoItemForm.form.addEventListener('submit', async function (e) {
    // эта строчка необхадима, чтобы предотвратить стандартное действие браузера
    // в данном случае мы не хотим, чтобы страница перезагружалась при отпрвке формы
    e.preventDefault();

    // проверка, какое хранлище выбрано
    if (localStorage.getItem(lSApiKey1)) {
      const todoItem = await onCreateFormSubmit({
        owner,
        name: todoItemForm.input.value.trim(),
      });

    } else {
      let todoItem = createTodoItemElement(todoItemForm.input.value);
      setObjToLS = setObjToLS(todoItem, todoItemForm, lSkey);
      changeItemLS(todoItem.doneButton,
        todoItem.deleteButton,
        todoItem,
        lSkey,
        toDone,
        toDelete);
      todoList.append(todoItem.item);
    }
    // обнуляем значение в поле, чтобы не пришлось стирать его вручную
    todoItemForm.input.value = '';
    // делаем кнопку снова неактивной после добавления дела
    todoItemForm.button.disabled = !todoItemForm.button.disabled;
  });
}

window.createTodoApp = createTodoApp;