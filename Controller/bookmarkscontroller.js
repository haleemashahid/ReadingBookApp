const Bookmark = require("../models/Bookmark");

//  Create a new Bookmark
exports.createBookmark = async (req, res) => {
  try {
    const bookmark = new Bookmark(req.body);
    const savedBookmark = await bookmark.save();
    res.status(201).json(savedBookmark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  Get all Bookmarks
exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find()
      .populate("userId", "username email")
      .populate("bookId", "title authorId");
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get a single Bookmark by ID
exports.getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id)
      .populate("userId", "username email")
      .populate("bookId", "title authorId");
    if (!bookmark) return res.status(404).json({ message: "Bookmark not found" });
    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update a Bookmark
exports.updateBookmark = async (req, res) => {
  try {
    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBookmark) return res.status(404).json({ message: "Bookmark not found" });
    res.json(updatedBookmark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  Delete a Bookmark
exports.deleteBookmark = async (req, res) => {
  try {
    const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
    if (!deletedBookmark) return res.status(404).json({ message: "Bookmark not found" });
    res.json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
