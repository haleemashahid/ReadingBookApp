exports.createBook = async (req, res) => {
  try {
    const { title, description, authorId, categoryId } = req.body;

    const pdf = req.files["pdf"] ? req.files["pdf"][0].path : null;
    const coverImage = req.files["coverImage"] ? req.files["coverImage"][0].path : null;
    const authorPhoto = req.files["authorPhoto"] ? req.files["authorPhoto"][0].path : null;

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
