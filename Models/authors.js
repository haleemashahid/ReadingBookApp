const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Author name is required"],
      trim: true
    },
    biography: {
      type: String,
      trim: true
    },
    photo: {
      type: String, 
      required: false
    }
  },
  {
    timestamps: true 
  }
);

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
