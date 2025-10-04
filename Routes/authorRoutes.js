const express = require("express");
const router = express.Router();

const upload = require("./middleware/upload");

const {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} = require("../controllers/authorController");

// Routes
router.route("/")
  .post(upload.single("authorPhoto"), createAuthor) 
  .get(getAuthors);

router.route("/:id")
  .get(getAuthorById)
  .put(upload.single("authorPhoto"), updateAuthor)
  .delete(deleteAuthor);

module.exports = router;
