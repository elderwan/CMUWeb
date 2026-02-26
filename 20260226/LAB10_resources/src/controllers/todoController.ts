import { Request, Response } from "express";
import session from "express-session";
import { TodoItem } from "../models/TodoItem";
import { getTodoBiz, addTodoBiz, deleteTodoBiz } from "../services/todoService";



export function getTodo(req: Request, res: Response) {
    const username = req.session.username;
    const todos: TodoItem[] = getTodoBiz();
    res.render("list", { username, listTitle: "My To-Do List", items: todos });
};

export function addTodo(req: Request, res: Response) {
    const name = (req.body.newItem ?? "").toString().trim();
    addTodoBiz(name);
    res.redirect("/todos");
}

export function deleteTodo(req: Request, res: Response) {
    const id = Number(req.body.checkbox);
    if (!Number.isNaN(id)) deleteTodoBiz(id);
    res.redirect("/todos");
}