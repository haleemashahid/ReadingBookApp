const express = require("express");
const router = express.Router();

const { createReadingHistory, getReadingHistories, getReadingHistoryById, updateReadingHistory, deleteReadingHistory } =
  require("../controllers/readingHistoryController");

router.route("/")
  .post(createReadingHistory)
  .get(getReadingHistories);

router.route("/:id")
  .get(getReadingHistoryById)
  .put(updateReadingHistory)
  .delete(deleteReadingHistory);

module.exports = router;
