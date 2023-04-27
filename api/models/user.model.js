const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const WORK_FACTOR = 10;

const userSchema = new Schema(
  {
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
    skills: {
      type: [],
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
    location: {
      type: String,
      required: "User location is required",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, WORK_FACTOR)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToMatch) {
  return bcrypt.compare(passwordToMatch, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
