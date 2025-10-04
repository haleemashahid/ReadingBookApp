const Author = require("../models/authors");

//  Create a new Author
exports.createAuthor = async (req, res) => {
  try {
    let data = req.body;

    // Check if file exists before accessing its properties
    if (!req.file) {
      console.log("ERROR: req.file is undefined");
      return res.status(400).json({ error: "Author photo is required" });
    }

    let imagePath = req.file.path;
    data.photo = imagePath;

    const author = new Author(data);
    const savedAuthor = await author.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



//  Get all Authors
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get a single Author by ID
exports.getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await Author.findById(id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update an Author
exports.updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAuthor) return res.status(404).json({ message: "Author not found" });
    res.json(updatedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  Delete an Author
exports.deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ message: "Author not found" });
    res.json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
