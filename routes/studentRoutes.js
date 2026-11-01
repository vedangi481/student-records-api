// All CRUD routes for students
const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");

const router = express.Router();

// Handles errors and sends the correct status code
function handleError(error, res) {
  // Mongoose validation error (missing field, wrong email, etc.) -> 400
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ message: "Validation failed", errors: messages });
  }
  // Wrong data type, like year = "abc" -> 400
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid value for " + error.path });
  }
  // Anything else is a server problem -> 500
  console.log(error);
  res.status(500).json({ message: "Internal server error" });
}

// CREATE - POST /api/students
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    handleError(error, res);
  }
});

// READ ALL - GET /api/students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    handleError(error, res);
  }
});

// READ ONE - GET /api/students/:id
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    handleError(error, res);
  }
});

// UPDATE - PUT /api/students/:id
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    // new: true returns the updated record, runValidators checks the rules again
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    handleError(error, res);
  }
});

// DELETE - DELETE /api/students/:id
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
