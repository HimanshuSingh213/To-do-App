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
const totalTask = document.querySelector(".functionBoxes .functionBox1 p");
const activeTask = document.querySelector(".functionBoxes .functionBox2 p");
const completedTask = document.querySelector(".functionBoxes .functionBox3 p");
const completionRate = document.querySelector(".functionBoxes .functionBox4 p");
const emptyTask = document.querySelector(".resultContainer .emptyTask");
const searchInput = document.querySelector(".filters .search input");
const taskSortingBtn = document.querySelector(".sortButtons .taskSort .selectedFilter");
const taskSortingDropDown = document.querySelector(".taskSorting");
const taskSortingDropDownlist = document.querySelectorAll(".taskSorting ul li");
const prioritySortingBtn = document.querySelector(".sortButtons .prioritySort .selectedFilter");
const prioritySortingDropDown = document.querySelector(".prioritySorting");
const prioritySortingDropDownlist = document.querySelectorAll(".prioritySorting ul li");
const categorySortingBtn = document.querySelector(".sortButtons .categorySort .selectedFilter");
const categorySortingDropDown = document.querySelector(".categorySorting");
const categorySortingDropDownlist = document.querySelectorAll(".categorySorting ul li");

let sum = 0;
let active;
let completed = 0;
let compRate = 0;

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
        card.style.borderLeftColor = "#00c951";
    }
    if (priorityValue === "medium") {
        const taskTagsClone = clone.querySelector(".taskTags");
        taskTagsClone.classList.add("medium");
        card.style.borderLeftColor = "#f0b100";
    }
    if (priorityValue === "high") {
        const taskTagsClone = clone.querySelector(".taskTags");
        taskTagsClone.classList.add("high");
        card.style.borderLeftColor = "";
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
        if (taskTags[2]) {
            taskTags[2].style.display = 'none';
        }
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

    // updating value in function box 
    totalTask.textContent = ++sum ;
    active = sum;
    activeTask.textContent = active;

    // unhiding the empty task 
    if (totalTask !== 0) {
        emptyTask.style.visibility = "";
    }
    else{
        emptyTask.style.visibility = "visible";
    }


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


emptyTask.style.visibility = "visible";

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
        const checkBox = cardToDelete.querySelector('.checkBox');

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

        totalTask.textContent = --sum;

        if(checkBox.classList.contains("done"))
        completedTask.textContent = --completed;
        if(!checkBox.classList.contains("done"))
        activeTask.textContent = --active;
        
        if (sum === 0) {
            completionRate.textContent = "0%";
        } else {
            const percentage = (completed / sum) * 100;
            
            if (percentage === 0 || percentage === 100) {
                completionRate.textContent = percentage + "%";
            } else {
                completionRate.textContent = percentage.toFixed(1) + "%";
            }
        }
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
        // const dateText = taskTags[2].innerText.trim();
        const dateText = taskTags[2] ? taskTags[2].innerText.trim() : '';


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
            if (newDate) {
                taskTags[2].style.display = 'flex';
                const svgs = taskTags[2].querySelectorAll('svg');
                taskTags[2].textContent = newDate;
                svgs.forEach(svg => taskTags[2].insertBefore(svg, taskTags[2].firstChild));
            } else {
                taskTags[2].style.display = 'none';
            }
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
            card.style.borderLeftColor = "#008236";
        }
        else if (newPriority === 'medium') {
            card.style.borderLeftColor = "#e68619";
        }
        else if (newPriority === 'high') {
            card.style.borderLeftColor = "#e7000b";
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
            activeTask.textContent = --active;
            completedTask.textContent = ++completed;
            if (sum === 0) {
                completionRate.textContent = "0%";
            } else {
                const percentage = (completed / sum) * 100;
                
                if (percentage === 0 || percentage === 100) {
                    completionRate.textContent = percentage + "%";
                } else {
                    completionRate.textContent = percentage.toFixed(1) + "%";
                }
            }
        }

        else {
            taskName.style.textDecoration = "none";
            taskName.style.opacity = "";
            description.style.textDecoration = "none";
            description.style.opacity = "";
            activeTask.textContent = ++active;
            completedTask.textContent = --completed;

            if (sum === 0) {
                completionRate.textContent = "0%";
            } else {
                const percentage = (completed / sum) * 100;
                
                if (percentage === 0 || percentage === 100) {
                    completionRate.textContent = percentage + "%";
                } else {
                    completionRate.textContent = percentage.toFixed(1) + "%";
                }
            }

            if (checkBox.dataset.wasOverdue === "true") {
                taskTagsDiv.classList.add("overdue");
            }
        }


    }
});

searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    const allCard = resultContainer.querySelectorAll(".resultItemBox");

    if (searchValue === "") {
        allCard.forEach(card => {
            card.style.display = 'flex';
        });
        if (sum > 0) {
            emptyTask.style.visibility = 'hidden';
        }
        return;
    }

    allCard.forEach(card => {

        const taskName = card.querySelector(".resultContent .header .taskName").textContent.toLowerCase();

        if (taskName.includes(searchValue)) {
            card.style.display = "flex";
        }
        else{
            card.style.display = "none";
        }

    });

    const visibleCards = resultContainer.querySelectorAll('.resultItemBox:not(.hidden)');
    if(visibleCards.length === 0 && searchInput.value !== ""){
        emptyTask.style.visibility = "visible";
    }
    else if (sum > 0){
        emptyTask.style.visibility = "hidden";
    }
     
});

const changeTaskPara = document.querySelector(".filters .sortButtons .taskSort #task");
const changePriorityPara = document.querySelector(".filters .sortButtons .prioritySort #priority");
const changeCategoryPara = document.querySelector(".filters .sortButtons .categorySort #category");

taskSortingBtn.addEventListener("click", () => {
    if (taskSortingDropDown.style.visibility !== "visible") {   
        taskSortingDropDown.style.visibility = "visible";
        taskSortingDropDown.style.opacity = "1";

        if(taskSortingDropDownlist[0]){
            taskSortingDropDownlist[0].addEventListener("click", () => {
                taskSortingDropDownlist[0].classList.add("selected");
                taskSortingDropDownlist[1].classList.remove("selected");
                taskSortingDropDownlist[2].classList.remove("selected");
                changeTaskPara.textContent = taskSortingDropDownlist[0].innerText;
                taskSortingDropDown.style.visibility = "hidden";
                taskSortingDropDown.style.opacity = "0";               

            });
        }
        if(taskSortingDropDownlist[1]){
            taskSortingDropDownlist[1].addEventListener("click", () => {
                taskSortingDropDownlist[1].classList.add("selected");
                taskSortingDropDownlist[0].classList.remove("selected");
                taskSortingDropDownlist[2].classList.remove("selected");
                changeTaskPara.textContent = taskSortingDropDownlist[1].innerText;
                taskSortingDropDown.style.visibility = "hidden";
                taskSortingDropDown.style.opacity = "0";
            });
        }
        if(taskSortingDropDownlist[2]){
            taskSortingDropDownlist[2].addEventListener("click", () => {
                taskSortingDropDownlist[2].classList.add("selected");
                taskSortingDropDownlist[1].classList.remove("selected");
                taskSortingDropDownlist[0].classList.remove("selected");
                changeTaskPara.textContent = taskSortingDropDownlist[2].innerText;
                taskSortingDropDown.style.visibility = "hidden";
                taskSortingDropDown.style.opacity = "0";
            });
        }

    }
    else{
        taskSortingDropDown.style.visibility = "hidden";
        taskSortingDropDown.style.opacity = "0";

    }
});

prioritySortingBtn.addEventListener("click", () => {
    if (prioritySortingDropDown.style.visibility !== "visible") {   
        prioritySortingDropDown.style.visibility = "visible";
        prioritySortingDropDown.style.opacity = "1";

        if(prioritySortingDropDownlist[0]){
            prioritySortingDropDownlist[0].addEventListener("click", () => {
                prioritySortingDropDownlist[0].classList.add("selected");
                prioritySortingDropDownlist[1].classList.remove("selected");
                prioritySortingDropDownlist[2].classList.remove("selected");
                prioritySortingDropDownlist[3].classList.remove("selected");
                changePriorityPara.textContent = prioritySortingDropDownlist[0].innerText;
                prioritySortingDropDown.style.visibility = "hidden";
                prioritySortingDropDown.style.opacity = "0";               

            });
        }
        if(prioritySortingDropDownlist[1]){
            prioritySortingDropDownlist[1].addEventListener("click", () => {
                prioritySortingDropDownlist[1].classList.add("selected");
                prioritySortingDropDownlist[0].classList.remove("selected");
                prioritySortingDropDownlist[2].classList.remove("selected");
                prioritySortingDropDownlist[3].classList.remove("selected");
                changePriorityPara.textContent = prioritySortingDropDownlist[1].innerText;
                prioritySortingDropDown.style.visibility = "hidden";
                prioritySortingDropDown.style.opacity = "0";
            });
        }
        if(prioritySortingDropDownlist[2]){
            prioritySortingDropDownlist[2].addEventListener("click", () => {
                prioritySortingDropDownlist[2].classList.add("selected");
                prioritySortingDropDownlist[1].classList.remove("selected");
                prioritySortingDropDownlist[0].classList.remove("selected");
                prioritySortingDropDownlist[3].classList.remove("selected");
                changePriorityPara.textContent = prioritySortingDropDownlist[2].innerText;
                prioritySortingDropDown.style.visibility = "hidden";
                prioritySortingDropDown.style.opacity = "0";
            });
        }
        if(prioritySortingDropDownlist[3]){
            prioritySortingDropDownlist[3].addEventListener("click", () => {
                prioritySortingDropDownlist[3].classList.add("selected");
                prioritySortingDropDownlist[2].classList.remove("selected");
                prioritySortingDropDownlist[1].classList.remove("selected");
                prioritySortingDropDownlist[0].classList.remove("selected");
                changePriorityPara.textContent = prioritySortingDropDownlist[3].innerText;
                prioritySortingDropDown.style.visibility = "hidden";
                prioritySortingDropDown.style.opacity = "0";
            });
        }

    }
    else{
        prioritySortingDropDown.style.visibility = "hidden";
        prioritySortingDropDown.style.opacity = "0";

    }
});


categorySortingBtn.addEventListener("click", () => {
    if (categorySortingDropDown.style.visibility !== "visible") {   
        categorySortingDropDown.style.visibility = "visible";
        categorySortingDropDown.style.opacity = "1";

        if(categorySortingDropDownlist[0]){
            categorySortingDropDownlist[0].addEventListener("click", () => {
                categorySortingDropDownlist[0].classList.add("selected");
                categorySortingDropDownlist[1].classList.remove("selected");
                categorySortingDropDownlist[2].classList.remove("selected");
                categorySortingDropDownlist[3].classList.remove("selected");
                categorySortingDropDownlist[4].classList.remove("selected");
                changeCategoryPara.textContent = categorySortingDropDownlist[0].innerText;
                categorySortingDropDown.style.visibility = "hidden";
                categorySortingDropDown.style.opacity = "0";               

            });
        }
        if(categorySortingDropDownlist[1]){
            categorySortingDropDownlist[1].addEventListener("click", () => {
                categorySortingDropDownlist[1].classList.add("selected");
                categorySortingDropDownlist[0].classList.remove("selected");
                categorySortingDropDownlist[2].classList.remove("selected");
                categorySortingDropDownlist[3].classList.remove("selected");
                categorySortingDropDownlist[4].classList.remove("selected");
                changeCategoryPara.textContent = categorySortingDropDownlist[1].innerText;
                categorySortingDropDown.style.visibility = "hidden";
                categorySortingDropDown.style.opacity = "0";
            });
        }
        if(categorySortingDropDownlist[2]){
            categorySortingDropDownlist[2].addEventListener("click", () => {
                categorySortingDropDownlist[2].classList.add("selected");
                categorySortingDropDownlist[1].classList.remove("selected");
                categorySortingDropDownlist[0].classList.remove("selected");
                categorySortingDropDownlist[3].classList.remove("selected");
                categorySortingDropDownlist[4].classList.remove("selected");
                changeCategoryPara.textContent = categorySortingDropDownlist[2].innerText;
                categorySortingDropDown.style.visibility = "hidden";
                categorySortingDropDown.style.opacity = "0";
            });
        }
        if(categorySortingDropDownlist[3]){
            categorySortingDropDownlist[3].addEventListener("click", () => {
                categorySortingDropDownlist[4].classList.remove("selected");
                categorySortingDropDownlist[3].classList.add("selected");
                categorySortingDropDownlist[2].classList.remove("selected");
                categorySortingDropDownlist[1].classList.remove("selected");
                categorySortingDropDownlist[0].classList.remove("selected");
                changeCategoryPara.textContent = categorySortingDropDownlist[3].innerText;
                categorySortingDropDown.style.visibility = "hidden";
                categorySortingDropDown.style.opacity = "0";
            });
        }
        if(categorySortingDropDownlist[4]){
            categorySortingDropDownlist[4].addEventListener("click", () => {
                categorySortingDropDownlist[4].classList.add("selected");
                categorySortingDropDownlist[3].classList.remove("selected");
                categorySortingDropDownlist[2].classList.remove("selected");
                categorySortingDropDownlist[1].classList.remove("selected");
                categorySortingDropDownlist[0].classList.remove("selected");
                changeCategoryPara.textContent = categorySortingDropDownlist[4].innerText;
                categorySortingDropDown.style.visibility = "hidden";
                categorySortingDropDown.style.opacity = "0";
            });
        }

    }
    else{
        categorySortingDropDown.style.visibility = "hidden";
        categorySortingDropDown.style.opacity = "0";

    }
});

document.addEventListener('click', (e) => {
    if (!taskSortingBtn.contains(e.target) && !taskSortingDropDown.contains(e.target)) {
        taskSortingDropDown.style.visibility = 'hidden';
        taskSortingDropDown.style.opacity = '0';
    }
    
    if (!prioritySortingBtn.contains(e.target) && !prioritySortingDropDown.contains(e.target)) {
        prioritySortingDropDown.style.visibility = 'hidden';
        prioritySortingDropDown.style.opacity = '0';
    }
    
    if (!categorySortingBtn.contains(e.target) && !categorySortingDropDown.contains(e.target)) {
        categorySortingDropDown.style.visibility = 'hidden';
        categorySortingDropDown.style.opacity = '0';
    }

    const addTaskBtn = document.querySelector('.addTask');

    if (addNewTaskSection.style.visibility === 'visible') {
        if (!addNewTaskSection.contains(e.target) && !addTaskBtn.contains(e.target)) {
            addNewTaskSection.style.visibility = 'hidden';
            addNewTaskSection.style.opacity = '0';
        }
    }

    if (editTaskSection.style.visibility === 'visible') {
        const editBtns = document.querySelectorAll('.resultContent .header button:first-child');
        let clickedEditBtn = false;
        
        editBtns.forEach(btn => {
            if (btn.contains(e.target)) {
                clickedEditBtn = true;
            }
        });
        
        if (!editTaskSection.contains(e.target) && !clickedEditBtn) {
            editTaskSection.style.visibility = 'hidden';
            editTaskSection.style.opacity = '0';
        }
    }
});
