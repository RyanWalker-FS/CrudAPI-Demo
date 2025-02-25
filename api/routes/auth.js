const express = require("express");
const router = express.Router();

const authenticate = require("../controllers/authentication");
// GET ALL
router.post("/", authenticate.signup);

module.exports = router;

// // GET ONE
// router.get("/:id", getStudent, async (req, res) => {
//   res.json(res.student);
// });

// // Post ONE
// router.post("/", async (req, res) => {
//   const student = new Student({
//     name: req.body.name,
//     class: req.body.class,
//   });
//   try {
//     const newStudent = await student.save();
//     res.status(201).json(newStudent);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Patch update
// router.patch("/:id", getStudent, async (req, res) => {
//   if (req.body.name != null) {
//     res.student.name = req.body.name;
//   }
//   if (req.body.class != null) {
//     res.student.class = req.body.class;
//   }
//   try {
//     const updatedStudent = await res.student.save();
//     res.json(updatedStudent);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete
// router.delete("/:id", getStudent, async (req, res) => {
//   try {
//     await Student.deleteOne({ _id: req.params.id });
//     res.json({ message: "Deleted student" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
module.exports = router;
