const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.exists = (req, res, next) => {
  const userId = req.params.userId || req.params.id;
  console.log(userId)
  if (userId === 'me')
  User.findById(userId)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        next(createError(404, "User not found"));
      }
    })
    .catch(next);
};


