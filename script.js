"use strict";

const taskForm = document.querySelector("form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".to-do-list");
const taskStatusContainer = document.querySelector(".to-do-status");
const addTaskButton = document.querySelector(".add-task");
const taskListData = JSON.parse(localStorage.getItem("taskToDo")) || [];
let currentTaskId = JSON.parse(localStorage.getItem("currentId")) || 1;
const activeTaskCount = document.querySelector(".count");
const tabButton = document.querySelectorAll(".tab");
const clearCompletedButton = document.querySelector(".clear-completed-btn");
let count = 0;

function displayTask() {
  const renderTask = taskListData
    .map((task) => {
      const { id, name, isCompleted } = task;

      return `
                  <li class="list-item ${
                    isCompleted ? "completed-task" : ""
                  }" data-id="${id}" draggable='true'> 
                <button class="check-button ${
                  isCompleted ? "check-btn-bg" : ""
                }">
                </button>
                <p class="task-name">${name}</p>
                <button class="delete-task">
                  <img src="images/icon-cross.svg" alt="delete-task" />
                </button>
              </li>`;
    })
    .join("");

  taskList.innerHTML = renderTask;
  taskStatusContainer.classList.remove("hide");

  countActiveTask();
}
displayTask();

function removeStatusDiv() {
  if (taskListData.length === 0) {
    taskStatusContainer.classList.add("hide");
  }
}
removeStatusDiv();

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});

addTaskButton.addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

function addTask() {
  const userTask = taskInput.value;

  if (!userTask) {
    alert("Enter Valid Task");
    return;
  }

  taskListData.push({
    id: currentTaskId++,
    name: userTask,
    isCompleted: false,
  });

  localStorage.setItem("taskToDo", JSON.stringify(taskListData));
  localStorage.setItem("currentId", currentTaskId);

  taskInput.value = "";
  displayTask();
}

// Remove Task Logic

function removeTask(button) {
  if (button) {
    const listItem = button.closest(".list-item");
    const taskId = +listItem.dataset.id;

    const index = taskListData.findIndex((task) => task.id === taskId);

    if (index > -1) {
      taskListData.splice(index, 1);
      localStorage.setItem("taskToDo", JSON.stringify(taskListData));
      displayTask();
    }

    if (taskListData.length === 0) {
      currentTaskId = 1;
      taskStatusContainer.classList.add("hide");
      localStorage.setItem("currentId", currentTaskId);
    }
  }
}

taskList.addEventListener("click", function (e) {
  const removeTaskButton = e.target.closest(".delete-task");
  const completedTaskButton = e.target.closest(".check-button");

  removeTask(removeTaskButton);
  toggleTaskCompletion(completedTaskButton);
});

// Count Total Active Task

function countActiveTask() {
  count = taskListData.filter((task) => !task.isCompleted).length;
  activeTaskCount.textContent = count;
}

// Complted Task Toggle Button

function toggleTaskCompletion(button) {
  if (button) {
    const listItem = button.closest(".list-item");
    const taskId = +listItem.dataset.id;

    const findIndex = taskListData.findIndex((task) => task.id === taskId);

    if (!taskListData[findIndex].isCompleted) {
      taskListData[findIndex].isCompleted = true;
      localStorage.setItem("taskToDo", JSON.stringify(taskListData));
      countActiveTask();

      listItem.classList.add("completed-task");
      button.classList.add("check-btn-bg");
    } else {
      taskListData[findIndex].isCompleted = false;
      localStorage.setItem("taskToDo", JSON.stringify(taskListData));
      countActiveTask();

      listItem.classList.remove("completed-task");
      button.classList.remove("check-btn-bg");
    }
  }
}

// TO Handle Filter (ALL , ACTIVE , Completed)

function handleTabFilter(index) {
  const listItems = Array.from(taskList.children);

  switch (index) {
    case 0:
      showAllTask(listItems);
      break;
    case 1:
      showActiveTask(listItems);
      break;
    case 2:
      showCompletedTask(listItems);
      break;
  }
}

// Show All Task

function showAllTask(listItems) {
  listItems.forEach((item) => item.classList.remove("hide"));
}

// Show Active Task

function showActiveTask(listItems) {
  listItems.forEach((item) => {
    if (item.classList.contains("completed-task")) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
    }
  });
}

// Show Completed Task

function showCompletedTask(listItems) {
  listItems.forEach((item) => {
    if (item.classList.contains("completed-task")) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

// Clear Complete Task

function clearCompleted() {
  const listItems = Array.from(taskList.children);
  const taskListData = JSON.parse(localStorage.getItem("taskToDo")) || [];

  const activeTasks = taskListData.filter((task) => !task.isCompleted);
  localStorage.setItem("taskToDo", JSON.stringify(activeTasks));

  listItems.forEach((elem) => {
    if (elem.classList.contains("completed-task")) {
      elem.remove();
    }
  });
}

clearCompletedButton.addEventListener("click", function (e) {
  clearCompleted();
});

tabButton.forEach((button, index) => {
  button.addEventListener("click", function (e) {
    tabButton.forEach((button) => {
      button.classList.remove("active-tab");
    });

    button.classList.add("active-tab");

    handleTabFilter(index);
  });
});

// Dark Theme - Light Them

function handleToggleButton() {
  const { body, themeToggleButton } = queryElement();

  themeToggleButton.addEventListener("click", function (e) {
    toggleTheme();
  });
}

handleToggleButton();

function toggleTheme() {
  const {
    body,
    inputSection,
    todoListContainer,
    taskName,
    listItems,
    tabContainer,
    themeToggleButton,
  } = queryElement();

  const isDarkTheme = body.classList.toggle("dark-theme");
  [inputSection, todoListContainer, taskInput, tabContainer].forEach((elem) =>
    elem.classList.toggle("dark-theme")
  );
  taskName.forEach((elem) => elem.classList.toggle("dark-theme"));
  listItems.forEach((elem) => elem.classList.toggle("dark-theme"));
  themeToggleButton.classList.toggle("dark-theme");

  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
}

function queryElement() {
  const body = document.querySelector("body");
  const inputSection = document.querySelector(".todo-section");
  const todoListContainer = document.querySelector(".to-do-list-container");
  const themeToggleButton = document.querySelector(".switch-theme");
  const listItems = Array.from(taskList.children);
  const taskName = [];
  const tabContainer = todoListContainer.lastElementChild.children[1];
  listItems.forEach((elem) => taskName.push(elem.children[1]));

  return {
    body,
    inputSection,
    todoListContainer,
    taskName,
    listItems,
    tabContainer,
    themeToggleButton,
  };
}
queryElement();

window.addEventListener("load", function (e) {
  const savedTheme = this.localStorage.getItem("theme");
  if (savedTheme === "dark") {
    toggleTheme();
  }
});
