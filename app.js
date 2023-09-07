const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Track the number of tasks added
let taskCount = 0;

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText) => {
        createTaskElement(taskText);
    });
});

// Function to create a new task element
function createTaskElement(text) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    // Alternate background colors for odd and even tasks
    taskElement.style.backgroundColor = taskCount % 2 === 0 ? "#FFF4E0" : "#FFBF9B";

    taskElement.innerHTML = `
        <div class="task-text">${text}</div>
        <div class="task-buttons">
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        </div>
    `;

    // Increment the task count
    taskCount++;

    // Add event listener to edit task when clicking "Edit"
    const editBtn = taskElement.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        const newText = prompt("Edit task:", text);
        if (newText !== null) {
            taskElement.querySelector(".task-text").textContent = newText;
            updateLocalStorage();
        }
    });

    // Add event listener to delete task when clicking "Delete"
    const deleteBtn = taskElement.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        taskElement.remove();
        updateLocalStorage();
    });

    taskList.insertBefore(taskElement, taskList.firstChild); // Add new task at the top
}

// Add task when clicking the "Add Task" button
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTaskElement(taskText);
        taskInput.value = "";
        updateLocalStorage();
    }
});

// Add task when pressing Enter in the input field
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTaskBtn.click();
        event.preventDefault();
    }
});

// Clear completed tasks
clearCompletedBtn.addEventListener("click", () => {
    const completedTasks = document.querySelectorAll(".task");
    completedTasks.forEach((task) => task.remove());
    updateLocalStorage();
});

// Update local storage with the current task list
function updateLocalStorage() {
    const tasks = [];
    const taskElements = document.querySelectorAll(".task-text");
    taskElements.forEach((taskElement) => {
        tasks.push(taskElement.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
