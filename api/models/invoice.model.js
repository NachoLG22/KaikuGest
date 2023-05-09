const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      required: [true],
    },
    invoiceNumber: {
      type: String,
      unique: true,
    },
    date: {},
    items: {
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

invoiceSchema.pre("save", function (next) {
  const invoice = this;
  let total = 0;
  invoice.items.forEach((item) => {
    total += item.price;
  });
  invoice.total = total;
  next();
});

invoiceSchema.pre("save", function (next) {
  const today = new Date();

  const year = today.getFullYear().toString().substr(-2).padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  this.date = `${year}/${month}/${day}`;
  next();
});

//Autoguardado de número
invoiceSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) {
      return next(); // No hacer nada si no es un nuevo documento
    }

    // Obtener el número de presupuesto al que pertenece esta factura
    const budget = await mongoose.model("Budget").findById(this.budget);
    const budgetNumber = budget.budgetNumber;

    // Crear el invoiceNumber
    const invoiceNumber = `${budgetNumber}-F`;
    this.invoiceNumber = invoiceNumber;
    next();
  } catch (error) {
    next(error);
  }
});

const Invoice = mongoose.model("Invoices", invoiceSchema);
module.exports = Invoice;
