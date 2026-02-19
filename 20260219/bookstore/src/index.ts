import express from "express";
import path from "path";
import { addBookHandler, deleteBookHandler, getAllBooks, searchBooksHandler, serveIndex } from "./controllers/bookController";

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", serveIndex);

app.get("/books", getAllBooks);

app.post("/books/add", addBookHandler);

app.post("/books/delete/:bookNo", deleteBookHandler);

app.get("/books/search", searchBooksHandler);

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});
