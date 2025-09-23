const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
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
    pageNumber: {
      type: Number,
      required: [true, "Page number is required"],
      min: [1, "Page number must be at least 1"]
    }
  },
  {
    timestamps: true 
  }
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
module.exports = Bookmark;
