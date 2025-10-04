const Book = require("../Models/books");

exports.createBook = async (req, res) => {
  try {
    const { title, description, authorId, categoryId } = req.body;

    const pdf = req.files["pdf"] ? req.files["pdf"][0].path : null;
    const coverImage = req.files["coverImage"] ? req.files["coverImage"][0].path : null;

    const book = new Book({
      title,
      description,
      authorId,
      categoryId,
      pdf,
      coverImage
    });

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('authorId', 'name').populate('categoryId', 'name');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('authorId', 'name').populate('categoryId', 'name');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, description, authorId, categoryId } = req.body;

    const updateData = { title, description, authorId, categoryId };

    if (req.files["pdf"]) {
      updateData.pdf = req.files["pdf"][0].path;
    }
    if (req.files["coverImage"]) {
      updateData.coverImage = req.files["coverImage"][0].path;
    }

    const book = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ authorId: req.params.authorId }).populate('authorId', 'name').populate('categoryId', 'name');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBooksByCategory = async (req, res) => {
  try {
    const books = await Book.find({ categoryId: req.params.categoryId }).populate('authorId', 'name').populate('categoryId', 'name');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
