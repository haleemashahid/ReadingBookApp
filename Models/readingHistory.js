const mongoose = require("mongoose");

const readingHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", 
      required: true
    },
    startTime: {
      type: Date,
      required: [true, "Start time is required"]
    },
    endTime: {
      type: Date,
      required: false 
    },
    pagesRead: {
      type: Number,
      required: [true, "Pages read is required"],
      min: [1, "Pages read must be at least 1"]
    }
  },
  {
    timestamps: true 
  }
);

const ReadingHistory = mongoose.model("ReadingHistory", readingHistorySchema);
module.exports = ReadingHistory;
