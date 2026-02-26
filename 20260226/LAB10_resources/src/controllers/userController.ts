import { Request, Response } from "express";
import { getUsersByUserNameAndPassword } from "../services/userService";


export function login(req: Request, res: Response) {
    const username = (req.body.username ?? "").trim();
    const password = (req.body.password ?? "");

    const user = getUsersByUserNameAndPassword(username, password);

    if (!user) {
        return res.redirect("/?q=wrong username or password");
    }

    req.session.userId = user.id;
    req.session.username = user.username;

    res.redirect("/todos");
}

export function logout(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
        }
        res.redirect("/");
    });
}

export function home(req: Request, res: Response) {
    const error = req.query.q;
    (req.session as any).error = null; // Clear error after displaying it
    res.render("index", { error });
}
