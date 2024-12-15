const express = require("express");
const controller = require("../controllers/booksController");
const router = express.Router();

// GET
router.get("/", (req, res) => controller.getIndex(req, res));

router.get("/add", (req, res) => controller.getForm(req, res));

router.get("/search", (req, res) => controller.getSearchResults(req, res));

router.get("/:id", (req, res) => {
    res.send("book details");
});

module.exports = router;
