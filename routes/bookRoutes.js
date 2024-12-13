const express = require("express");
const router = express.Router();

// GET
router.get("/", (req, res) => {
    res.send("this is where books will be displayed");
});

router.get("/add", (req, res) => {
    res.send("form for adding new book");
});

router.get("/search", (req, res) => {
    res.send("search results");
});

router.get("/:id", (req, res) => {
    res.send("book details");
});

module.exports = router;
