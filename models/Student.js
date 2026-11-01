// Student schema: describes how a student record looks in MongoDB
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    // simple email format check
    match: [/^\S+@\S+\.\S+$/, "Email format is not valid"]
  },
  course: {
    type: String,
    required: [true, "Course is required"],
    trim: true
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
    min: [1, "Year must be between 1 and 4"],
    max: [4, "Year must be between 1 and 4"]
  },
  division: {
    type: String,
    required: [true, "Division is required"],
    trim: true
  }
});

module.exports = mongoose.model("Student", studentSchema);
