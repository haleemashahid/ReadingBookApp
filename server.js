const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const bookRoutes = require("./routes/bookRoutes.js");
const authorRoutes = require("./routes/authorRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const bookmarkRoutes = require("./routes/bookmarkRoutes.js");
const readingHistoryRoutes = require("./routes/readingHistoryRoutes.js");





const app = express();


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/bookReadingApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("DB Error:", err.message));

app.use(express.json());

app.use("/users", userRoutes); 
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/category", categoryRoutes);
app.use("/bookmarks", bookmarkRoutes);
app.use("/reading-history", readingHistoryRoutes); 



app.get("/", (req, res) => {
  res.send("Server is running fine ");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
