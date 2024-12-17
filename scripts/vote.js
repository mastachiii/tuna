// keeps track if user has already voted or not.
// if user has not voted, modify database to increment vote else decrement vote

function userVote() {
    localStorage.setItem("userHasVoted", false);
}

module.exports = userVote;
