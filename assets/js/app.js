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