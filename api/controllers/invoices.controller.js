const Invoice = require("../models/invoice.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  const budgetId = req.params.budgetId || req.params.id;

  Invoice.find({ budget: budgetId })
    .then((invoices) => {
      if (invoices.length > 0) {
        res.json(invoices);
      } else {
        next(createError(404, "Invoices not found"));
      }
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  req.body.authors = [req.user.id];
  Invoice.create(req.body)
    .then((invoice) => res.status(201).json(invoice))
    .catch(next);
};

module.exports.detail = (req, res, next) => res.json(req.invoice);

module.exports.delete = (req, res, next) => {
  Invoice.deleteOne({ _id: req.invoice.id })
    .then(() => res.status(204).send())
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Object.assign(req.invoice, req.body);
  req.invoice
    .save()
    .then((invoice) => res.json(invoice))
    .catch(next);
};
