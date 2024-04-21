import asyncHandler from "../middlewares/asyncHandler.js";
import Book from "../models/bookModel.js";
import Genre from "../models/genreModel.js";

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("genre", "name");
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error("Book Not Found");
  }
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await Book.deleteOne({ _id: book._id });
    res.json({ message: "Book removed" });
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

const createBook = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const book = new Book({
    title: "Sample name",
    author: "author name",
    price: 0,
    createdBy: id,
    image: "/images/sample.jpg",
    publishedYear: "published year",
    stock: 0,
    numPages: 0,
    numReviews: 0,
    publisher: "publisher name",
    isbn: "isbn",
    description: "Sample description",
  });
  try {
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    console.log(error.data.message);
  }
});

const updateBook = asyncHandler(async (req, res) => {
  const {
    title,
    isbn,
    numPages,
    stock,
    author,
    price,
    publishedYear,
    description,
    publisher,
    image,
    genre,
  } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    book.title = title;
    book.price = price;
    book.description = description;
    book.publishedYear = publishedYear;
    book.publisher = publisher;
    book.isbn = isbn;
    book.author = author;
    book.image = image;
    book.numPages = numPages;
    book.genre = genre;
    book.stock = stock;

    const updatedbook = await book.save();
    res.json(updatedbook);
  } else {
    res.status(404);
    throw new Error("book not found");
  }
});

const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, userId, name } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    const alreadyReviewed = book.reviews.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Book already reviewed");
    }

    const review = {
      name: name,
      rating: Number(rating),
      comment,
      user: userId,
    };

    book.reviews.push(review);

    book.numReviews = book.reviews.length;

    book.rating =
      book.reviews.reduce((acc, item) => item.rating + acc, 0) /
      book.reviews.length;

    await book.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("book not found");
  }
});

export {
  getBookById,
  getBooks,
  deleteBook,
  createBook,
  updateBook,
  createReview,
};
