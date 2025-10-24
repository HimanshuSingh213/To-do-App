const pageContainer = document.querySelector("page-container");
const addTask = document.querySelector("nav .navRight .addTask");
const themeChanger = document.querySelector("themeChanger");
const totalTasks = document.querySelector(".contentBox .functionBoxes .functionBox1 p");
const activeTasks = document.querySelector(".contentBox .functionBoxes .functionBox2 p");
const completedTasks = document.querySelector(".contentBox .functionBoxes .functionBox3 p");
const completionPercentage = document.querySelector(".contentBox .functionBoxes .functionBox4 p");
const tasksBtn = document.querySelector(".filters .sortButtons .taskSort");
const priorityBtn = document.querySelector(".filters .sortButtons .prioritySort");
const categoryBtn = document.querySelector(".filters .sortButtons .categorySort");
const clearFilterBtn = document.querySelector(".filters .clear");
const resultContainer = document.querySelector(".results .resultContainer");
const cardTemplate = document.querySelector("#task-card-template");
const addNewTaskSection = document.querySelector(".contentBox .addNewTask");
const cancelAddTask = document.querySelector(".addNewTask .actionBtn button:first-child");
const minimizer = document.querySelector(".addNewTask .minimizer");


addTask.addEventListener("click", () => {
    addNewTaskSection.style.visibility = "visible";
    addNewTaskSection.style.opacity = "1";

});

cancelAddTask.addEventListener("click", () => {
    addNewTaskSection.style.visibility = "hidden";
    addNewTaskSection.style.opacity = "0";
});

minimizer.addEventListener("click", () => {
    addNewTaskSection.style.visibility = "hidden";
    addNewTaskSection.style.opacity = "0";
});

function addingNewTask() {
    const titleValue = taskTitleInput.value.trim();
    const descriptionValue = taskDescriptionInput.value || "";
    const priorityValue = priorityInput.value;
    const categoryValue = categoryInput.value;
    const dueDateValue = dueDate.value || "";
    const clone = cardTemplate.content.cloneNode(true);
    const card = clone.querySelector(".resultItemBox");

    const taskTitleInput = document.querySelector(".addNewTask .taskTitle #taskTitleInput");
    const taskDescriptionInput = document.querySelector("#taskDescriptionInput");
    const taskPriorityInput = document.querySelector("#priorityInput");
    const editTask = document.querySelector(".resultItemBox .resultContent .header button:first-child");
    const deleteTask = document.querySelector(".resultItemBox .resultContent .header button:last-child");
    const taskName = document.querySelector(".resultItemBox .resultContent .header .taskName");
    const taskDescription = document.querySelector(".resultItemBox .resultContent .description");
    const taskTags = document.querySelectorAll(".taskTags ul li");

    taskName.textContent = titleValue;
    taskDescription.textContent = descriptionValue;
    taskTags[0].textContent = priorityValue;
    taskTags[1].textContent = categoryValue;
    taskTags[2].textContent = dueDateValue;


}