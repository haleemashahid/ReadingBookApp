const Book = require("../Models/books");

// Create a new Book
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  Get all Books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("authorId", "name biography")   
      .populate("categoryId", "name description"); 
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get a single Book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authorId", "name biography")
      .populate("categoryId", "name description");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update a Book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } 
    );
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
