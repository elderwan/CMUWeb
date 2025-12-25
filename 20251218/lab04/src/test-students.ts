import { loadStudents, saveStudents, addStudent } from "./services/studentService";
import fs from "fs";


// const students = loadStudents();
// const updated = addStudent(students, "Mina", "UX");
// saveStudents(updated);

//async await to save and load

async function manageStudents() {
    const students = await loadStudents();
    const updated = addStudent(students, "Mina", "UX");
    await saveStudents(updated);
    return updated;
}


console.log("Updated students:", manageStudents());


fs.promises.readFile("src/data/students.json", "utf-8").then(data => {
    console.log("Current students data:", data);
});

