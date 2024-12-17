const pool = require("./pool");

async function getAllBooks() {
    const { rows } = await pool.query("SELECT * FROM books");

    return rows;
}

async function getBook(id) {
    const { rows } = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

    return rows[0];
}

async function getAllAuthors() {
    const { rows } = await pool.query("SELECT author FROM books GROUP BY author");

    return rows;
}

async function getBooksByGenre(genre) {
    genre = genre[0].toUpperCase() + genre.slice(1);

    const { rows } = await pool.query("SELECT * FROM books WHERE $1 LIKE ANY(genre)", [genre]);

    return rows;
}

async function getBooksByAuthor(author) {
    const { rows } = await pool.query("SELECT * FROM books WHERE author ILIKE $1", [author]);

    return rows;
}

function addBook({ title, author, genre, image, review }) {
    pool.query(
        `INSERT INTO books (title, author, genre, image, review, votes)
         VALUES
         ($1, $2, $3, $4, $5, 1);
    `,
        [title, author, genre, image, review]
    );
}

function removeAllBooks() {
    pool.query("DROP TABLE books");
}

function removeBook(id) {
    pool.query("DELETE FROM books WHERE id = $1", [id]);
}

// Can't do dynamic updating...
function updateBook({ id, field, value }) {
    switch (field) {
        case "title":
            pool.query("UPDATE books SET title = $1 WHERE id = $2", [value, id]);
            break;
        case "genre":
            pool.query("UPDATE books SET genre = $1 WHERE id = $2", [value, id]);
            break;
        case "author":
            pool.query("UPDATE books SET author = $1 WHERE id = $2", [value, id]);
            break;
        case "image":
            pool.query("UPDATE books SET image = $1 WHERE id = $2", [value, id]);
            break;
        case "review":
            pool.query("UPDATE books SET review = $1 WHERE id = $2", [value, id]);
            break;
        case "upvote":
            pool.query("UPDATE books SET votes = votes + 1 WHERE id = $1", [id]);
            break;
        case "downvote":
            pool.query("UPDATE books SET votes = votes - 1 WHERE id = $1", [id]);
    }
}

module.exports = { getAllBooks, getBook, addBook, removeBook, updateBook, getAllAuthors, getBooksByGenre, getBooksByAuthor };
