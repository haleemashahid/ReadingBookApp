const ReadingHistory = require("../models/readingHistory");

//  Create a new Reading History entry
exports.createReadingHistory = async (req, res) => {
  try {
    const readingHistory = new ReadingHistory(req.body);
    const savedReadingHistory = await readingHistory.save();
    res.status(201).json(savedReadingHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  Get all Reading History entries
exports.getReadingHistories = async (req, res) => {
  try {
    const histories = await ReadingHistory.find()
      .populate("userId", "username email")
      .populate("bookId", "title authorId");
    res.json(histories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get a single Reading History entry by ID
exports.getReadingHistoryById = async (req, res) => {
  try {
    const history = await ReadingHistory.findById(req.params.id)
      .populate("userId", "username email")
      .populate("bookId", "title authorId");
    if (!history) return res.status(404).json({ message: "Reading history not found" });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update a Reading History entry
exports.updateReadingHistory = async (req, res) => {
  try {
    const updatedHistory = await ReadingHistory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedHistory) return res.status(404).json({ message: "Reading history not found" });
    res.json(updatedHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  Delete a Reading History entry
exports.deleteReadingHistory = async (req, res) => {
  try {
    const deletedHistory = await ReadingHistory.findByIdAndDelete(req.params.id);
    if (!deletedHistory) return res.status(404).json({ message: "Reading history not found" });
    res.json({ message: "Reading history deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
