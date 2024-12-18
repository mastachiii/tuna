const db = require("../db/query");
const { body, validationResult } = require("express-validator");

const validateForm = [
    body("title").notEmpty().withMessage("Title is required."),
    body("author").notEmpty().withMessage("Author is required."),
    body("genre").notEmpty().withMessage("Genre is required."),
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

    res.render("books/index", { books });
}

async function get_index_by_author(req, res) {
    const author = req.params.author.split("-").join(" ");
    const books = await db.getBooksByAuthor(author);

    res.render("books/index", { books });
}

const add_book = [
    validateForm,
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("books/create", { errors: errors.array() });
        }

        await db.addBook(req.body);
        res.redirect("/");
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
    console.log(req.query);
    const books = await db.getBooksBySort(sortBy, order);

    res.render("books/index", { books });
}

const update_book = [
    validateForm,
    async (req, res) => {
        const errors = validationResult(req);
        const id = req.params.id;
        const { title, author, genre, image, review } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).render("error", { title: "Error", errors: errors.array() });
        }

        await db.updateBook({ id, field: "title", value: title });
        await db.updateBook({ id, field: "author", value: author });
        await db.updateBook({ id, field: "genre", value: genre });
        await db.updateBook({ id, field: "image", value: image });
        await db.updateBook({ id, field: "review", value: review });

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
};
