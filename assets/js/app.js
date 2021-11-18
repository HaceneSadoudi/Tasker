'use strict'

// Dom Elements
var switch_mode = document.querySelector("label[for='switch-l']"),
    new_task_input   = document.querySelector("input.new-task"),
    task_remove_btns = document.querySelectorAll('a.todo-list-remove'),
    left_items_element = document.querySelector("span.left-items"),
    todo_list = document.querySelector('ul#todo-list'),
    clear_all = document.querySelector('#clear-all'),
    all_btn = document.querySelector("#controls .all-btn"),
    active_btn = document.querySelector("#controls .active-btn"),
    completed_btn = document.querySelector("#controls .completed-btn");

var store = [];
var theme = 'light';

function init() {
    // get All task from localStorage
    if(localStorage.getItem('store')) {
        store = JSON.parse(localStorage.getItem('store'));
    }
    for(const obj of store) {
        createNewTask(obj.title, obj.id, obj.status);
        updateLeftItems();
    }
    // Get theme from localStorage
    if(localStorage.getItem('theme')) {
        theme = JSON.parse(localStorage.getItem('theme'));
    }
    document.body.classList.add(theme);

}

function getTotalTasks() {
    return todo_list.childElementCount;
    // --OR--
    /*let lis = document.querySelectorAll('.todo-list-task');
    return lis.length;*/
}
function getCompletedTasks() {
    let completedTasks = 0;
    let tasks = todo_list.children;
    for(const task of tasks) {
        if(task.classList.contains('completed')) {
        completedTasks++; 
        }
    }
    return completedTasks;
}

function updateLeftItems() {
    let activeTasks = getTotalTasks() - getCompletedTasks();
    left_items_element.innerHTML = activeTasks == 1 ? `${activeTasks} item left`: `${activeTasks} items left`; 
}

clear_all.addEventListener('click', function() {
    while(todo_list.firstChild) {
    todo_list.removeChild(todo_list.firstChild);
    }
    store = [];
    updateLocalStorage('store');
    updateLeftItems();
});

function createNewTask(text, nbr, status) {
    let li = document.createElement('li');
    li.setAttribute('class', 'todo-list-task '+ status);

    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', 'todo-list-checkbox'+nbr);
    input.setAttribute('class', 'todo-list-checkbox');
    if(status == 'active') {console.log('active');
        input.setAttribute('checkbox', 'checkbox');
                            input.checked = false;
    }else if (status == 'completed') {
        input.checked = true;
        input.removeAttribute('checkbox');console.log('completed');
    }
    let label = document.createElement('label');
    label.setAttribute('for', 'todo-list-checkbox'+nbr);
    let p = document.createElement('p');
    p.setAttribute('class', 'todo-list-title');
    p.innerHTML = text;
    let a = document.createElement('a');
    a.setAttribute('href', 'javascript:void(0)');
    a.setAttribute('class', 'todo-list-remove');
    let i_remove = document.createElement('i');
    i_remove.setAttribute('class', 'fa fa-trash');
    a.appendChild(i_remove);
    let a_1 = document.createElement('a');
    a_1.setAttribute('href' , 'javascript:void(0)');
    a_1.setAttribute('class', 'todo-list-edit');
    let i_edit

    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(p);
    li.appendChild(a);

    todo_list.appendChild(li);
    new_task_input.value = '';
    // Update filter after adding new task
    updateFilter();
}

function updateFilter() {
    document.querySelector('.controls-list li.active a').click();
}

function hightLightActiveBtn(name) {
    let controls_buttons = document.querySelector('ul.controls-list').children;
    for(let i=0;i<controls_buttons.length;i++) {
        controls_buttons[i].classList.remove('active');
    }
    console.log('.controls-list ' + name + '-btn');
    document.querySelector('.controls-list .' + name + '-btn').parentNode.classList.add('active');
}

