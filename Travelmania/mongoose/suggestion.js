const mongoose = require("mongoose");

// Define the schema
const suggestionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    validate: {
      validator: function (value) {
        // Use a regex to validate email format
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    minlength: [10, "Message must be at least 10 characters long"],
    maxlength: [500, "Message cannot exceed 500 characters"],
  },
});

// Create the model
const Suggestion = mongoose.model("Suggestion", suggestionsSchema);

module.exports = Suggestion;
