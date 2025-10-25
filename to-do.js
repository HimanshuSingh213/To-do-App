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
const resultContainer = document.querySelector(".resultContainer");
const cardTemplate = document.querySelector("#task-card-template");
const addNewTaskSection = document.querySelector(".contentBox .addNewTask");
const cancelAddTask = document.querySelector(".addNewTask .actionBtn button:first-child");
const createNewTask = document.querySelector(".addNewTask .actionBtn button:nth-child(2)");
const minimizer = document.querySelector(".addNewTask .minimizer");
const cancelAddTask2 = document.querySelector(".editTask .actionBtn2 button:first-child");
const createNewTask2 = document.querySelector(".editTask .actionBtn2 button:nth-child(2)");
const minimizer2 = document.querySelector(".editTask .minimizer2");
const cancelEditTask = document.querySelector(".editTask .actionBtn2 button:first-child");
const updateTask = document.querySelector(".editTask .actionBtn2 button:nth-child(2)");

function createTaskCard() {
    if (!cardTemplate || !resultContainer) {
        console.error("FAILED: Template or container not found!");
        return null;
    }

    //getting input Values
    const taskTitleInput = document.querySelector(".addNewTask .taskTitle #taskTitleInput");
    const taskDescriptionInput = document.querySelector("#taskDescriptionInput");
    const taskPriorityInput = document.querySelector("#priorityInput");
    const taskCategoryInput = document.querySelector("#categoryInput");
    const taskDueDateInput = document.querySelector("#dueDate");


    //cloning template
    const clone = cardTemplate.content.cloneNode(true);
    const card = clone.querySelector(".resultItemBox");

    //items from the template
    const taskName = clone.querySelector(".resultItemBox .resultContent .header .taskName");
    const taskDescription = clone.querySelector(".resultItemBox .resultContent .description");
    const taskTags = clone.querySelectorAll(".taskTags ul li");

    //assigning value
    const titleValue = taskTitleInput.value.trim();
    const descriptionValue = taskDescriptionInput.value || "";
    const priorityValue = taskPriorityInput.value;
    const categoryValue = taskCategoryInput.value;
    const dueDateValue = taskDueDateInput.value || "";


    if (priorityValue === "low") {
        const taskTagsClone = clone.querySelector(".taskTags");
        taskTagsClone.classList.add("low");
        card.style.borderColor = "#00c951";
    }
    if (priorityValue === "medium") {
        const taskTagsClone = clone.querySelector(".taskTags");
        taskTagsClone.classList.add("medium");
        card.style.borderColor = "#f0b100";
    }
    if (priorityValue === "high") {
        const taskTagsClone = clone.querySelector(".taskTags");
        taskTagsClone.classList.add("high");
        card.style.borderColor = "";
    }

    const taskTagsClone = clone.querySelector(".taskTags");

    if (categoryValue === "work") {
        taskTagsClone.classList.add("work");
    }
    if (categoryValue === "personal") {
        taskTagsClone.classList.add("personal");
    }
    if (categoryValue === "shopping") {
        taskTagsClone.classList.add("shopping");
    }
    if (categoryValue === "health") {
        taskTagsClone.classList.add("health");
    }


    if (dueDateValue) {
        const parts = dueDateValue.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const taskDate = new Date(year, month, day);
        const today = new Date();
        taskDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (taskDate < today) {
            taskTagsClone.classList.add("overdue");
        }
        else if (taskDate.getTime() === today.getTime()) {
            taskTagsClone.classList.add("overdue");
        }

    }

    else {
        taskTags[2].remove();
    }

    if (taskName) taskName.textContent = titleValue;
    if (taskDescription) taskDescription.textContent = descriptionValue;
    if (taskTags[0]) taskTags[0].textContent = priorityValue;
    if (taskTags[1]) taskTags[1].textContent = categoryValue;
    if (taskTags[2] && dueDateValue) {
        const svgs = taskTags[2].querySelectorAll('svg');
        taskTags[2].textContent = dueDateValue;
        svgs.forEach(svg => taskTags[2].insertBefore(svg, taskTags[2].firstChild));
    }


    const existingCards = Array.from(resultContainer.querySelectorAll('.resultItemBox.show'));
    const oldPositions = existingCards.map(card => card.getBoundingClientRect().top);

    //prepending Card
    resultContainer.prepend(clone);

    const newPositions = existingCards.map(card => card.getBoundingClientRect().top);

    existingCards.forEach((card, index) => {
        const positionY = oldPositions[index] - newPositions[index];

        if (positionY !== 0) {
            card.style.transition = 'none';
            card.style.transform = `translateY(${positionY}px)`;

            card.offsetHeight;

            card.style.transition = 'transform 0.4s ease';
            card.style.transform = 'translateY(0)';
        }
    });


    //lil transitions
    const insertedCard = resultContainer.querySelector('.resultItemBox');
    setTimeout(() => {
        insertedCard.classList.add('show');
    }, 30);

    // clearing the inouts
    taskTitleInput.value = "";
    taskDescriptionInput.value = "";
    taskDueDateInput.value = "";


};

addTask.addEventListener("click", () => {
    addNewTaskSection.style.visibility = "visible";
    addNewTaskSection.style.opacity = "1";
    setTimeout(() => {
        document.querySelector("#taskTitleInput").focus();
    }, 100);
});

cancelAddTask.addEventListener("click", () => {
    addNewTaskSection.style.visibility = "hidden";
    addNewTaskSection.style.opacity = "0";
    setTimeout(() => {
        taskTitleInput.classList.remove('error');
    }, 100);
});

minimizer.addEventListener("click", () => {
    addNewTaskSection.style.visibility = "hidden";
    addNewTaskSection.style.opacity = "0";
    setTimeout(() => {
        taskTitleInput.classList.remove('error');
    }, 100);
});

createNewTask.addEventListener("click", () => {

    if (taskTitleInput.value.trim() === "") {
        taskTitleInput.classList.add('error');
    }
    else {
        createTaskCard();
        taskTitleInput.classList.remove('error')
        addNewTaskSection.style.visibility = "hidden";
        addNewTaskSection.style.opacity = "0";

    }

});

resultContainer.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.resultContent .header button:last-child');

    if (deleteBtn) {
        const cardToDelete = deleteBtn.closest('.resultItemBox');

        const allCards = Array.from(resultContainer.querySelectorAll('.resultItemBox.show'));
        const deleteIndex = allCards.indexOf(cardToDelete);
        const cardsBelow = allCards.slice(deleteIndex + 1);

        const oldPositions = cardsBelow.map(card => card.getBoundingClientRect().top);

        cardToDelete.style.transition = "all 0.3s ease";
        cardToDelete.style.opacity = "0";
        cardToDelete.style.transform = "translateX(-100px)";

        setTimeout(() => {
            cardToDelete.remove();

            const newPositions = cardsBelow.map(card => card.getBoundingClientRect().top);

            cardsBelow.forEach((card, index) => {
                const positionY = oldPositions[index] - newPositions[index];

                if (positionY !== 0) {

                    card.style.transition = 'none';
                    card.style.transform = `translateY(${positionY}px)`;

                    card.offsetHeight;

                    card.style.transition = 'transform 0.4s ease';
                    card.style.transform = 'translateY(0)';
                }
            });
        }, 300);
    }
});

editTaskSection = document.querySelector(".editTask");

resultContainer.addEventListener('click', (e) => {
    const editBtn = e.target.closest(" .resultContent .header button:first-child");
    
    if (editBtn) {
        const card = editBtn.closest('.resultItemBox');
        const taskName = card.querySelector('.resultContent .header .taskName').textContent;
        const taskDescription = card.querySelector('.resultContent .description').textContent;
        const taskTags = card.querySelectorAll('.taskTags ul li');
        const priority = taskTags[0].textContent.trim();
        const category = taskTags[1].textContent.trim();
        const dateText = taskTags[2].innerText.trim();

        document.querySelector("#taskTitleInput2").value = taskName;
        document.querySelector("#taskDescriptionInput2").value = taskDescription;
        document.querySelector("#priorityInput2").value = priority;
        document.querySelector("#categoryInput2").value = category;
        document.querySelector("#dueDate2").value = dateText;


        editTaskSection.style.visibility = "visible";
        editTaskSection.style.opacity = "1";

        editTaskSection.dataset.editingCard = Array.from(resultContainer.children).indexOf(card);

        setTimeout(() => {
            document.querySelector("#taskTitleInput2").focus();
        }, 100);
    }


});


cancelEditTask.addEventListener("click", () => {
    editTaskSection.style.visibility = "hidden";
    editTaskSection.style.opacity = "0";
    setTimeout(() => {
        taskTitleInput2.classList.remove('error');
    }, 100);
});

minimizer2.addEventListener("click", () => {
    editTaskSection.style.visibility = "hidden";
    editTaskSection.style.opacity = "0";
    setTimeout(() => {
        taskTitleInput2.classList.remove('error');
    }, 100);
});

updateTask.addEventListener("click", () => {

    const takenData = editTaskSection.dataset.editingCard;;

    if (takenData !== undefined) {
        const card = resultContainer.children[takenData];

        const newTitle = document.querySelector("#taskTitleInput2").value;
        const newDescription = document.querySelector("#taskDescriptionInput2").value;
        const newPriority = document.querySelector("#priorityInput2").value;
        const newCategory = document.querySelector("#categoryInput2").value;
        const newDate = document.querySelector("#dueDate2").value;

        card.querySelector('.resultContent .header .taskName').textContent = newTitle;
        card.querySelector('.resultContent .description').textContent = newDescription;

        const taskTags = card.querySelectorAll('.taskTags ul li');
        taskTags[0].textContent = newPriority;
        taskTags[1].textContent = newCategory;

        if (taskTags[2]) {
            const svgs = taskTags[2].querySelectorAll('svg');
            taskTags[2].textContent = newDate;
            svgs.forEach(svg => taskTags[2].insertBefore(svg, taskTags[2].firstChild));
        }

        const taskTagsDiv = card.querySelector('.taskTags');
        taskTagsDiv.classList.remove('low', 'medium', 'high');
        taskTagsDiv.classList.add(newPriority);

        if (newDate) {
            const parts = newDate.split('-');
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            const taskDate = new Date(year, month, day);
            const today = new Date();
            taskDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            if (taskDate < today || taskDate.getTime() === today.getTime()) {
                taskTagsDiv.classList.add("overdue");
            } else {
                taskTagsDiv.classList.remove("overdue");
            }
        } else {
            taskTagsDiv.classList.remove("overdue");
        }

        if (newPriority === 'low') {
            card.style.borderColor = "#008236";
        }
        else if (newPriority === 'medium') {
            card.style.borderColor = "#e68619";
        }
        else if (newPriority === 'high') {
            card.style.borderColor = "#e7000b";
        }

        delete addNewTaskSection.dataset.editingCard;

        editTaskSection.style.visibility = "hidden";
        editTaskSection.style.opacity = "0";

        document.querySelector("#taskTitleInput2").value = '';
        document.querySelector("#taskDescriptionInput2").value = '';
        document.querySelector("#priorityInput2").value = '';
        document.querySelector("#categoryInput2").value = '';
        document.querySelector("#dueDate2").value = '';
    }


});

resultContainer.addEventListener('click', (e) => {
    const checkBox = e.target.closest('.checkBox');
    
    if (checkBox) {
        const card = checkBox.closest('.resultItemBox');
        const taskName = card.querySelector(".resultContent .header .taskName");
        const description = card.querySelector(".resultContent .description");
        const taskTagsDiv = card.querySelector(".taskTags");

        // let check = taskTagsDiv.classList.contains("overdue");
        // console.log('Was overdue?', check);

        if (!checkBox.dataset.wasOverdue) {
            checkBox.dataset.wasOverdue = taskTagsDiv.classList.contains("overdue");
        }

        checkBox.classList.toggle('done');

        if (checkBox.classList.contains('done')) {
            taskName.style.textDecoration = "line-through";
            taskName.style.opacity = "0.8";
            description.style.textDecoration = "line-through";
            description.style.opacity = "0.8";
            taskTagsDiv.classList.remove("overdue");
        }

        else {
            taskName.style.textDecoration = "none";
            taskName.style.opacity = "";
            description.style.textDecoration = "none";
            description.style.opacity = "";
            
            if (checkBox.dataset.wasOverdue === "true") {
                taskTagsDiv.classList.add("overdue");
            }
        }
    }
});
