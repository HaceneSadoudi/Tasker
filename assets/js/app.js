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

function filterTasks(filter) {
    console.log(this);
    let tasks = todo_list.children;
    console.log(tasks);
    for(let i=tasks.length - 1;i>=0;i--) {
        
        if(filter == 'completed') { 
            tasks[i].style.display = "block";
            console.log(tasks[i].classList);
            if(!tasks[i].classList.contains('completed')) {
                tasks[i].style.display = "none";
            }  
        }else if(filter == 'active') {
            tasks[i].style.display = "block";
            if(tasks[i].classList.contains('completed')) {
                tasks[i].style.display = "none";
            }
        }else {
            tasks[i].style.display = "block";
        }
    
    }
}

function updateLocalStorage(varName) {
    let v = varName == 'store' ? store : theme;
    console.log(v);
    localStorage.setItem(varName, JSON.stringify(v));
}

switch_mode.addEventListener('click', function() {
    if(document.body.classList.contains('light')) {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        theme = 'dark';
    }else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        theme = 'light';
    }
    updateLocalStorage('theme');
});

todo_list.addEventListener('click', function(e) {
    // Remove task event
    if(e.target && e.target.classList.contains('todo-list-remove')) {
        let li = e.target.parentNode;
        let indexOfTask = store.findIndex(x => x.id == li.firstElementChild.id.slice(-1));
        
        store.splice(indexOfTask, 1); 
        updateLocalStorage('store');
        li.remove();
        updateLeftItems();
        updateFilter();
    }
    // Check task event
    if(e.target && e.target.classList.contains('todo-list-checkbox')) {
        let checkbox = e.target;
        let li = e.target.parentNode;
        let indexOfTask = store.findIndex(x => x.id == checkbox.id.slice(-1));
        
        this.insertBefore(li, this.lastElementChild.nextSibling);
        if(li.classList.contains('completed')) {
            li.classList.remove('completed');
            li.classList.add('active')
            store[indexOfTask].status = 'active';      
        }else {
            li.classList.remove('active');
            li.classList.add('completed');
            store[indexOfTask].status = 'completed';
        }
        updateLocalStorage('store');
        updateLeftItems();
        updateFilter();
    }
});


new_task_input.addEventListener('keyup', function(e) {
    let obj = {};
    if(e.keyCode === 13) {
        obj.id = getTotalTasks();
        obj.title = this.value;
        obj.status = 'active';
        store.push(obj);
        updateLocalStorage('store');
        createNewTask(this.value, getTotalTasks(), 'active');
        updateLeftItems();
    }

});

clear_all.addEventListener('click', function() {
    while(todo_list.firstChild) {
        todo_list.removeChild(todo_list.firstChild);
    }
    store = [];
    updateLocalStorage('store');
    updateLeftItems();
});

//Controls Buttons
all_btn.addEventListener('click', function() {
    hightLightActiveBtn('all');
    filterTasks('all');
});
active_btn.addEventListener('click', function() {
    hightLightActiveBtn('active');
    filterTasks('active');
});
completed_btn.addEventListener('click', function() {
    hightLightActiveBtn('completed');
    filterTasks('completed');
});
  