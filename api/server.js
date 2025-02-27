const express = require("express");
require("dotenv").config();
const reactapp = "../reactapp/build";
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(express.static(path.join(reactapp, "build")));

const studentsRouter = require("./routes/students");
const authRouter = require("./routes/auth");

app.use("/api/student", studentsRouter);
app.use("api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
