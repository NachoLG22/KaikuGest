const User = require("../models/user.model");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

module.exports.create = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  res.json(req.user);
};

module.exports.delete = (req, res, next) => {
  User.deleteOne({ _id: req.user.id })
    .then(() => res.status(204).send())
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Object.assign(req.user, req.body);
  req.user
    .save()
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  function invalidAuthError() {
    next(
      createError(400, {
        message: "User validation failed",
        errors: { email: { message: "Invalid email or password" } },
      })
    );
  }

  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        invalidAuthError();
      } else {
        return user.checkPassword(password).then((match) => {
          if (match) {
            req.session.userId = user.id;
            res.status(201).json(user);
          } else {
            invalidAuthError();
          }
        });
      }
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy(function (err) {
    req.session = null;
    res.clearCookie("connect.sid");
    res.clearCookie("sessionid");
    res.status(200).send();
  });
};
