// import { loadTodos, saveTodos, addTodo } from "./services/todoService";
//read todo files in todo.json
import path from "path";
import fs from "fs";
import { Todo } from "../models/todo";


const dataPath = path.join(process.cwd(), "src", "data", "todo.json");

export function loadTodos(): Todo[] {
    const text = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(text) as Todo[];
}

export function saveTodos(todos: Todo[]): void {
    fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));
}

export function addTodo(
    todos: Todo[],
    title: string,
): Todo[] {
    const nextId =
        todos.length === 0 ? 1 : Math.max(...todos.map(t => t.id)) + 1;

    const newTodo: Todo = { id: nextId, title, done: false };
    return [...todos, newTodo];
}

export function toggleTodo(
    todos: Todo[],
    id: number,
): Todo[] {
    return todos.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
    );
}