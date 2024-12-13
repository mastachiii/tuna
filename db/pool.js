require("dotenv").config();

const { Pool } = require("pg");

console.log(process.env);

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL,
});
