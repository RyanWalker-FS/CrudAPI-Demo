const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const reactapp = path.join(__dirname, "../reactapp");

app.use(cors());
app.use(express.json()); // Move this line to the top

app.use(express.static(path.join(reactapp, "build")));

const PORT = process.env.PORT || 8000;

const studentsRouter = require("./routes/students");

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("open", () => console.log("Connected to Database"));

app.use("/students", studentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
