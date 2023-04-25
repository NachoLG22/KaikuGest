const mongoose = require("mongoose");
const bcrytp = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: "User name is required",
    minlength: [2, "User name need at least 2 characters"],
  },
  fiscalname: {
    type: String,
    required: "Fiscal Name name is required",
    minlength: [2, "User name need at least 2 characters"],
  },
  description: {
    type: String,
    required: "Description is required",
    minlength: [4, "Description needs at least 4 chars"],
    maxLength: [300, "Description cannot have more than 100 chars"],
  },
  email: {
    type: String,
    required: "An email is required",
    unique: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "The format of the email entered is not correct",
    ],
  },
  password: {
    type: String,
    required: "Password is required",
    minlength: [8, "Your password needs at least 8 chars"],
  },
});
