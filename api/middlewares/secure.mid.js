const createError = require("http-errors");

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return next(createError(401, "You need to log in"));
  }
};

module.exports.cleanBody = (req, res, next) => {
  // protect some body fields from being sent

  if (req.body) {
    delete req.body._id;
    delete req.body.author;
    delete req.body.createdAt;
    delete req.body.updatedAt;
    delete req.body.confirm;
  }

  next();
};
