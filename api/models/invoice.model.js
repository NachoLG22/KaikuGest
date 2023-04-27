const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
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
  client: {
    type: String,
    required: [true],
  },
});

invoiceSchema.pre("save", function (next) {
  const invoice = this;
  let total = 0;
  invoice.item.forEach((item) => {
    total += item.price;
  });
  invoice.total = total;
  next();
});

const Invoices = mongoose.model("Invoices", invoiceSchema);
module.exports = Invoices;
