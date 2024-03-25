const list = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.getElementById('taskForm'); 
const BACKEND_URL = 'http://localhost:3001/task';

function getTasks() {
    fetch(BACKEND_URL)
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {renderTask(task);});
        })
        .catch(error => console.error('Error fetching tasks:', error));
}
function renderTask(task) {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    li.textContent = task.description; 
    list.appendChild(li);
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const description = input.value.trim();
    if (description !== '') {
    saveTask(description);
}
});
function saveTask(description) {
    fetch(BACKEND_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ description }),
    })
    .then(response => response.json())
    .then(task => {
        renderTask(task);
        input.value = ''; 
    })
    .catch(error => console.error('Error saving task:', error));
}
getTasks();
