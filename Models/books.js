const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    coverImage: {
      type: String, 
      required: false
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author", 
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", 
      required: true
    }
  },
  {
    timestamps: true 
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
