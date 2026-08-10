function addTask() {

    //  input value
    let input = document.getElementById("taskInput");
    let task = input.value;

    // check input empty
    if (task === "") {
        alert("Please enter a task");
        return;
    }

    // new list item
    let li = document.createElement("li");

    // add task 
    li.innerHTML = task;

    // delete btn
    let deleteButton = document.createElement("button");

    deleteButton.innerHTML = "Delete";
    deleteButton.className = "delete";

    //delete task btn  is clicked
    deleteButton.onclick = function() {
        li.remove();
    };

    // add delete button to list item
    li.appendChild(deleteButton);

    // add list item to the list
    document.getElementById("taskList").appendChild(li);

    // clear input
    input.value = "";
}
