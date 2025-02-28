const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportService = require("../services/passport");
const protectedRoute = passport.authenticate("jwt", { session: false });
const Student = require("../models/student");

const getStudent = async (req, res, next) => {
  let student;
  try {
    student = await Student.findOne(req.params.id);
    if (student === null) {
      return res.status(404).json({ message: "Cannot find student" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.student = student;
  next();
};

// GET ALL
router.get("/", protectedRoute, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ONE
router.get("/:id", getStudent, async (req, res) => {
  res.json(res.student);
});

// Post ONE
router.post("/", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    class: req.body.class,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Patch update
router.patch("/:id", getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.class != null) {
    res.student.class = req.body.class;
  }
  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", getStudent, async (req, res) => {
  try {
    await Student.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted student" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
