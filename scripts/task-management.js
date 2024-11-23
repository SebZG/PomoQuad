document.addEventListener("DOMContentLoaded", () => {
    const newTaskBtn = document.getElementById("new-task-btn");
    const newTaskDialog = document.getElementById("new-task-dialog");
    const newTaskForm = document.getElementById("new-task-form");
    const editTaskDialog = document.getElementById("edit-task-dialog");

    let editingTask = false;

    // Create aa new task element
    function createNewTask(title, description, destination) {
        console.log("Creating new task:", { title, description, destination });

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
        task.dataset.description = description || "";
        task.dataset.destination = destination;

        // Add click handler to edit button
        const editBtn = task.querySelector(".task-edit-btn");
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent event bubbling
            openEditTaskDialog(task);
        });

        console.log("Created task element", task);
        return task;
    }

    // Handle new task form submission
    if (newTaskForm) {
        newTaskForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Get form values
            const newTaskTitle = document.getElementById("task-title").value.trim();
            const newTaskDescription = document.getElementById("task-description").value.trim();
            const newTaskDestination = document.getElementById("task-destination").value;

            console.log("Form submitted with values:", {
                newTaskTitle,
                newTaskDescription,
                newTaskDestination,
            });

            // Validate title
            if (!newTaskTitle) {
                console.error('Task title is required!');
                return;
            }

            // Create new task and find destination container
            const newTask = createNewTask(newTaskTitle, newTaskDescription, newTaskDestination);
            const destinationContainer = document.querySelector(`.${newTaskDestination} .task-container`);

            if (destinationContainer) {
                console.log("Destination container found:", destinationContainer);
                destinationContainer.appendChild(newTask);

                // Reset and close dialog
                newTaskDialog.close();
                newTaskForm.reset();
            } else {
                console.error("Destination container not found");
            }
        });
    }

    // handle opening new task dialog
    if (newTaskBtn && newTaskDialog) {
        newTaskBtn.addEventListener("click", () => {
            console.log("Opening new task dialog");
            newTaskDialog.showModal();
        });
    }

    // handle closing dialogs
    document.querySelectorAll(".dialog-buttons .btn-error").forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("Cancel button clicked");
            const dialog = btn.closest("dialog");
            dialog.close();
            if (dialog === editTaskDialog) {
                editingTask = false;
            }
        });
    });



});
