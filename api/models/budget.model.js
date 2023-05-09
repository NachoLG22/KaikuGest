const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    budgetNumber: {
      type: String,
      unique: true,
    },
    date: {
      type: String,
    },
    items: {
      type: [
        {
          title: { type: String, required: [true, "Ingrese un título"] },
          description: {
            type: String,
            required: [true, "Ingrese una descripción"],
          },
          amount: { type: Number, required: [true, "Ingrese una cantidad"] },
          price: { type: Number, required: [true, "Ingrese un precio"] },
          total: { type: Number, default: 0 },
        },
      ],
      required: [true, "Agregue al menos un item"],
      minlength: [1, "Agregue al menos un item"],
    },
    totalBudget: {
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

//Autoguardado de los totales con redondeo
const roundToTwoDecimal = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

budgetSchema.pre("save", function (next) {
  const budget = this;
  budget.items.forEach((item) => {
    item.total = roundToTwoDecimal(item.amount * item.price);
  });
  budget.totalBudget = roundToTwoDecimal(
    budget.items.reduce((acc, item) => acc + item.total, 0)
  );
  next();
});

//Autoguardado de número
budgetSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) {
      return next(); // No hacer nada si no es un nuevo documento
    }

    // Obtener el número de proyecto al que pertenece este presupuesto
    const project = await mongoose.model("Project").findById(this.project);
    const projectNumber = project.projectNumber;

    // Obtener el último correlativo para este proyecto
    const lastBudget = await mongoose
      .model("Budget")
      .findOne({ project: this.project })
      .sort({ budgetNumber: -1 });

    const lastCorrelative =
      lastBudget && lastBudget.budgetNumber
        ? parseInt(lastBudget.budgetNumber.split("-")[2])
        : 0;
    const correlative = (lastCorrelative + 1).toString().padStart(2, "0");

    // Crear el budgetNumber
    const budgetNumber = `P-${projectNumber}-${correlative}`;
    this.budgetNumber = budgetNumber;
    next();
  } catch (error) {
    next(error);
  }
});

budgetSchema.pre("save", function (next) {
  const today = new Date();

  const year = today.getFullYear().toString().substr(-2).padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  this.date = `${year}/${month}/${day}`;
  next();
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
