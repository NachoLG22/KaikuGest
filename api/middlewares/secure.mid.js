const createError = require("http-errors");

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return next(createError(401, "You need to log in"));
  }
};

module.exports.cleanBody = (req, res, next) => {
  if (req.body) {
    delete req.body._id;
    delete req.body.createdAt;
    delete req.body.updatedAt;
  }
};
