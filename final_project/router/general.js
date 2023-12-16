const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return (user.username = username);
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
};

public_users.post("/register", (req, res) => {
  //register user
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExit(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered, now you can log-in" });
    } else {
      return res.status(403).json({ message: "User already exists!" });
    }
  }
  return res
    .status(404)
    .json({ message: "Unable to register user now, try again later" });
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  try {
    const books = await getBooks();

    res.status(200).json(books);
  } catch (error) {
    return res.status(300).json({ message: "Yet to be implemented" });
  }
});

function getBooks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });
}

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  try {
    const book = await getBookByISBN(isbn);

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(403).json({ message: " book not found by isbn" });
    }
  } catch (error) {
    res.status(404).json({ message: "Book not found" });
  }
});

function getBookByISBN(isbn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = books.find((book) => book.isbn === isbn);
      resolve(book);
    }, 1000);
  });
}

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  const author = req.params.author;
  try {
    const findbook_author = await getBookByAuthor(author);

    if (findbook_author.length > 0) {
      res.status(200).json(findbook_author);
    } else {
      res.status(403).json({ message: " books by author not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "author not found" });
  }
});

function getBookByAuthor(author) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const getBookByAuthor = books.filter((book) => book.author === author);
      resolve(getBookByAuthor);
    }, 1000);
  });
}

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  const title = req.params.title;

  try {
    const findbook_title = await getBookByTitle(title);

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(403).json({ message: "book not found" });
    }
  } catch (error) {
    return res.status(404).json({ message: "can not find book" });
  }
});

function getBookByTitle(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = books.find((book) => book.title === title);
      reslove(book);
    }, 1000);
  });
}

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const book = Object.values(books).find((book) => book.isbn === isbn);

  if (book) {
    res.json({ review: book.reviews });
  } else {
    res.status(403).json({ message: "reviews not found for this book" });
  }
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
