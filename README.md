# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://github.com/miteshp98/To-do-App)
- Live Site URL: [Add live site URL here](https://to-do-app-challenge.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

During this project, I gained significant experience in:

- LocalStorage Implementation: I learned how to effectively use localStorage to store, retrieve, and persist data across sessions, ensuring the app retains the user's tasks even after refreshing or closing the browser.
- Dynamic Task Management: I implemented dynamic task creation, deletion, and updating. I also managed task completion, allowing users to toggle between completed and active tasks and filter them accordingly.
- Event-Driven Programming: I worked with various event handlers, such as handling form submissions, button clicks for task deletion, and task completion toggling.
- Dark Mode Toggle: Implementing a dark mode toggle feature gave me insights into how to manage themes using local storage and user preferences.

To see how you can add code snippets, see below:

```js
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
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

In the next phase of development, I plan to dive deeper into advanced JavaScript techniques and further improve my skills in working with local storage. My focus will be on:

- Advanced Features: I will integrate more advanced features like task prioritization (e.g., high, medium, low), task scheduling with deadlines, and notification systems for overdue tasks.
- Optimizing Storage: I'll explore more efficient ways to manage data in localStorage, handling larger data sets, and using indexedDB for better performance and scalability.
- Code Enhancements: I will work on refining the code structure, reducing redundancy, and ensuring better logic with modular functions. This includes optimizing event handling, improving performance, and ensuring code maintainability.
- User Experience: Enhancing the drag-and-drop feature by making it more intuitive and adding animations. I’ll also look into improving the UI/UX with features like task categories, search functionality, and filter combinations.
- Mobile and Desktop Support: I'll ensure that the app is fully responsive and improves the UI experience across different devices.
  Additionally, I plan to learn more about handling asynchronous tasks, including syncing data with remote servers or APIs, enabling cross-device support, and using frameworks or libraries like React to further scale the project.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

## Author

- Website - [Mitesh Panchal](https://miteshp98.github.io/portfolio-website/)
- Frontend Mentor - [@miteshp98](https://www.frontendmentor.io/profile/miteshp98)
- Linkedin - [@Mitesh Panchal](https://www.linkedin.com/in/mitesh-panchal-356558126/)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

Thanks to the challenge provider for creating this opportunity to apply and improve my frontend development skills.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
