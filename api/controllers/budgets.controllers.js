const Budget = require("../models/budget.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  Budget.find({ project: req.params.id })
    .populate('project')
    .then((budgets) => {
      if (budgets.length > 0) {
        res.json(budgets);
      } else {
        next(createError(404, "Budgets not found"));
      }
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  const params = {
    project: req.project.id,
    items: req.body.items,
  };
  console.log(params);
  Budget.create(params)
    .then((budget) => res.status(201).json(budget))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Budget.findById(budgetId)
    .populate("project")
    .then((budget) => {
      if (budget) {
        req.budget = budget;
        res.json(req.budget);
      } else {
        next(createError(404, "Budget not found"));
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Budget.deleteOne({ _id: req.budget.id })
    .then(() => res.status(204).send())
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Object.assign(req.budget, req.body);
  req.budget
    .save()
    .then((budget) => res.json(budget))
    .catch(next);
};
