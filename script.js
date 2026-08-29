/* =====================================================
   TASKFLOW - JAVASCRIPT
===================================================== */


/* =====================================================
   GLOBAL TASK ARRAY
===================================================== */

let tasks = [];


/* =====================================================
   DOM LOADED
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTasks();

        loadTheme();

        setupEventListeners();

    }
);


/* =====================================================
   LOAD TASKS FROM LOCAL STORAGE
===================================================== */

function loadTasks() {

    const savedTasks =
        localStorage.getItem("tasks");


    if (savedTasks) {

        try {

            tasks = JSON.parse(savedTasks);

        } catch (error) {

            tasks = [];

            console.error(
                "Could not load tasks:",
                error
            );

        }

    }


    displayTasks();
}


/* =====================================================
   SAVE TASKS
===================================================== */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


/* =====================================================
   DISPLAY TASKS
===================================================== */

function displayTasks() {

    const taskList =
        document.getElementById("taskList");


    taskList.innerHTML = "";


    let completedCount = 0;


    /* EMPTY STATE */

    if (tasks.length === 0) {

        const emptyMessage =
            document.createElement("li");


        emptyMessage.textContent =
            "No tasks yet. Add your first task!";


        emptyMessage.className =
            "empty-message";


        taskList.appendChild(
            emptyMessage
        );

    }


    /* TASKS */

    tasks.forEach(
        function (task, index) {


            /* TASK CARD */

            const li =
                document.createElement("li");


            /* TASK TEXT */

            const taskText =
                document.createElement("span");


            taskText.textContent =
                task.text;


            taskText.className =
                "task-text";


            /* COMPLETED */

            if (task.completed) {

                taskText.classList.add(
                    "completed"
                );

                completedCount++;

            }


            /* PRIORITY */

            const priority =
                task.priority || "low";


            const priorityBadge =
                document.createElement("span");


            priorityBadge.textContent =
                priority.toUpperCase();


            priorityBadge.className =
                "priority-badge " + priority;


            /* COMPLETE TASK */

            taskText.addEventListener(
                "click",
                function () {

                    tasks[index].completed =
                        !tasks[index].completed;


                    saveTasks();

                    displayTasks();

                }
            );


            /* DELETE BUTTON */

            const deleteButton =
                document.createElement("button");


            deleteButton.textContent =
                "Delete";


            deleteButton.className =
                "delete-btn";


            deleteButton.addEventListener(
                "click",
                function () {

                    tasks.splice(
                        index,
                        1
                    );


                    saveTasks();

                    displayTasks();

                }
            );


            /* ADD ELEMENTS */

            li.appendChild(
                taskText
            );


            li.appendChild(
                priorityBadge
            );


            li.appendChild(
                deleteButton
            );


            taskList.appendChild(
                li
            );

        }
    );


    /* COUNTER */

    document.getElementById(
        "completedCount"
    ).textContent =
        completedCount;

}


/* =====================================================
   ADD TASK
===================================================== */

function addTask() {

    const input =
        document.getElementById(
            "taskInput"
        );


    const prioritySelect =
        document.getElementById(
            "prioritySelect"
        );


    const taskText =
        input.value.trim();


    const priority =
        prioritySelect.value;


    /* EMPTY CHECK */

    if (taskText === "") {

        alert(
            "Please enter a task."
        );

        input.focus();

        return;

    }


    /* CREATE TASK */

    const newTask = {

        text: taskText,

        completed: false,

        priority: priority

    };


    /* ADD TO ARRAY */

    tasks.push(
        newTask
    );


    /* SAVE */

    saveTasks();


    /* DISPLAY */

    displayTasks();


    /* CLEAR INPUT */

    input.value = "";

    input.focus();

}


/* =====================================================
   SEARCH TASKS
===================================================== */

function searchTasks() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    const taskItems =
        document.querySelectorAll(
            "#taskList li"
        );


    taskItems.forEach(
        function (item) {

            const text =
                item.textContent
                    .toLowerCase();


            if (
                text.includes(
                    searchText
                )
            ) {

                item.style.display =
                    "flex";

            } else {

                item.style.display =
                    "none";

            }

        }
    );

}


/* =====================================================
   CLEAR ALL TASKS
===================================================== */

function clearAllTasks() {

    if (tasks.length === 0) {

        alert(
            "There are no tasks to clear."
        );

        return;

    }


    const confirmation =
        confirm(
            "Are you sure you want to delete all tasks?"
        );


    if (!confirmation) {

        return;

    }


    tasks = [];


    saveTasks();


    displayTasks();


    document.getElementById(
        "searchInput"
    ).value = "";

}


/* =====================================================
   DARK MODE
===================================================== */

function toggleDarkMode() {

    const themeButton =
        document.getElementById(
            "themeToggle"
        );


    document.body.classList.toggle(
        "dark-mode"
    );


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    if (isDark) {

        themeButton.textContent =
            "☀️ Light Mode";


        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeButton.textContent =
            "🌙 Dark Mode";


        localStorage.setItem(
            "theme",
            "light"
        );

    }

}


/* =====================================================
   LOAD SAVED THEME
===================================================== */

function loadTheme() {

    const themeButton =
        document.getElementById(
            "themeToggle"
        );


    const savedTheme =
        localStorage.getItem(
            "theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );


        themeButton.textContent =
            "☀️ Light Mode";

    } else {

        document.body.classList.remove(
            "dark-mode"
        );


        themeButton.textContent =
            "🌙 Dark Mode";

    }

}


/* =====================================================
   EVENT LISTENERS
===================================================== */

function setupEventListeners() {


    /* ADD TASK */

    document
        .getElementById(
            "addTaskBtn"
        )
        .addEventListener(
            "click",
            addTask
        );


    /* SEARCH */

    document
        .getElementById(
            "searchInput"
        )
        .addEventListener(
            "input",
            searchTasks
        );


    /* CLEAR ALL */

    document
        .getElementById(
            "clearAllBtn"
        )
        .addEventListener(
            "click",
            clearAllTasks
        );


    /* DARK MODE */

    document
        .getElementById(
            "themeToggle"
        )
        .addEventListener(
            "click",
            toggleDarkMode
        );


    /* ENTER KEY */

    document
        .getElementById(
            "taskInput"
        )
        .addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    addTask();

                }

            }
        );

}