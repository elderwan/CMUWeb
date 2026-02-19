import express, { Request, Response } from "express";
import path from "path";
import { serveIndex, getAllBooks, addBookHandler, deleteBookHandler, searchBooksHandler } from "../index";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", serveIndex);

app.get("/books", getAllBooks);

app.post("/books/add", addBookHandler);

app.delete("/books/delete/:bookNo", deleteBookHandler);

app.get("/books/search", searchBooksHandler);

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});
