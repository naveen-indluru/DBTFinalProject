import express from "express";
const router = express.Router();
import { getGenres } from "../controllers/genreController.js";
import {
  getBookById,
  getBooks,
  deleteBook,
  updateBook,
  createBook,
  createReview,
} from "../controllers/bookController.js";

router.route("/").get(getBooks).post(createBook);
router.route("/genres").get(getGenres);
router.route("/:id").get(getBookById).delete(deleteBook).put(updateBook);
router.route("/:id/reviews").post(createReview);

export default router;
