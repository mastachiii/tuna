const pool = require("./pool");
// const checkQuotes = require("../helpers/checkQuotes");

async function getAllBooks() {
    const { rows } = await pool.query("SELECT * FROM books");

    return rows;
}

function getBook(id) {
    const { row } = pool.query("SELECT * FROM books WHERE id = $1", [id]);

    return row;
}

function addBook({ title, author, genre, image, review, votes }) {
    pool.query(
        `INSERT INTO books (title, author, genre, image, review, votes)
         VALUES
         ($1, $2, $3, $4, $5, $6);
    `,
        [title, author, genre, image, review, votes]
    );
}

function removeAllBooks() {
    pool.query("DROP TABLE books");
}

removeAllBooks();

// addBook(
//     "The Firm",
//     "John Grisham",
//     '{"Fiction", "Thriller", "Mystery"}',
//     "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1687344151i/1941607.jpg",
//     "Just read it, it's that great",
//     "1"
// );

//TODO: remove a book

//TODO: update a book
