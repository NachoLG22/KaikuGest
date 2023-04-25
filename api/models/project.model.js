const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectShema = new Schema(
  {
    title: {
      type: String,
      required: "Project title is required",
      minlength: [4, "Project title needs at least 4 chars"],
    },
    projectNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: "Description is required",
      minlength: [4, "Description needs at least 4 chars"],
      maxLength: [300, "Description cannot have more than 100 chars"],
    },
    state: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    invoices: {
      type: [String],
    },
    client: {
      type: [String],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

const Project = mongoose.model("Project", projectShema);
module.exports = Project;
