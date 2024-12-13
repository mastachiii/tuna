require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ),
    author VARCHAR ( 255 ),
    genre text[],
    image VARCHAR ( 255 ),
    review VARCHAR ( 255 ),
    votes INTEGER
);

INSERT INTO books (title, author, genre, image, review, votes) 
VALUES
    ('Crime and Punishment', 'Fyodor Dostoevsky', '{"Philosophy", "Crime", "Fiction"}', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1382846449i/7144.jpg', 'I basically had to stop drinking for a month in order to read it; my friends no longer call. But it''s great.', 1),
    ('The Great Gatsby', 'F. Scott Fitzgerald', '{"Romance", "Fiction"}', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg', 'the only thing I got from this is that Nick is gay', 1),
    ('The Great Gatsby', 'F. Scott Fitzgerald', '{"Romance", "Fiction"}', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg', 'One of my favourite books of all time. Genuinely one of the scariest books ever. I was absolutely terrified when I first read it. I found it super intriguing.', 1);
`;

async function main() {
    console.log("populating DB...");

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("done!");
}

main();
