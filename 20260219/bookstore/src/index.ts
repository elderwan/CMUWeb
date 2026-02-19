import { Request, Response } from "express";
import path from "path";
import { addBook, deleteBook, readBooks, searchBooks } from "./services/fileDb";


export const serveIndex = (req: Request, res: Response) => {
    // TODO 6: Send public/index.html
    // Hint: res.sendFile(path.join(process.cwd(), "public", "index.html"));
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
};

export const getAllBooks = (req: Request, res: Response) => {
    // TODO 7: Return all books as JSON
    // Hint: const books = readBooks(); return res.json(books);
    const books = readBooks();
    return res.json(books);
};

export const addBookHandler = (req: Request, res: Response) => {
    try {
        // TODO 8: Read bookName from req.body.bookName and validate (trim it)
        // If empty -> return res.status(400).send("bookName is required");
        const bookName = (req.body.bookName || "").trim();
        if (!bookName) {
            return res.status(400).send("bookName is required");
        }

        // TODO 9: Call addBook(bookName)
        addBook(bookName);

        // TODO 10: Redirect to "/" after success
        return res.redirect("/");

    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
};


export const deleteBookHandler = (req: Request, res: Response) => {
    const bookNo = Number(req.params.bookNo);
    deleteBook(bookNo);
    return res.sendStatus(204);
};


export const searchBooksHandler = (req: Request, res: Response) => {
    const keyword = req.query.keyword?.toString().toLowerCase() || "";
    const searchResults = searchBooks(keyword);
    return res.json(searchResults);
};

