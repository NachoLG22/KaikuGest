const Invoice = require("../models/invoice.model");
const createError = require("http-errors");

module.exports.exists = (req, res, next) => {
  const invoiceId = req.params.invoiceId || req.params.id;
  Invoice.findById(invoiceId)
    .populate("budget")
    .then((invoice) => {
      if (invoice) {
        req.invoice = invoice;
        next();
      } else {
        next(createError(404, "Invoice not found"));
      }
    })
    .catch(next);
};
