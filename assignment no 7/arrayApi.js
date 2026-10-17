
const express = require("express");
const app = express();

app.use(express.json());

let students = [
    { id: 101, name: "Rohit", marks: 88 },
    { id: 102, name: "Ayush", marks: 94 },
    { id: 103, name: "Sarvadny", marks: 91 }
];

// GET - Display Students
app.get("/students", (req, res) => {
    res.json(students);
});

// POST - Add Student
app.post("/students", (req, res) => {
    students.push(req.body);
    res.send("Student added successfully");
});

// PUT - Update Student
app.put("/students/:id", (req, res) => {
    let id = Number(req.params.id);
    let student = students.find(s => s.id === id);

    if (student) {
        student.name = req.body.name;
        student.marks = req.body.marks;
        res.send("Student updated successfully");
    } else {
        res.send("Student not found");
    }
});

// DELETE - Delete Student
app.delete("/students/:id", (req, res) => {
    let id = Number(req.params.id);
    let oldLength = students.length;

    students = students.filter(s => s.id !== id);

    if (students.length < oldLength) {
        res.send("Student deleted successfully");
    } else {
        res.send("Student not found");
    }
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
