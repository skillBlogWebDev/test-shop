// получаем список дел
export async function getTodoList(owner) {
  const respons = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  return await respons.json();
};
// получаем обЪект для создания дела
export async function createTodoItem({
  owner,
  name
}) {

  const respons = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    body: JSON.stringify({
      name,
      owner,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
// проверка на true/false ключа 'done'
export function switchTodoItemDone({
  todoItem
}) {
  todoItem.done = !todoItem.done;
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      done: todoItem.done
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
// удаление объекта дела 
export function deleteTodoItem({
  element,
  todoItem
}) {
  if (!confirm('Вы уверены')) {
    return;
  }
  element.remove();
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'DELETE',
  });
}