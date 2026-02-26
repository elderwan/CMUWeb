import fs from "fs";
import path from "path";
import { TodoItem } from "../models/TodoItem";
const todoDbPath = path.join(process.cwd(), "src/data", "todo.json");

let todoItems: TodoItem[] = [];

function writeData() {
    fs.writeFileSync(todoDbPath, JSON.stringify(todoItems, null, 2), "utf-8");
}

export function loadData() {
    const todoData = fs.readFileSync(todoDbPath, "utf-8");
    todoItems = JSON.parse(todoData);
}
export function getTodoBiz() {
    loadData();
    return todoItems;
}

export function addTodoBiz(name: string) {
    loadData();
    const maxId = todoItems.reduce((m, it) => Math.max(m, it.id), 0);
    todoItems.push({ id: maxId + 1, name });
    writeData();
}

export function deleteTodoBiz(id: number) {
    loadData();
    todoItems = todoItems.filter((it) => it.id !== id);
    writeData();
}
