document.addEventListener("DOMContentLoaded", () => {
    const newTaskBtn = document.getElementById("new-task-btn");
    const newTaskDialog = document.getElementById("new-task-dialog");
    const newTaskForm = document.getElementById("new-task-form");
    const editTaskDialog = document.getElementById("edit-task-dialog");

    let editingTask = null;

    // Create a new task element
    function createNewTask(title, description, destination) {
        const task = document.createElement("div");
        task.className = "task";
        task.innerHTML = `
            <div class='task-drag-handle'>⋮⋮</div>
                <div class='task-content'>
                    <div class='task-title'>${title}</div>
                </div>
            <button class="task-edit-btn" title="Edit Task">✎</button>
        `;

        // Store task data
        task.dataset.title = title;
        task.dataset.description = description || ""; // Store but don't display
        task.dataset.destination = destination;

        // Add click handler to edit button
        task.querySelector(".task-edit-btn").addEventListener("click", () => {
            editTask(task);
        });

        return task;
    }

    function editTask(task) {
        // set the current task to be edited
        editingTask = task;

        // Populate the edit dialog fields
        const editTitle = document.getElementById("edit-task-title");
        const editDescription = document.getElementById("edit-task-description");
        const editDestination = document.getElementById("edit-task-destination");

        // Set values
        editTitle.value = task.dataset.title;
        editDescription.value = task.dataset.description; // Fetch description
        editDestination.value = task.dataset.destination;

        // Show the edit task dialog
        editTaskDialog.showModal();
    }

    // Handle new task form submission
    if (newTaskForm) {
        newTaskForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Get form values
            const title = document.getElementById("task-title").value.trim();
            const description = document.getElementById("task-description").value.trim();
            const destination = document.getElementById("task-destination").value;

            if (!title) {
                console.error("Task title is required!");
            }

            // Create new task and find destination container
            const newTask = createNewTask(title, description, destination);
            const destinationContainer = document.querySelector(`.${destination} .task-container`);

            if (destinationContainer) {
                destinationContainer.appendChild(newTask);

                // Reset and close dialog
                newTaskDialog.close();
                newTaskForm.reset();
            } else {
                console.error("Destination container not found");
            }
        });
    }

    // Handle edit task form submission
    if (editTaskDialog) {
        const editTaskForm = document.getElementById("edit-task-form");
        const cancelBtn = document.querySelector(".btn-warning");
        const deleteBtn = editTaskDialog.querySelector(".btn-error");

        // Handle edit form submission
        editTaskForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!editingTask) {
                console.error("No task is being edited!");
                return;
            }

            const updatedTitle = document.getElementById("edit-task-title").value.trim();
            const updatedDescription = document.getElementById("edit-task-description").value.trim();
            const updatedDestination = document.getElementById("edit-task-destination").value;

            if (!updatedTitle) {
                console.error("Task title is required!");
                return;
            }

            editingTask.dataset.title = updatedTitle;
            editingTask.dataset.description = updatedDescription;
            editingTask.dataset.destination = updatedDestination;

            const taskTitleEl = editingTask.querySelector(".task-title");
            taskTitleEl.textContent = updatedTitle;

            const currentContainer = editingTask.closest(".task-container");
            const newContainer = document.querySelector(`.${updatedDestination} .task-container`);

            if (newContainer && currentContainer !== newContainer) {
                newContainer.appendChild(editingTask);
            }

            editTaskDialog.close();
            editingTask = null;

        });

        // Handle delete task
        deleteBtn.addEventListener("click", () => {
            if (editingTask) {
                editingTask.remove();
                editTaskDialog.close();
                editingTask = null;
                console.log("Task deleted successfully!");
            }
        });

        // Handle cancel edit 
        cancelBtn.addEventListener("click", () => {
            editTaskDialog.close();
            editingTask = null;
            console.log("Edit dialog closed");
        });

    }

    // handle opening new task dialog
    if (newTaskBtn && newTaskDialog) {
        newTaskBtn.addEventListener("click", () => {
            newTaskDialog.showModal();
        });
    }

    // handle closing dialogs
    document.querySelectorAll(".dialog-buttons .btn-warning").forEach(btn => {
        btn.addEventListener("click", () => {
            const dialog = btn.closest("dialog");
            dialog.close();

            if (dialog === editTaskDialog) {
                editingTask = null;
            }
        });
    });



});
