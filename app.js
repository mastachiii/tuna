const express = require("express");
const path = require("path");
const booksRouter = require("./routes/bookRoutes");
const { title } = require("process");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/books", booksRouter);
app.use((err, req, res, next) => {
    console.error(err)
    res.render("error", { title: "Error" });
});

// Get reqs
app.get("/", (req, res) => {
    res.render("homepage");
});

// TODO: Error handling

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
