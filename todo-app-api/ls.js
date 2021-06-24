import {
  checkTodoItemStatus
} from "./totdo-app.js";
// массив объектов дел, которые будут храниться в локальном хранилище
let todoArr = [];
// проверка на true/false ключа 'done'
export function changeTodoDone(arr, todoItem) {
  arr.map(obj => {
    if (obj.id === todoItem.item.id & obj.done === false) {
      obj.done = true;
    } else if (obj.id === todoItem.item.id & obj.done === true) {
      obj.done = false;
    };
  });
}
// перезаписываем изменение масива с готовым или активным делом
export function switchStatusOfItem(item, lSkey) {
  todoArr = JSON.parse(localStorage.getItem(lSkey));
  checkTodoItemStatus('', item);
  changeTodoDone(todoArr, item);
  localStorage.setItem(lSkey, JSON.stringify(todoArr));
}
// перезаписываем изменение масива с удаленным делом
export function deleteTodoItemLS(item, lSkey) {
  if (confirm('Вы уверены?')) {
    const deleteItemId = item.item.id;
    let getLocalStorageData = localStorage.getItem(lSkey);
    let todoArr = JSON.parse(getLocalStorageData);

    const newList = todoArr.filter(item => item.id !== deleteItemId);
    localStorage.setItem(lSkey, JSON.stringify(newList));

    item.item.remove();
  }
}
// создаем и добавляем в массив локального хранилища новый обЪект дела
export function setObjToLS(item, itemForm, lSkey) {
  todoArr = JSON.parse(localStorage.getItem(lSkey));
  let getLocalStorageData = localStorage.getItem(lSkey);
  if (getLocalStorageData == null) {
    todoArr = [];
  } else {
    todoArr = JSON.parse(getLocalStorageData);
  }
  const addTodoObj = (arr) => {
    const todoObj = {};
    todoObj.id = item.item.id;
    todoObj.name = itemForm.input.value;
    todoObj.done = false;

    arr.push(todoObj);
  };
  addTodoObj(todoArr);
  localStorage.setItem(lSkey, JSON.stringify(todoArr));
}