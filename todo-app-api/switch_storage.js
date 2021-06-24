export const apiKey = 'api';
const lskey = 'localStorage';
export const lSApiKey1 = 'api-stor-1';
export const lSApiKey2 = 'api-stor-2';
const switchBtn = document.querySelector('.switch-btn');
// По нажатию на кнопку переключения устанавливаем ключь для каждого хранилища в localStiorage
switchBtn.addEventListener('click', () => {
    if (localStorage.getItem(lSApiKey1)) {
        localStorage.removeItem(lSApiKey1);
        localStorage.setItem(lSApiKey2, JSON.stringify(lskey));
    } else {
        localStorage.setItem(lSApiKey1, JSON.stringify(apiKey));
        localStorage.removeItem(lSApiKey2);
    }

    location.reload();
});
// функция переключения на локальное хранилище
export function callTodoAppLS(own) {
    import('./totdo-app.js').then(({
        createTodoApp
    }) => {
        import('./ls.js').then(({
            setObjToLS,
            switchStatusOfItem,
            deleteTodoItemLS
        }) => {
            createTodoApp({
                container: document.getElementById('todo-app-1'),
                lSkey: `todo-${own}`,
                title: `Список дел-${own}`,
            }, 
            { 
                setObjToLS: setObjToLS,
                toDone: switchStatusOfItem,
                toDelete: deleteTodoItemLS 
            }, 
            document.querySelector('.switch-btn'));
        })
    });
}
// функция переключения на серверное хранилище
export function callTodoAppApi(own) {

    import('./totdo-app.js').then(({
        createTodoApp
    }) => {
        import('./api.js').then(({
            getTodoList,
            createTodoItem,
            switchTodoItemDone,
            deleteTodoItem
        }) => {
            const owner = `Я-${own}`;
            (async () => {
                const todoItemList = await getTodoList(owner);
                createTodoApp({
                    container: document.getElementById('todo-app-1'),
                    title: `Список дел-${own}`,
                }, {
                    owner,
                    todoItemList,
                    onCreateFormSubmit: createTodoItem,
                    onDoneClick: switchTodoItemDone,
                    onDeleteClick: deleteTodoItem,
                }, document.querySelector('.switch-btn'));
            })();
        });
    });
}