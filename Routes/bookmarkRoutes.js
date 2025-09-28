const express = require("express");
const router = express.Router();

const { createBookmark, getBookmarks, getBookmarkById, updateBookmark, deleteBookmark } =
  require("../Controllers/bookmarkscontroller");

router.route("/")
  .post(createBookmark)
  .get(getBookmarks);

router.route("/:id")
  .get(getBookmarkById)
  .put(updateBookmark)
  .delete(deleteBookmark);

module.exports = router;
