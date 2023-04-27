const Budget = require("../models/budget.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
    const projectId = req.params.projectId || req.params.id;

    Budget.find({ project: projectId })
      .then((budgets) => {
        if (budgets.length > 0) {
          res.json(budgets)
        } else {
          next(createError(404, "Budgets not found"));
        }
      })
      .catch(next);
};

module.exports.create = (req, res, next) => {
  req.body.authors = [req.user.id];
  Budget.create(req.body)
    .then((budget) => res.status(201).json(budget))
    .catch(next);
};

module.exports.detail = (req, res, next) => res.json(req.budget);

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


