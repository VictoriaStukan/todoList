// Name of Elements 
const input = document.querySelector('.form-input');
const btn = document.querySelector('.btn');
const todoContainer = document.querySelector('.todo-container');

// Add New Tasks
let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index})"  type="checkbox" class="btn-complete" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="btn-delete deletion">Delete</button>
            </div>
        </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks];
}

const fillHtmlList = () => {
    todoContainer.innerHTML = '';
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todoContainer.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
    
const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

btn.addEventListener('click', () => {
    tasks.push(new Task(input.value));
    updateLocal();
    fillHtmlList();
    input.value = '';
})

// Delete Tasks
const deleteTask = index => {
    todoItemElems[index].classList.add('deletion');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    },500)
}
























// Uppercase
// let spanElem = document.querySelectorAll('span');

// for (let i = 0; i < spanElem.length; i++) {
// 	spanElem[i].addEventListener('click', () => {
// 		spanElem[i].classList.toggle('active');
// 	});
// }
