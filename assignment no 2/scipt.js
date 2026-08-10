
let btn = document.getElementById("btn");


let students = [];


btn.onclick = function () {

    // name and roll
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;

    //  marks
    let physics = Number(document.getElementById("physics").value);
    let chemistry = Number(document.getElementById("chemistry").value);
    let maths = Number(document.getElementById("maths").value);

    // Cal avg
    let average = (physics + chemistry + maths) / 3;

    // add student
    students.push({
        name: name,
        roll: roll,
        average: average
    });

    // first student is topper
    let topper = students[0];

    //  topper
    for (let i = 1; i < students.length; i++) {

        if (students[i].average > topper.average) {
            topper = students[i];
        }
    }

    //  output
    let output = "";

    output = output + "<h2>Student Info :</h2>";

    // show topper
    output = output + "<h3>Topper : "
        + topper.name
        + " ("
        + topper.average.toFixed(2)
        + ")</h3>";

    //  table
    output = output + "<table border='1'>";

    // Table heading
    output = output + "<tr>";
    output = output + "<th>Name</th>";
    output = output + "<th>Roll No</th>";
    output = output + "<th>Average</th>";
    output = output + "</tr>";

    // Show students
    for (let i = 0; i < students.length; i++) {

        output = output + "<tr>";

        output = output + "<td>"
            + students[i].name
            + "</td>";

        output = output + "<td>"
            + students[i].roll
            + "</td>";

        output = output + "<td>"
            + students[i].average.toFixed(2)
            + "</td>";

        output = output + "</tr>";
    }

    // Close table
    output = output + "</table>";

    // Show result
    document.getElementById("result").innerHTML = output;
};
