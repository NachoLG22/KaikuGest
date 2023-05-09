const Budget = require("../models/budget.model");
const createError = require("http-errors");

module.exports.exists = (req, res, next) => {
  const budgetId = req.params.budgetId || req.params.id;
  console.log(budgetId);
  Budget.findById(budgetId)
    .populate("project")
    .then((budget) => {
      if (budget) {
        req.budget = budget;
        console.log(req.budget);
        next();
      } else {
        next(createError(404, "Budget not found"));
      }
    })
    .catch(next);
};
