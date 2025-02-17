const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.static(path.join(reactapp, "build", "indext.html")));

app.get("*", (req, res) => {
  console.log("Catch-all route executed");
  res.sendFile(path.join(reactapp, "build", "index.html"));
});
app.use(cors());

const PORT = process.env.PORT || 8000;

const studentsRouter = require("./routes/students");

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use("/students", studentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
