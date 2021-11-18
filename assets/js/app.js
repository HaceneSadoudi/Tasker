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
  