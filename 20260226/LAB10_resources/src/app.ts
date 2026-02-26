import express from "express";
import session from "express-session";
import path from "path";
import { addTodo, deleteTodo, getTodo } from "./controllers/todoController";
import { home, login, logout } from "./controllers/userController";
import { requireLogin } from "./middleware/requireLogin";
const app = express();
const PORT = 3000;


/**  Step 1: Configure Express + EJS + Static files */
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));


/**  Step 2: Configure session middleware (MemoryStore) */
// Session middleware (MemoryStore by default) — for learning/demo only
app.use(
  session({
    secret: "replace-with-a-strong-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 1000 }
  })
);

// home page
app.get("/", home);

/**  Step 3: Implement login with seed users */
app.post("/login", login);

/**  Step 5: Implement ToDo CRUD with seed data */
// ToDo list page (protected)
app.get("/todos", requireLogin, getTodo);

// Add item (protected)
app.post("/add", requireLogin, addTodo)

// Delete item (protected)
app.post("/delete", requireLogin, deleteTodo)


/** Step 6: Logout */
app.post("/logout", logout);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
