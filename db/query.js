const pool = require("./pool");

function getAllBooks() {
    const { rows } = pool.query("SELECT * FROM books");

    return rows;
}

function getBook(id) {
    const { row } = pool.query("SELECT * FROM books WHERE id = $1", [id]);

    return row;
}

//TODO: add a book
async function addBook(title, author, genre, image, review, votes) { }

//TODO: remove a book

//TODO: update a book
