const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");


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

app.get("/", (req, res) => {
  res.send("Server is running fine ");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
