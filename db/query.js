const pool = require("./pool");

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
        case "votes":
            pool.query("UPDATE books SET votes = votes + 1 WHERE id = $1", [id]);
    }
}

module.exports = { getAllBooks, getBook, addBook, removeBook, updateBook };
