const db = require("../db/query");
const { body, validationResult } = require("express-validator");

const validateForm = [
    body("title").notEmpty().withMessage("Title is missing."),
    body("author").notEmpty().withMessage("Author is missing."),
    body("genre").notEmpty().withMessage("Genre is missing."),
];

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
    const genre = `${req.params.genre[0].toUpperCase()}${req.params.genre.slice(1)}`;

    res.render("books/genresIndex", { books, genre });
}

async function get_index_by_author(req, res) {
    const author = req.params.author.split("_").join(" ");
    const books = await db.getBooksByAuthor(author);

    res.render("books/authorsIndex", { books, author: books[0].author });
}

async function get_index_by_search(req, res) {
    const books = await db.getBooksByTitle(req.body.search);

    res.render("books/search", { books, search: req.body.search });
}

const add_book = [
    validateForm,
    async (req, res, next) => {
        const errors = validationResult(req);

        // Add default image if not filled out
        if (!req.body.image) req.body.image = "https://cdn.vectorstock.com/i/500p/26/79/book-logo-icon-design-template-vector-30212679.jpg";

        if (!req.body.username) req.body.username = "Anonymous";

        console.log(req.body)
        if (!errors.isEmpty()) {
            return res.status(400).render("books/create", { errors: errors.array() });
        }

        await db.addBook(req.body);
        res.redirect("/books");
    },
];

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

async function delete_author(req, res) {
    const author = req.params.author.split("-").join(" ");

    await db.removeBooksByAuthor(author);
    res.json({ redirect: "/" });
}

async function get_sorted(req, res) {
    const { sortBy, order } = req.query;
    const books = await db.getBooksBySort(sortBy, order);

    res.render("books/index", { books });
}

const update_book = [
    validateForm,
    async (req, res) => {
        const errors = validationResult(req);
        const id = req.params.id;
        const { title, author, genre, image, review, username } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).render("error", { title: "Error", message: "Form missing required fields.", errors: errors.array() });
        }

        await db.updateBook({ id, field: "title", value: title });
        await db.updateBook({ id, field: "author", value: author });
        await db.updateBook({ id, field: "genre", value: genre });
        await db.updateBook({ id, field: "image", value: image });
        await db.updateBook({ id, field: "review", value: review });
        await db.updateBook({ id, field: "username", value: username });

        res.redirect(`/books/${id}`);
    },
];

module.exports = {
    get_index,
    get_details,
    get_form,
    get_search_results,
    get_authors,
    get_genres,
    get_index_by_genre,
    get_index_by_author,
    update_vote,
    delete_book,
    delete_author,
    get_sorted,
    update_book,
    add_book,
    get_index_by_search,
};
