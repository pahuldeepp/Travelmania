const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
  familyName: {
    type: String,
    required: [true, "Family name is required"],
    trim: true,
    minlength: [2, "Family name must be at least 2 characters long"],
    maxlength: [50, "Family name cannot exceed 50 characters"],
  },
  destination: {
    type: String,
    required: [true, "Destination is required"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "Travel date is required"],
  },
  passengers: {
    type: Number,
    required: [true, "Number of passengers is required"],
    min: [1, "At least one passenger is required"],
  },
});

const Travel = mongoose.model("Travel", travelSchema);

module.exports = Travel;
