// Check if string contains a quote, if it does append another quote. (https://www.geeksforgeeks.org/how-to-insert-text-with-single-quotes-in-postgresql/)
// To be used when adding new stuff to DB.

// only check for single quotes since it's what postgres uses.
function checkQuotes(string) {
    return string
        .split("")
        .map(a => (a === "'" ? "''" : a))
        .join("");
}

console.log(checkQuotes("hell'o"));

module.exports = checkQuotes;
