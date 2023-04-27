const Budget = require("../models/buget.model");
const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.exists = (req, res, next) => {
  const establishmentId = req.params.establishmentId || req.params.id;
  Establishment.findById(establishmentId)
    .then((establishment) => {
      if (establishment) {
        req.establishment = establishment;
        next();
      } else {
        next(createError(404, "Establishment not found"));
      }
    })
    .catch(next);
};

// module.exports.owner = (req, res, next) => {
//   const budgetId = req.params.budgetId || req.params.id;
//   Budget.findById(budgetId)
//     .populate("user")
//     .then((budget) => {
//       if (budget) {
//         console.log(budget);
//         if (req.user.id === budget.admin.id) {
//           req.budget = budget;
//           next();
//         } else {
//           next(createError(401, "Unauthorized"));
//         }
//       } else {
//         next(createError(404, "Budget not found"));
//       }
//     })
//     .catch(next);
// };
