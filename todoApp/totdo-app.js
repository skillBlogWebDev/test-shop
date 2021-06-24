// Создаем и возвращаем заголовок страницы
function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

// Создаем и возвращаем форму для создания дела
function createTodoItemForm() {
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

const createTodoList = () => {
  const list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
};

let todoArr = [];

function createTodoItem(name) {
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

const changeTodoDone = (arr, todoItem) => {
  arr.map(obj => {
    if (obj.id === todoItem.item.id & obj.done === false) {
      obj.done = true;
    } else if (obj.id === todoItem.item.id & obj.done === true) {
      obj.done = false;
    };
  });
}

function switchStatusOfItem(item, btn) {
  btn.addEventListener('click', () => {
  todoArr = JSON.parse(localStorage.getItem(lSkey));
  item.item.classList.toggle('list-group-item-success');
  changeTodoDone(todoArr, item);

  localStorage.setItem(lSkey, JSON.stringify(todoArr));
});
}

function deleteTodoItem(item, btn) {
  btn.addEventListener('click', () => {
  if (confirm('Вы уверены?')) {
    const deleteItemId = item.item.id;
    const newList = todoArr.filter(item => item.id !== deleteItemId);
    let getLocalStorageData = localStorage.getItem(lSkey);

    todoArr = JSON.parse(getLocalStorageData);
    localStorage.setItem(lSkey, JSON.stringify(newList));

    item.item.remove();
  }
});
}

function createTodoApp(container, title, lSkey) {
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  if (localStorage.getItem(lSkey)) {
    todoArr = JSON.parse(localStorage.getItem(lSkey));

    for (let elemObj of todoArr) {
      let todoItem = createTodoItem();

      todoItem.item.innerHTML = elemObj.name;
      todoItem.item.id = elemObj.id;

      if (elemObj.done == true) {
        todoItem.item.classList.add('list-group-item-success');
      } else {
        todoItem.item.classList.remove('list-group-item-success');
      }

      // добавляем обработчики на кнопки
      switchStatusOfItem(todoItem, todoItem.doneButton);
      deleteTodoItem(todoItem, todoItem.deleteButton);

      todoList.append(todoItem.item);
      todoItem.item.append(todoItem.bouttonGroup);
    }
  }

  // браузер создает событие 'submit' на форме по нажатию на Enter или на кнопку создания дела
  todoItemForm.form.addEventListener('submit', function (e) {
    // эта строчка необхадима, чтобы предотвратить стандартное действие браузера
    // в данном случае мы не хотим, чтобы страница перезагружалась при отпрвке формы
    e.preventDefault();

    let todoItem = createTodoItem(todoItemForm.input.value);

    todoArr = JSON.parse(localStorage.getItem(lSkey));

    let getLocalStorageData = localStorage.getItem(lSkey);
    if (getLocalStorageData == null) {
      todoArr = [];
    } else {
      todoArr = JSON.parse(getLocalStorageData);
    }
    const addTodoObj = (arr) => {
      const todoObj = {};
      todoObj.id = todoItem.item.id;
      todoObj.name = todoItemForm.input.value;
      todoObj.done = false;

      arr.push(todoObj);
    };
    addTodoObj(todoArr);
    localStorage.setItem(lSkey, JSON.stringify(todoArr));

    // игнорируем создание элемента, если пользователь ничего не ввел в поле
    if (!todoItemForm.input.value) {
      return;
    }

    // добавляем обработчики на кнопки
    switchStatusOfItem(todoItem, todoItem.doneButton);
    deleteTodoItem(todoItem, todoItem.deleteButton);
    // создаем и добавляем в список новое дело с названием из поля для ввода
    todoList.append(todoItem.item);
    // обнуляем значение в поле, чтобы чтобы не пришлось стирать его вручную
    todoItemForm.input.value = '';
    // делаем кнопку снова неактивной после добавления дела
    todoItemForm.button.disabled = !todoItemForm.button.disabled;
  });
}

window.createTodoApp = createTodoApp;
