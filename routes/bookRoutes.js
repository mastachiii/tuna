const express = require("express");
const controller = require("../controllers/booksController");
const router = express.Router();

// GET
router.get("/", (req, res) => controller.get_index(req, res));

router.get("/add", (req, res) => controller.get_form(req, res));

router.get("/search", (req, res) => controller.get_search_results(req, res));

router.get("/authors", (req, res) => controller.get_authors(req, res));

router.get("/genres", (req, res) => controller.get_genres(req, res));

router.get("/sort", (req, res) => controller.get_sorted(req, res));

router.get("/:id", (req, res) => controller.get_details(req, res));

router.get("/genres/:genre", (req, res) => controller.get_index_by_genre(req, res));

router.get("/authors/:author", (req, res) => controller.get_index_by_author(req, res));

// POST
router.post("/", controller.add_book);

router.post("/update/:id", controller.update_book);

router.post("/:id", (req, res) => controller.update_vote(req, res));

// DELETE
router.delete("/:id", (req, res) => controller.delete_book(req, res));

router.delete("/authors/:author", (req, res) => controller.delete_author(req, res));

module.exports = router;
