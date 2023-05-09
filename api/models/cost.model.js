const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const costchema = new Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Seleccione un proyecto"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true],
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      required: [true],
    },
    item: {
      type: [
        {
          title: { type: String, required: [true, "Ingrese un título"] },
          description: {
            type: String,
            required: [true, "Ingrese una descripción"],
          },
          price: { type: Number, required: [true, "Ingrese un precio"] },
        },
      ],
      required: [true, "Agregue al menos un item"],
      minlength: [1, "Agregue al menos un item"],
    },
    total: {
      type: Number,
      default: 0,
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

costchema.pre("save", function (next) {
  const cost = this;
  let total = 0;
  cost.item.forEach((item) => {
    total += item.price;
  });

  
  cost.total = total;
  next();
});

const Cost = mongoose.model("Cost", costSchema);
module.exports = Cost;
