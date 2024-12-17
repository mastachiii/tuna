const db = require("../db/query");

async function get_index(req, res) {
    const books = await db.getAllBooks();

    res.render("books/index", { books });
}

async function get_details(req, res) {
    const book = await db.getBook(req.params.id);

    res.render("books/details", { book: book });
}

async function get_authors(req, res) {
    const authors = await db.getAllAuthors();

    res.render("books/authors", { authors: authors });
}

function get_form(req, res) {
    res.render("books/create");
}

function get_search_results(req, res) {
    res.render("books/search");
}

function get_genres(req, res) {
    res.render("books/genres");
}

async function get_index_by_genre(req, res) {
    const books = await db.getBooksByGenre(req.params.genre);

    res.render("books/index", { books });
}

async function get_index_by_author(req, res) {
    const author = req.params.author.split("-").join(" ");
    const books = await db.getBooksByAuthor(author);

    res.render("books/index", { books });
}

async function add_book(req, res) {
    await db.addBook(req.body);

    res.redirect("/");
}

async function update_vote(req, res) {
    const id = req.params.id;
    const field = req.query.field;

    await db.updateBook({ id, field });

    res.send(true);
}

async function delete_book(req, res) {
    await db.removeBook(req.params.id);
    res.json({ redirect: "/" });
}

module.exports = {
    get_index,
    get_details,
    get_form,
    get_search_results,
    get_authors,
    get_genres,
    add_book,
    get_index_by_genre,
    get_index_by_author,
    update_vote,
    delete_book,
};
