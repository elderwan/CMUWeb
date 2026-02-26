import fs from "fs";
import path from "path";
import { User } from "../models/Users";
const userDbPath = path.join(process.cwd(), "src/data", "users.json");
let users: User[] = [];

function writeData() {
    fs.writeFileSync(userDbPath, JSON.stringify(users, null, 2), "utf-8");
}

export function loadData() {
    const userData = fs.readFileSync(userDbPath, "utf-8");
    users = JSON.parse(userData);
}

export function getUsersByUserNameAndPassword(username: string, password: string) {
    //return only one user otherwise return null
    loadData();
    return users.find((u) => u.username === username && u.password === password) || null;
}

