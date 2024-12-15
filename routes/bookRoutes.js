const express = require("express");
const controller = require("../controllers/booksController");
const router = express.Router();

// GET
router.get("/", (req, res) => controller.get_index(req, res));

router.get("/add", (req, res) => controller.get_form(req, res));

router.get("/search", (req, res) => controller.get_search_results(req, res));

router.get("/authors", (req, res) => controller.get_authors(req, res));

router.get("/:id", (req, res) => controller.get_details(req, res));

// POST
router.post("/", (req, res) => controller.add_book(req, res));

module.exports = router;
