async function loadBooks(keyword = "") {
    // TODO 13: fetch("/books") and convert to JSON
    // TODO 14: render books into #book-list
    let books;
    let response;
    if (keyword) {
        response = await fetch(
            `/books/search?keyword=${encodeURIComponent(keyword)}`,
        );
        books = await response.json();
    } else {
        response = await fetch("/books");
        books = await response.json();
    }

    const bookList = document.getElementById("book-list");

    if (bookList) {
        bookList.innerHTML = "";
        books.forEach((b) => {
            // render a delete button next to each book
            const li = document.createElement("li");
            li.textContent = `${b.bookNo}: ${b.bookName} `;

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", async () => {
                await fetch(`/books/delete/${b.bookNo}`, { method: "DELETE" });
                await loadBooks(keyword);
            });
            li.appendChild(deleteButton);
            bookList.appendChild(li);
            const hr = document.createElement("hr");
            bookList.appendChild(hr);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadBooks();
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-keyword");

    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const keyword = searchInput.value;
            loadBooks(keyword);
        });
    }
});
