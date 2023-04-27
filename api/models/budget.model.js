const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
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
  date: {
    type: String,
    required: [true, "Seleccione un proyecto"],
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
});

budgetSchema.pre("save", function (next) {
  const budget = this;
  let total = 0;
  budget.item.forEach((item) => {
    total += item.price;
  });
  budget.total = total;
  next();
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
