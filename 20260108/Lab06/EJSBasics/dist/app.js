"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "..", "views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
    res.render("index", { title: "Home", activePage: "home" });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
const footers = "© Copyright 2025";
app.get("/syntax", (req, res) => {
    const topics = ["<%= %> output", "<% forEach %>", "partials"];
    res.render("syntax", {
        title: "EJS Syntax", activePage: "syntax", topics, footers
    });
});
const students = [
    { id: 1, name: "Alice", major: "Software Engineering" },
    { id: 2, name: "Bob", major: "Data Science" },
    { id: 3, name: "Chen", major: "UX/UI" }
];
app.get("/students", (req, res) => {
    res.render("students", {
        title: "Students", activePage: "students",
        students, footers
    });
});
app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);
    res.render("student-detail", {
        title: "Student Detail",
        activePage: "students",
        student,
        footers
    });
});
