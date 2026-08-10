function addTask() {

    // Get the input value
    let input = document.getElementById("taskInput");
    let task = input.value;

    // Check if input is empty
    if (task === "") {
        alert("Please enter a task");
        return;
    }

    // Create a new list item
    let li = document.createElement("li");

    // Add task text
    li.innerHTML = task;
    // Create delete button
    let deleteButton = document.createElement("button");

    deleteButton.innerHTML = "Delete";
    deleteButton.className = "delete";

    // Delete task when button is clicked
    deleteButton.onclick = function() {
        li.remove();
    };

    // Add delete button to list item
    li.appendChild(deleteButton);

    // Add list item to the list
    document.getElementById("taskList").appendChild(li);

    // Clear input
    input.value = "";
}
