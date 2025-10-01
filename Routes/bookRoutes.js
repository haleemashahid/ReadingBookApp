const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBooksByAuthor,
  getBooksByCategory
} = require("../controller/bookController");

// Routes
router.route("/")
  .post(
    upload.fields([
      { name: "pdf", maxCount: 1 },
      { name: "coverImage", maxCount: 1 }
    ]),
    createBook
  )
  .get(getBooks);

router.route("/:id")
  .get(getBookById)
  .put(
    upload.fields([
      { name: "pdf", maxCount: 1 },
      { name: "coverImage", maxCount: 1 }
    ]),
    updateBook
  )
  .delete(deleteBook);

router.route("/author/:authorId").get(getBooksByAuthor);
router.route("/category/:categoryId").get(getBooksByCategory);

module.exports = router;

