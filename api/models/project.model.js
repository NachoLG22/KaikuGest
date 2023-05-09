const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: "Project title is required",
      minlength: [4, "Project title needs at least 4 chars"],
    },
    authors: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectNumber: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: "Description is required",
      minlength: [4, "Description needs at least 4 chars"],
      maxLength: [150, "Description cannot have more than 150 chars"],
    },
    client: {
      type: String,
      required: "Description is required",
    },
    // state: {
    //   type: String,
    //   enum: ["open", "closed"],
    //   default: "open",
    // },
    date: {
      type: String,
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

projectSchema.pre("save", async function (next) {
  const project = this;
  const date = new Date(); //fecha actual en codigo loco con muchos datos :)
  const year = date.getFullYear().toString().substring(2, 4); //Se queda con las dos ultimas cifras del año (2023=>23) de date
  const lastProject = await Project.findOne(
    {},
    {},
    { sort: { projectNumber: -1 } } //Me trae los proyecto ordenados por projectNumber de manera descendente para traer el ultimo guardado
  );
  let newNumber = "001";
  if (lastProject) {
    const lastNumber = lastProject.projectNumber.toString();
    const lastYear = lastNumber.substring(0, 2);
    if (lastYear === year) {
      const lastCorrelative = parseInt(lastNumber.substring(4));
      newNumber = (lastCorrelative + 1).toString().padStart(3, "0");
    }
  }
  project.projectNumber = `${year}${newNumber}`.toString();
  next();
});

projectSchema.pre("save", function (next) {
  const today = new Date();

  const year = today.getFullYear().toString().substr(-2).padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  this.date = `${year}/${month}/${day}`;
  next();
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
