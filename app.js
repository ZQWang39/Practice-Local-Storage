const taskInput = document.querySelector("#task");
const submit = document.querySelector("#task-input");
const taskList = document.querySelector(".tasks");
const clearBtn = document.querySelector(".clear");

loadEventListener ();
function loadEventListener(){
submit.addEventListener("submit", addTask);
taskList.addEventListener("click",removeTask);
clearBtn.addEventListener("click", clearTask);
}

function addTask(e){
    
    e.preventDefault();
    if (taskInput.value ===""){
        alert("Please enter your task!")
    } else{
    const li = document.createElement("li");
    li.textContent = taskInput.value;
    
    const link = document.createElement("a");
    link.className = "delete-item";
    link.innerHTML = '<i class="fas fa-times"></i>';
    //console.log(li);
    li.appendChild(link);
    taskList.appendChild(li);
    taskInput.value ="";
    }

}

function removeTask(e){
    if (e.target.parentElement.classList.contains("delete-item")){
        if (confirm("Are you sure you want to delete this task?")){
            e.target.parentElement.parentElement.remove(); 
        }
    }

}

function clearTask(){
    //taskList.innerHTML = "";
    while (taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}