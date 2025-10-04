const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes.js");
const bookRoutes = require("./Routes/bookRoutes.js");
const authorRoutes = require("./Routes/authorRoutes.js");
const categoryRoutes = require("./Routes/categoryRoutes.js");
const bookmarkRoutes = require("./Routes/bookmarkRoutes.js");
const readingHistoryRoutes = require("./Routes/readingHistoryRoutes.js");





const app = express();
const path = require("path");


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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.get("/", (req, res) => {
  res.send("Server is running fine ");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
