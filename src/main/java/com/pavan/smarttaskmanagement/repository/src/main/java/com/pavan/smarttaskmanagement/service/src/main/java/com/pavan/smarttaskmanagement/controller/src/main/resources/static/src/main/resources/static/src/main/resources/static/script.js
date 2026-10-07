const API_URL = "/api/tasks";

window.onload = loadTasks;

function loadTasks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";

            tasks.forEach(task => {
                taskList.innerHTML += `
                    <div class="task">
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                        <p><strong>Priority:</strong> ${task.priority}</p>
                        <p><strong>Status:</strong> ${task.status}</p>

                        <button class="edit" onclick="editTask(${task.id})">
                            Edit
                        </button>

                        <button class="delete" onclick="deleteTask(${task.id})">
                            Delete
                        </button>
                    </div>
                `;
            });
        });
}

function saveTask() {
    const id = document.getElementById("taskId").value;

    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(() => {
        clearForm();
        loadTasks();
    });
}

function editTask(id) {
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(task => {
            document.getElementById("taskId").value = task.id;
            document.getElementById("title").value = task.title;
            document.getElementById("description").value = task.description;
            document.getElementById("priority").value = task.priority;
            document.getElementById("status").value = task.status;
        });
}

function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) {
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        loadTasks();
    });
}

function clearForm() {
    document.getElementById("taskId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("priority").value = "HIGH";
    document.getElementById("status").value = "PENDING";
}
