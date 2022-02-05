let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasksDiv = document.querySelector('.tasks');

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check If There Tasks In Local Storage
if(localStorage.getItem('tasks')) {
  arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

submit.onclick = function() {
  if(input.value !== ''){
    addTaskToArray(input.value); // Add Task To ArrayOfTasks
    input.value = ''; // Empty Input Field 
  }
};

// Click On Task Element
tasksDiv.addEventListener('click', (e) => {
  // Delete Butten
  if(e.target.classList.contains('del')) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element 
  if(e.target.classList.contains('task')){
    toggleStatusTaskWith(e.target.getAttribute('data-id'));
    // Toggle Done Class
    e.target.classList.toggle('done');
  }
});

function addTaskToArray(taskText){
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page 
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
};

function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = '';
  // Looping In Array Of Task
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement('div');
    div.className = 'task';
    if(task.completed) {
      div.className = 'task dane';
    }
    div.setAttribute('data-id', task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement('span');
    span.className = 'del';
    span.appendChild(document.createTextNode('Delete'));
    // Append Button To Main Div
    div.appendChild(span);
    tasksDiv.appendChild(div); 
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if(data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for(let i = 0; i < arrayOfTasks.length; i++) {
    if(arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}