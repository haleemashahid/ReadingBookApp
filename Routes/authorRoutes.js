const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploads");


const {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} = require("../Controllers/authorcontroller");

// Routes
router.route("/")
  .post(upload.single("photo"), createAuthor) 
  .get(getAuthors);

router.route("/:id")
  .get(getAuthorById)
  .put(upload.single("photo"), updateAuthor)
  .delete(deleteAuthor);

module.exports = router;
