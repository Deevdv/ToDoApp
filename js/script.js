
window.addEventListener('load', () => {

    //creating global varaible and declaring variables
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    // localStorage used to add username
    const username = localStorage.getItem('username') || '';
    nameInput.value = username;

    //localStorage used to update current usernmae entry 
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        //targetting html content values
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        //add new todo to todos array
        todos.push(todo)

        //sort the todo items by created date
        sorted_todos = todos.sort(function (a, b) {
            return b.createdAt - a.createdAt
        });

        //save the sorted_todos to localStorage       
        localStorage.setItem('todos', JSON.stringify(sorted_todos));
        e.target.reset();

        DisplayTodos();
    })

    DisplayTodos();
})

//created funtion to display todos
function DisplayTodos() {

    //todo list element to push new todos
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')

        //const variables to create various elements
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        //inputs element to allow checking 
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        //if statement used to check either personal or busniess
        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        //adding classLists
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        //fetching actual content from HTML
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        //appending all the elements
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        //if statement to add done when todo has been completed
        if (todo.done) {
            todoItem.classList.add('done');
        }

        //onlick created to check if todo has been done
        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            //if statement to check if done else remove
            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        //onlick event for edit button
        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();

            //eventListener and setAttribute to allow edit button functionality
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        //adding delete button functionality
        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })

    })
}