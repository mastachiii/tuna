const db = require("../db/query");

async function getBookIndex(req, res) {
    const books = await db.getAllBooks();

    res.render("books/index");
}

async function getBookDetails(req, res, id) {
    const book = await db.getBook(id);

    res.render("books/details");
}

function getBookForm(req, res) {
    res.render("books/form");
}

function getBookSearchResults(req, res) {
    res.render("books/search");
}

module.exports = { getBookIndex, getBookDetails, getBookForm, getBookSearchResults };
