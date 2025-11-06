const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded',function(e){
    gettodo();
})
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoFilter.addEventListener("click", filterTodo);

function addTodo(e) {
  e.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.className = "todo";

  const todos = document.createElement("li");
  todos.className = "todo-item";
  setTodos(todoInput.value);
  todos.appendChild(document.createTextNode(todoInput.value));
  todoDiv.appendChild(todos);
  todoInput.value = "";

  // Complete button
  const completeBtn = document.createElement('button');
  completeBtn.className = "complete-btn";
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completeBtn);

  // Trash button
  const trashBtn = document.createElement('button');
  trashBtn.className = "trash-btn";
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashBtn);

  todoList.appendChild(todoDiv);
}

function deleteCheck(e) {
  const item = e.target;

  // Delete with animation
  if (item.classList.contains("trash-btn") || item.classList.contains("fa-trash")) {
    const todo = item.closest(".todo");
    todo.classList.add("fall"); // trigger animation
    removeTodo(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // Completed toggle
  if (item.classList.contains("complete-btn") || item.classList.contains("fa-check")) {
    const todo = item.closest(".todo");
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function (todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display ="flex";
                    }else {
                        todo.style.display = "none";
                    }
                    break;
                    case "uncompleted":
                        if(!todo.classList.contains("completed")) {
                            todo.style.display ="flex";
                        } else {
                            todo.style.display = "none";
                        }
                        break;
                        default:
                            console.log(e.target.value);
        }
    });

    
    
    e.preventDefault();
}

//to set todo in localStorage

function setTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos= [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    //setting to localstorage
    localStorage.setItem('todos', JSON.stringify(todos))
}
function gettodo() {
   let todos;
    if(localStorage.getItem('todos') === null){
        todos= [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
  todoDiv.className = "todo";

  const todos = document.createElement("li");
  todos.className = "todo-item";
//
  todos.appendChild(document.createTextNode(todo));
  todoDiv.appendChild(todos);
  todoInput.value = "";

  // Complete button
  const completeBtn = document.createElement('button');
  completeBtn.className = "complete-btn";
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completeBtn);

  // Trash button
  const trashBtn = document.createElement('button');
  trashBtn.className = "trash-btn";
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashBtn);

  todoList.appendChild(todoDiv);
    }); 
}
function removeTodo(todo) {
   let todos;
    if(localStorage.getItem('todos') === null){
        todos= [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    } 
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}