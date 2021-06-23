const taskInput = document.querySelector("#task");
const submit = document.querySelector("#task-input");
const taskList = document.querySelector(".tasks");
const clearBtn = document.querySelector(".clear");
const filter = document.getElementById('filter');

loadEventListener ();
function loadEventListener(){
document.addEventListener("DOMContentLoaded", getTasks);
submit.addEventListener("submit", addTask);
taskList.addEventListener("click",removeTask);
clearBtn.addEventListener("click", clearTask);
filter.addEventListener("keyup", filterTasks);


}

function addTask(e){
    
    e.preventDefault();
    if (taskInput.value ===""){
        alert("Please enter your task!")
    } else{
    const li = document.createElement("li");
    li.textContent = taskInput.value;
    li.className = "task-item";
    const link = document.createElement("a");
    link.className = "delete-item";
    link.innerHTML = '<i class="fas fa-times"></i>';
    //console.log(li);
    li.appendChild(link);
    taskList.appendChild(li);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value ="";
    
    }

}

function removeTask(e){
    if (e.target.parentElement.classList.contains("delete-item")){
        if (confirm("Are you sure you want to delete this task?")){
            e.target.parentElement.parentElement.remove(); 
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }

}

function clearTask(){
    //taskList.innerHTML = "";
    while (taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

function filterTasks(){
    const text = filter.value.toLowerCase();
    const tasks = document.querySelectorAll(".task-item");
    console.log(tasks);
    tasks.forEach(function(task){
        const item = task.firstChild.textContent;
       
        if (item.toLowerCase().indexOf(text) !=-1){
            task.style.display = "block";
        }else {
            task.style.display = "none";
        }
    })

}

function storeTaskInLocalStorage(task){

    //console.log(task);
    let tasks;
    if ( localStorage.getItem("tasks") === null){
        tasks = [];
        
    }else{
       tasks = JSON.parse( localStorage.getItem("tasks"));
       //console.log(tasks);
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTasks(){
    let tasks;
    if ( localStorage.getItem("tasks") === null){
        tasks = []; 
    }else{
       tasks = JSON.parse( localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        const li = document.createElement("li");
        li.textContent = task;
        li.className = "task-item";
        const link = document.createElement("a");
        link.className = "delete-item";
        link.innerHTML = '<i class="fas fa-times"></i>';
        li.appendChild(link);
        taskList.appendChild(li);

    })

}

function removeTaskFromLocalStorage(taskItem){
    //console.log(taskItem);
    let tasks;
    if ( localStorage.getItem("tasks") === null){
        tasks = []; 
    }else{
       tasks = JSON.parse( localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index){
        //console.log(taskItem.textContent, task, index)
       if (taskItem.textContent == task){
       tasks.splice(index, 1);
       }
       localStorage.setItem("tasks",JSON.stringify(tasks));
    })

}