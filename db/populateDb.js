require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ),
    author VARCHAR ( 255 ),
    genre text[],
    image text,
    review text,
    username VARCHAR( 255 ),
    votes INTEGER
);

INSERT INTO books (title, author, genre, image, review, username, votes) 
VALUES
    ('Crime and Punishment', 'Fyodor Dostoevsky', '{"Philosophy", "Crime", "Fiction"}', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657562532i/17879.jpg', 'I basically had to stop drinking for a month in order to read it; my friends no longer call. But it''s great.', 'mastachii', 1),
    ('The Great Gatsby', 'F. Scott Fitzgerald', '{"Romance", "Fiction"}', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1396977763i/4677.jpg', 'the only thing I got from this is that Nick is gay', 'al02262006', 1),
    ('1984', 'George Orwell', '{"Fiction", "Philosophy"}', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1616476203i/57502604.jpg', 'This was the book that started my love affair with the dystopian genre. And maybe indirectly influenced my decision to do a politics degree. I was only 12 years old when I first read it but I suddenly saw how politics could be taken and manipulated to tell one hell of a scary and convincing story. I''m a lot more well-read now but, back then, this was a game-changer. I started to think about things differently. I started to think about 2 + 2 = 5 and I wanted to read more books that explored the idea of control.', 'FOObarQuox', 1),
    ('Anna Karenina', 'Leo Tolstoy', '{"Fiction", "Romance"}', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1288758122i/155.jpg', 'Tolstoy draws a portrait of three marriages or relationships that could not be more different. Anna Karenina is rightly called a masterpiece. Moreover Tolstoy does not spare on social socialism and describes the beginnings of communism, deals with such existential themes as birth and death and the meaning of life.
    Tolstoys narrative art and his narrative charm are at the highest level. He also seems like a close observer of human passions, feelings and emotions.
    All in all I was touched by his book because it was one of the most impressive books I have ever read.', 'mastachii', 1),
    ('Dune', 'Frank Herbert', '{"Fiction", "Fantasy"}', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg', 'Dune is one of the best examples of the heros journey in fiction. Most authors, myself included, need more than one book in order to tell an epic coming-of-age story. Herbert did it in one while also creating a unique and interesting setting. Part of his genius as an author was his ability to imply far more about his world than he actually showed. As a result, Dune feels as if it was written by an inhabitant of Herberts universe; no small achievement.', 'hasenborg', 1);
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
