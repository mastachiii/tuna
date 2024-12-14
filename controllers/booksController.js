const db = require("../db/query");

async function getIndex(req, res) {
    const books = await db.getAllBooks();

    res.render("books/index", { books });
}

async function getDetails(req, res, id) {
    const book = await db.getBook(id);

    res.render("books/details");
}

function getForm(req, res) {
    res.render("books/form");
}

function getSearchResults(req, res) {
    res.render("books/search");
}

module.exports = { getIndex, getDetails, getForm, getSearchResults };
